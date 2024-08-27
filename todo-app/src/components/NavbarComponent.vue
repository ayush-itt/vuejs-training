<template>
    <nav>
        <v-app-bar flat app>
            <v-app-bar-nav-icon
                class="grey--text"
                v-if="!navConfig.permanent"
                @click.stop="navConfig.drawer = !navConfig.drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text display-1">
                <span class="font-weight-light">ToDo</span>
                <span>App</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn color="red lighten-1" @click="signOut">
                <span>Sign Out</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer
            v-model="navConfig.drawer"
            app
            absolute
            :temporary="navConfig.overlay && !navConfig.permanent"
            :permanent="navConfig.permanent"
            class="gray lighten-2"
        >
            <v-list-item class="py-1">
                <v-list-item-avatar>
                    <v-img :src="user.image"></v-img>
                </v-list-item-avatar>

                <v-list-item-title>{{ user.username }}</v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>

            <v-list rounded>
                <v-list-item
                    v-for="item in navItems"
                    :key="item.title"
                    router
                    :to="item.route"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            user: {
                username: this.$store.getters.user.username,
                image: this.$store.getters.user.img,
            },
            navConfig: {
                drawer: false,
                overlay: true,
                permanent: true,
            },
            navItems: {
                dashboard: {
                    title: "Dashboard",
                    icon: "mdi-view-dashboard",
                    route: "/dashboard",
                },
                todo: {
                    title: "To Do",
                    icon: "mdi-clipboard-check",
                    route: "/todo",
                },
                settings: {
                    title: "Settings",
                    icon: "mdi-cog",
                    route: "/settings",
                },
            },
        };
    },
    methods: {
        signOut() {
            this.$store.dispatch("setProfile", null);
            this.$router.push("/login");
        },
    },
};
</script>
