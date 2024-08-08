<template>
    <nav>
        <v-app-bar flat app>
            <v-app-bar-nav-icon
                class="grey--text"
                v-if="!appConfig.permanent"
                @click.stop="appConfig.drawer = !appConfig.drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text display-1">
                <span class="font-weight-light">ToDo</span>
                <span>App</span>
            </v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer
            v-model="appConfig.drawer"
            app
            absolute
            :temporary="appConfig.overlay && !appConfig.permanent"
            :permanent="appConfig.permanent"
            class="gray lighten-2"
        >
            <v-list-item>
                <v-list-item-avatar>
                    <v-img :src="profile.image"></v-img>
                </v-list-item-avatar>

                <v-list-item-title>{{ profile.username }}</v-list-item-title>
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
            profile: {
                username: "John Leider",
                image: "https://randomuser.me/api/portraits/men/85.jpg",
            },
            appConfig: {
                drawer: false,
                overlay: true,
                permanent: true,
            },
            navItems: {
                dashboard: {
                    title: "Dashboard",
                    icon: "mdi-view-dashboard",
                    route: "/",
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
};
</script>
