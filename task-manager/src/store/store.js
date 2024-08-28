import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

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
            type: null,
            image: null,
        },
        users: getFromLocalStorage("users") || [],
        tasks: getFromLocalStorage("tasks") || [],
    },
    getters: {
        loggedUser: (state) => state.loggedUser,
        getTasksByLoggedUser: (state) => {
            return state.tasks.filter(
                (task) => task.userId === state.loggedUser.id
            );
        },
        getRemaningTaskOfUser: (state) =>
            state.tasks.filter(
                (task) => task.userId === state.loggedUser.id && !task.status
            ),
        getCompletedTaskOfUser: (state) =>
            state.tasks.filter(
                (task) => task.userId === state.loggedUser.id && task.status
            ),

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
        addTask({ commit, state }, { userId, title, dueDate, priority }) {
            const newTask = {
                id: Date.now().toString(),
                userId: userId,
                title: title,
                createdDate: new Date().toISOString().substring(0, 10),
                dueDate: dueDate,
                status: false,
                priority: priority,
            };
            commit("ADD_TASK", newTask);
            saveToLocalStorage("tasks", state.tasks);
        },
        addUser(
            { commit, state },
            { username, email, password, image, isAdmin }
        ) {
            if (
                state.users.find(
                    (user) => user.username === username || user.email === email
                )
            )
                return false;
            const newUser = {
                id: Date.now().toString(),
                username,
                email,
                password,
                image,
                isAdmin,
            };
            commit("ADD_USER", newUser);
            saveToLocalStorage("users", state.users);
            return true;
        },
        updateTask({ commit, state }, updatedTask) {
            commit("UPDATE_TASK", updatedTask);
            saveToLocalStorage("tasks", state.tasks);
        },
        deleteTask({ commit, state }, taskId) {
            commit("DELETE_TASK", taskId);
            saveToLocalStorage("tasks", state.tasks);
        },
        login({ commit, state }, { username, password }) {
            const user = state.users.find(
                (user) =>
                    user.username === username && user.password === password
            );
            if (user) {
                commit("SET_LOGGED_USER", user);
                saveToLocalStorage("loggedUser", state.loggedUser);
                return true;
            } else {
                return false;
            }
        },
        logout({ commit, state }) {
            commit("SET_LOGGED_USER", {
                userId: null,
                username: null,
                type: null,
                image: null,
            });
            saveToLocalStorage("loggedUser", state.loggedUser);
        },
    },
});
