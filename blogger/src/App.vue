<template>
    <v-app>
        <v-main>
            <div>
                <app-header></app-header>
                <router-view></router-view>
            </div>
        </v-main>
    </v-app>
</template>

<script>
/* eslint-disable */
import AppHeader from "./components/appHeader.vue";
// import TestComponent from "./components/testComponent.vue";

export default {
    data() {
        return {};
    },
    components: {
        AppHeader,
        // TestComponent,
    },
    methods: {},
};
</script>

<style scoped>
body {
    margin: 0;
    font-family: "Nunito SemiBold";
}
</style>
