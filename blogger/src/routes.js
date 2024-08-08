import AddBlog from "./components/addBlog.vue";
import ShowBlogs from "./components/showBlogs.vue";
import SingleBlog from "./components/singleBlog.vue";

export default [
    {
        path: "/",
        component: ShowBlogs,
    },
    {
        path: "/add",
        component: AddBlog,
    },
    {
        path: "/blogs/:id",
        component: SingleBlog,
    },
];
