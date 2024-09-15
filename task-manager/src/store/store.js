import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const { VUE_APP_BACKEND_URI } = process.env;

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || null;
}

export default new Vuex.Store({
    state: {
        loggedUser: getFromLocalStorage("loggedUser") || {
            id: null,
            username: null,
            email: null,
            isAdmin: null,
            image: null,
        },
        users: getFromLocalStorage("users") || [],
        tasks: getFromLocalStorage("tasks") || [],
    },
    getters: {
        loggedUser: (state) => state.loggedUser,
        getTasksByLoggedUser: (state) => {
            return state.tasks;
        },
        getRemaningTaskOfUser: (state) =>
            state.tasks.filter((task) => !task.status),
        getCompletedTaskOfUser: (state) =>
            state.tasks.filter((task) => task.status),

        getAllTasks: (state) => state.tasks,
        getUserById: (state) => (userId) => {
            return state.users.find((user) => user.id === userId);
        },
        getAllUsers: (state) => state.users,
    },
    mutations: {
        SET_LOGGED_USER(state, loggedUser) {
            state.loggedUser = loggedUser;
        },
        ADD_TASK(state, task) {
            state.tasks.push(task);
        },
        ADD_USER(state, user) {
            state.users.push(user);
        },
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        UPDATE_TASK(state, updatedTask) {
            const index = state.tasks.findIndex(
                (task) => task.id === updatedTask.id
            );
            if (index !== -1) {
                Vue.set(state.tasks, index, updatedTask);
            }
        },
        DELETE_TASK(state, taskId) {
            state.tasks = state.tasks.filter((task) => task.id !== taskId);
        },
    },
    actions: {
        async addTask({ commit, state }, { userId, title, dueDate, priority }) {
            let response = await fetch(`${VUE_APP_BACKEND_URI}/tasks`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    title,
                    dueDate,
                    priority,
                }),
            });

            response = await response.json();

            if (response.statusCode === 201) {
                const newTask = {
                    id: response.data._id,
                    title: response.data.title,
                    dueDate: response.data.dueDate,
                    priority: response.data.priority,
                    userId: response.data.userId,
                    status: response.data.status,
                    createdDate: response.data.createdAt,
                };
                commit("ADD_TASK", newTask);
                saveToLocalStorage("tasks", state.tasks);
            }
        },
        async addUser(_, { username, email, password, image, isAdmin }) {
            let response = await fetch(`${VUE_APP_BACKEND_URI}/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    image,
                    isAdmin,
                }),
            });

            response = await response.json();
            return response.statusCode === 201;
        },
        async updateTask(
            { commit, state },
            { id, title, dueDate, priority, status }
        ) {
            let response = await fetch(`${VUE_APP_BACKEND_URI}/tasks/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    dueDate,
                    priority,
                    status,
                }),
            });

            response = await response.json();
            const updatedTask = {
                id: response.data._id,
                title: response.data.title,
                dueDate: response.data.dueDate,
                priority: response.data.priority,
                status: response.data.status,
                createdDate: response.data.createdAt,
            };

            commit("UPDATE_TASK", updatedTask);
            saveToLocalStorage("tasks", state.tasks);
        },
        async deleteTask({ commit, state }, taskId) {
            await fetch(`${VUE_APP_BACKEND_URI}/tasks/${taskId}`, {
                method: "DELETE",
                credentials: "include",
            });
            commit("DELETE_TASK", taskId);
            saveToLocalStorage("tasks", state.tasks);
        },
        async login({ commit, state }, { username, password }) {
            let response = await fetch(`${VUE_APP_BACKEND_URI}/users/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            response = await response.json();

            if (response.statusCode === 201) {
                const user = {
                    id: response.data._id,
                    username: response.data.username,
                    email: response.data.email,
                    image: response.data.image,
                    isAdmin: response.data.isAdmin,
                };
                commit("SET_LOGGED_USER", user);
                saveToLocalStorage("loggedUser", state.loggedUser);

                await this.dispatch("fetchData");
                return true;
            } else {
                return false;
            }
        },
        async logout({ commit, state }) {
            await fetch(`${VUE_APP_BACKEND_URI}/users/logout`, {
                method: "GET",
                credentials: "include",
            });
            commit("SET_LOGGED_USER", {
                userId: null,
                username: null,
                type: null,
                image: null,
            });
            saveToLocalStorage("loggedUser", state.loggedUser);
        },
        async fetchData({ commit, state }) {
            let response = await fetch(`${VUE_APP_BACKEND_URI}/users/profile`, {
                method: "GET",
                credentials: "include",
            });
            response = await response.json();

            if (response.statusCode === 200) {
                const user = {
                    id: response.data._id,
                    username: response.data.username,
                    email: response.data.email,
                    image: response.data.image,
                    isAdmin: response.data.isAdmin,
                };

                commit("SET_LOGGED_USER", user);
                saveToLocalStorage("loggedUser", state.loggedUser);
            } else {
                return false;
            }

            if (response.data.isAdmin) {
                response = await fetch(`${VUE_APP_BACKEND_URI}/users`, {
                    method: "GET",
                    credentials: "include",
                });

                response = await response.json();

                if (response.statusCode === 200) {
                    const users = response.data.map((user) => ({
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        image: user.image,
                        isAdmin: user.isAdmin,
                    }));
                    commit("SET_USERS", users);
                    saveToLocalStorage("users", state.users);
                }
            } else {
                commit("SET_USERS", []);
                saveToLocalStorage("users", state.users);
            }

            response = await fetch(`${VUE_APP_BACKEND_URI}/tasks`, {
                method: "GET",
                credentials: "include",
            });
            response = await response.json();

            if (response.statusCode === 200) {
                const tasks = response.data.map((task) => ({
                    id: task._id,
                    title: task.title,
                    dueDate: task.dueDate,
                    priority: task.priority,
                    userId: task.userId,
                    status: task.status,
                    createdDate: task.createdAt,
                }));

                commit("SET_TASKS", tasks);
                saveToLocalStorage("tasks", state.tasks);
            }
            return true;
        },
    },
});
