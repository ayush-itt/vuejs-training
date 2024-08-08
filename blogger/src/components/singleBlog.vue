<template>
    <v-card class="mx-auto" v-color="'random'" max-width="900">
        <v-card-title>
            <v-icon large left> mdi-web </v-icon>
            <span class="text-h5 font-weight-bold">{{ blog.title }}</span>
        </v-card-title>
        <v-card-title>
            <span class="text-h6 font-weight-light">{{
                blog.categories?.join(" | ")
            }}</span>
        </v-card-title>

        <v-card-text class="text-h5 font-weight-bold">
            {{ blog.content }}
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
</template>

<script>
// Imports
import colorMixin from "../mixins/colorMixin";

export default {
    data() {
        return {
            id: this.$route.params.id,
            blog: {},
        };
    },
    mixins: [colorMixin],
    created() {
        this.$http
            .get(
                "https://fir-bdf6a-default-rtdb.firebaseio.com/blogs/" +
                    this.id +
                    ".json"
            )
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                this.blog = data;
            });
    },
};
</script>

<style></style>
