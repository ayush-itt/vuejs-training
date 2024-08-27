<template>
    <div v-theme="theme" id="show-blogs">
        <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold text-h3 text-basil">
                All Blog Articles
            </h1>
        </v-card-title>

        <v-text-field v-model="search" placeholder="search blogs">
            <v-icon slot="prepend" color="blue"> mdi-search-web </v-icon>
        </v-text-field>

        <v-row>
            <v-col cols="12" v-for="blog in filteredBlog" v-bind:key="blog.id">
                <v-card v-color="'random'">
                    <v-card-title class="text-h5">
                        {{ blog.title | uppercase }}
                    </v-card-title>

                    <v-card-subtitle>{{ blog.content | less }}</v-card-subtitle>

                    <router-link v-bind:to="'/blogs/' + blog.id">
                        <v-card-actions>
                            <v-btn text> Show more </v-btn>
                        </v-card-actions>
                    </router-link>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import searchMixin from "../mixins/searchMixin";
import colorMixin from "../mixins/colorMixin";
import themeMixin from "../mixins/themeMixin";
import filtersMixin from "../mixins/filtersMixin";

export default {
    data() {
        return {
            blogs: [],
            theme: "default",
            search: "",
        };
    },
    methods: {},
    computed: {},
    filters: {},
    directives: {},
    mixins: [searchMixin, colorMixin, themeMixin, filtersMixin],
    created() {
        this.$http
            .get("https://fir-bdf6a-default-rtdb.firebaseio.com/blogs.json")
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                var blogsArray = [];
                for (let key in data) {
                    data[key].id = key;
                    blogsArray.push(data[key]);
                }
                this.blogs = blogsArray;
            });
    },
};
</script>

<style>
#show-blogs {
    max-width: 800px;
    margin: 0px auto;
}

input[type="text"] {
    padding: 10px;
    width: 100%;
    margin-bottom: 10px;
}
.single-blog {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
}
a {
    text-decoration: none;
}
</style>
