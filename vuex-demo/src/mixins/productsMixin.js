export default {
    computed: {
        products() {
            return this.$store.getters.products;
        },
        saleProducts() {
            return this.$store.getters.saleProducts;
        },
    },
};
