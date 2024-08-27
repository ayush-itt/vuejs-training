export default {
    directives: {
        color: {
            // eslint-disable-next-line
            bind(el, binding, vnode) {
                if (binding.value == "random")
                    el.style.backgroundColor = `#${Math.random()
                        .toString()
                        .slice(2, 10)}`;
                else el.style.backgroundColor = binding.value;
            },
        },
    },
};
