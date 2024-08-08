export default {
    filters: {
        uppercase(value) {
            return value.toUpperCase();
        },
        less(value) {
            return `${value.slice(0, 100)}...`;
        },
    },
};
