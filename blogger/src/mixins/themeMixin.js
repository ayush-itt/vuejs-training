export default {
    directives: {
        theme: {
            // eslint-disable-next-line
            bind(el, binding, vnode) {
                if (binding.value == "wide") {
                    el.style.maxWidth = "1200px";
                } else if (binding.value == "narrow") {
                    el.style.maxWidth = "400px";
                } else if (binding.value == "default") {
                    el.style.maxWidth = "800px";
                }

                if (binding.arg == "column") {
                    el.style.backgroundColor = "#f0f0f0";
                    el.style.padding = "10px";
                }
            },
        },
    },
};
