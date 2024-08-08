<template>
    <div id="add-blog">
        <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold text-h3 text-basil">
                Add a New Blog Post
            </h1>
        </v-card-title>
        <form v-if="!submit">
            <label>Blog Title:</label>
            <input type="text" v-model.lazy="blog.title" required />
            <label>Blog Content:</label>
            <textarea v-model.lazy.trim="blog.content"></textarea>
            <div id="checkboxes">
                <p>Blog Categories:</p>
                <label>Ninjas</label>
                <input
                    type="checkbox"
                    value="ninjas"
                    v-model="blog.categories"
                />
                <label>Wizards</label>
                <input
                    type="checkbox"
                    value="wizards"
                    v-model="blog.categories"
                />
                <label>Mario</label>
                <input
                    type="checkbox"
                    value="mario"
                    v-model="blog.categories"
                />
                <label>Cheese</label>
                <input
                    type="checkbox"
                    value="cheese"
                    v-model="blog.categories"
                />
            </div>
            <label>Author:</label>
            <select v-model="blog.author">
                <option value="" v-bind:selected="true" v-bind:disabled="true">
                    Select
                </option>
                <option v-for="(author, i) in authors" v-bind:key="i">
                    {{ author }}
                </option>
            </select>
            <button v-on:click="addBlog()" type="button">Add Blog</button>
        </form>
        <v-card class="mx-auto my-12" v-color="'random'" max-width="900">
            <v-card-title>
                <v-icon large left> mdi-web </v-icon>
                <span class="text-h5 font-weight-light">{{
                    blog.title || "Title"
                }}</span>
            </v-card-title>
            <v-card-title>
                <span class="text-h6 font-weight-light">{{
                    blog.categories?.join(" | ") || "Categories"
                }}</span>
            </v-card-title>

            <v-card-text class="text-h5 font-weight-bold">
                {{ blog.content || "Blog content here!!" }}
            </v-card-text>

            <v-card-actions>
                <v-list-item class="grow">
                    <v-list-item-avatar color="grey darken-3">
                        <v-img
                            class="elevation-6"
                            alt=""
                            src="https://avatar.iran.liara.run/public"
                        ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{
                            blog.author || "Anonymous"
                        }}</v-list-item-title>
                    </v-list-item-content>

                    <v-row align="center" justify="end">
                        <v-icon class="mr-1"> mdi-heart </v-icon>
                        <span class="subheading mr-2">{{
                            Math.round(Math.random() * 1000)
                        }}</span>
                        <span class="mr-1">·</span>
                        <v-icon class="mr-1"> mdi-share-variant </v-icon>
                        <span class="subheading">{{
                            Math.round(Math.random() * 100)
                        }}</span>
                    </v-row>
                </v-list-item>
            </v-card-actions>
        </v-card>
        <button
            type="button"
            v-if="submit !== undefined"
            v-on:click="addNewBlog()"
        >
            Add New Blog
        </button>
        <p v-if="submit == true">Submit success!!</p>
        <p v-else-if="submit == false">Submit unsuccess!!</p>
    </div>
</template>

<script>
// Imports
import colorMixin from "../mixins/colorMixin";

export default {
    data() {
        return {
            blog: {
                title: "",
                content: "",
                categories: [],
                author: "",
            },
            authors: [
                "The Net Ninja",
                "The Angular Avenger",
                "The Vue Vindicator",
            ],
            submit: undefined,
        };
    },
    mixins: [colorMixin],
    methods: {
        addBlog() {
            // Add blog to the database
            // Reset the form

            this.$http
                .post(
                    "https://fir-bdf6a-default-rtdb.firebaseio.com/blogs.json",
                    {
                        title: this.blog.title,
                        content: this.blog.content,
                        author: this.blog.author,
                        categories: this.blog.categories,
                    }
                )
                .then((res) => {
                    this.submit = true;
                    console.log(res);
                })
                .catch((err) => {
                    this.submit = false;
                    console.log(err);
                });
        },
        addNewBlog() {
            // Reset the form
            this.blog = {
                title: "",
                content: "",
                categories: [],
                author: "",
            };
            this.submit = undefined;
        },
    },
};
</script>

<style>
#add-blog * {
    box-sizing: border-box;
}
#add-blog {
    margin: 0px auto;
    max-width: 500px;
}
label {
    display: block;
    margin: 20px 0 10px;
}
input[type="text"],
textarea {
    display: block;
    width: 100%;
    padding: 8px;
}
#preview {
    padding: 10px 20px;
    border: 1px dotted #ccc;
}
h3 {
    margin-top: 10px;
}
#checkboxes input {
    display: inline-block;
    margin-right: 10px;
}
#checkboxes label {
    display: inline-block;
    margin-top: 0;
}
</style>
