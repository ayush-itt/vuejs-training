<template>
    <v-col class="report">
        <h1 class="grey--text overline">Report</h1>
        <v-container class="my-5">
            <v-row justify="center">
                <v-col cols="12" md="8">
                    <v-card
                        class="pa-5"
                        elevation="2"
                        outlined
                        color="grey lighten-2"
                    >
                        <v-row>
                            <v-card-title>
                                <span class="headline">Task Completed</span>
                            </v-card-title>
                            <v-spacer></v-spacer>
                            <v-card-title>
                                <span class="subtitle-1"
                                    >{{ getCompletedTaskOfUser.length }} /
                                    {{ getTasksByLoggedUser.length }}</span
                                >
                            </v-card-title>
                        </v-row>

                        <v-divider></v-divider>
                        <v-card-text>
                            <v-progress-linear
                                :value="completionRate"
                                color="green"
                                background-color="white"
                                height="20"
                                rounded
                            >
                            </v-progress-linear>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-col>
</template>

<script>
export default {
    name: "ReportView",
    computed: {
        getAllTasks() {
            return this.$store.getters.getTasksByLoggedUser;
        },
        getCompletedTasks() {
            return this.$store.getters.getCompletedTaskOfUser;
        },
        completionRate() {
            const totalTasks = this.getTasksByLoggedUser.length;
            const completedTasks = this.getCompletedTaskOfUser.length;
            return totalTasks > 0
                ? Math.round((completedTasks / totalTasks) * 100)
                : 0;
        },
    },
};
</script>

<style scoped>
.report {
    padding: 20px;
}
</style>
