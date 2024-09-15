<template>
    <nav>
        <v-app-bar flat app>
            <v-app-bar-nav-icon
                class="grey--text"
                v-if="!appConfig.permanent"
                @click.stop="appConfig.drawer = !appConfig.drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text display-1">
                <span class="font-weight-light">Task Manager</span>
                <span> App</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-col cols="auto">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn rounded depressed v-bind="attrs" v-on="on" icon>
                            <v-icon color="blue darken-3">mdi-bell</v-icon>
                            <v-badge
                                v-if="remainingTasksCount > 0"
                                color="warning"
                                overlap
                            ></v-badge>
                        </v-btn>
                    </template>
                    <span v-if="remainingTasksCount > 0"
                        >You have {{ remainingTasksCount }} tasks remaining
                        today.</span
                    >
                    <span v-else>No remaining tasks for today.</span>
                </v-tooltip>
            </v-col>

            <v-btn color="red lighten-1" @click="signOut">
                <span>Sign Out</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer
            v-model="appConfig.drawer"
            app
            sticky
            :temporary="appConfig.overlay && !appConfig.permanent"
            :permanent="appConfig.permanent"
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
                username: this.$store.getters.loggedUser.username,
                image: this.$store.getters.loggedUser.image,
            },
            appConfig: {
                drawer: false,
                overlay: true,
                permanent: true,
            },
            isMenuVisible: false,
            navItems: {
                dashboard: {
                    title: "Dashboard",
                    icon: "mdi-view-dashboard",
                    route: "/dashboard",
                },
                taskManager: {
                    title: "Task Manager",
                    icon: "mdi-clipboard-check",
                    route: "/tasks",
                },
                report: {
                    title: "Report",
                    icon: "mdi-chart-bar",
                    route: "/report",
                },
            },
        };
    },
    computed: {
        remainingTasksCount() {
            const today = new Date().toISOString().substring(0, 10);
            return this.$store.getters.getTasksByLoggedUser.filter(
                (task) => task.dueDate === today && !task.status
            ).length;
        },
    },
    methods: {
        async signOut() {
            await this.$store.dispatch("logout");
            this.$router.push("/login");
        },
    },
};
</script>
