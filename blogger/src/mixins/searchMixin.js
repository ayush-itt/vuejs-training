export default {
    computed: {
        filteredBlog() {
            return this.blogs.filter((blog) => {
                return blog.title
                    .toLowerCase()
                    .includes(this.search.toLowerCase());
            });
        },
    },
};
