import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        products: [
            { name: "Watch", price: 2999 },
            { name: "Monotor", price: 7599 },
            { name: "Foot Ball", price: 1299 },
            { name: "Hammer", price: 800 },
        ],
    },
    getters: {
        products(state) {
            return state.products;
        },
        saleProducts(state) {
            return state.products.map((product) => ({
                name: product.name,
                price: Math.floor(product.price * 0.75),
            }));
        },
    },
    mutations: {
        reducePrice(state, payload) {
            state.products.forEach((product) => {
                product.price -= payload;
            });
        },
    },
    actions: {
        reducePrice(context, payload) {
            setTimeout(() => context.commit("reducePrice", payload), 3000);
        },
    },
});
