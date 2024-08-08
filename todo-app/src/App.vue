<template>
    <v-app>
        <NavBarComponent></NavBarComponent>
        <v-main>
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
