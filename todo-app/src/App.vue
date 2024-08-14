<template>
    <v-app>
        <NavBarComponent v-if="$store.getters.profile?.id"></NavBarComponent>
        <v-main class="mx-2 my-2">
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import NavBarComponent from "./components/NavbarComponent";

export default {
    data() {
        return {};
    },
    components: { NavBarComponent },
};
</script>

<style></style>
