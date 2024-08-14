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
        profile: getFromLocalStorage("profile") || {
            userId: null,
            username: "",
            img: "",
        },
        todos: getFromLocalStorage("todos") || [],
        users: getFromLocalStorage("users") || [],
    },
    mutations: {
        SET_PROFILE(state, profile) {
            state.profile = profile;
            saveToLocalStorage("profile", profile);
        },
        ADD_TODO(state, todo) {
            state.todos.push(todo);
            saveToLocalStorage("todos", state.todos);
        },
        UPDATE_TODO(state, updatedTodo) {
            state.todos = updatedTodo;
            saveToLocalStorage("todos", state.todos);
        },
        DELETE_TODO(state, todoId) {
            state.todos = state.todos.filter((todo, id) => id != todoId);
            saveToLocalStorage("todos", state.todos);
        },
        ADD_USER(state, user) {
            state.users.push(user);
            saveToLocalStorage("users", state.users);
        },
        REMOVE_USER(state, userId) {
            state.users = state.users.filter((user) => user.id !== userId);
            saveToLocalStorage("users", state.users);
        },
    },
    actions: {
        setProfile({ commit }, profile) {
            commit("SET_PROFILE", profile);
        },
        addTodo({ commit }, todo) {
            const newTodo = { ...todo, id: Date.now() };
            commit("ADD_TODO", newTodo);
        },
        updateTodo({ commit }, updatedTodo, todoId) {
            commit("UPDATE_TODO", updatedTodo, todoId);
        },
        deleteTodo({ commit }, todoId) {
            commit("DELETE_TODO", todoId);
        },
        addUser({ commit }, user) {
            commit("ADD_USER", user);
        },
        removeUser({ commit }, userId) {
            commit("REMOVE_USER", userId);
        },
        loadInitialData() {
            getFromLocalStorage("todos");
            getFromLocalStorage("users");
            getFromLocalStorage("profile");
        },
    },
    getters: {
        profile: (state) => state.profile,
        allTodos: (state) => state.todos,
        remainingTodos: (state) => state.todos.filter((todo) => !todo.done),
        completedTodos: (state) => state.todos.filter((todo) => todo.done),
        users: (state) => state.users,
        getUserByUsername: (state) => (username) => {
            return state.users.find((user) => user.username === username);
        },
    },
});
