<template>
    <v-app>
        <NavBarComponent
            v-if="['dashboard', 'tasks', 'report'].includes(this.$route.name)"
        ></NavBarComponent>
        <v-main class="mx-4 mb-4">
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import NavBarComponent from "@/components/NavbarComponent";

export default {
    data: () => ({}),
    components: {
        NavBarComponent,
    },
};
</script>
