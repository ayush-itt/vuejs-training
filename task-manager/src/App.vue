<template>
    <v-app>
        <NavBarComponent
            v-if="this.$route.meta?.requiresAuth"
        ></NavBarComponent>
        <v-main class="mx-4 mb-4">
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import NavBarComponent from "@/components/NavbarComponent";

export default {
    components: {
        NavBarComponent,
    },
};
</script>
