<template>
    <v-col class="dashboard">
        <h1 class="grey--text overline">Dashboard</h1>
        <v-container class="my-5">
            <v-row>
                <v-col class="mb-3" dense>
                    <CalendarComponent />
                </v-col>
                <v-col class="mb-3" dense>
                    <v-col
                        v-for="(item, index) in taskSummaries"
                        :key="index"
                        cols="12"
                        md="8"
                    >
                        <TaskSummaryCard
                            :title="item.title"
                            :count="item.count"
                        ></TaskSummaryCard>
                    </v-col>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="12">
                    <TodaysTasks />
                </v-col>
            </v-row>
        </v-container>
    </v-col>
</template>

<script>
import TaskSummaryCard from "@/components/TaskSummaryCard";
import CalendarComponent from "@/components/CalendarComponent";
import TodaysTasks from "@/components/TodaysTasks";

export default {
    name: "DashboardView",
    components: { TaskSummaryCard, CalendarComponent, TodaysTasks },
    data() {
        return {};
    },
    computed: {
        getAllTasks() {
            return this.$store.getters.getTasksByLoggedUser;
        },
        getRemaningTasks() {
            return this.$store.getters.getRemaningTaskOfUser;
        },
        getCompletedTasks() {
            return this.$store.getters.getCompletedTaskOfUser;
        },
        taskSummaries() {
            return [
                {
                    title: "Total Tasks",
                    count: this.getAllTasks.length,
                },
                {
                    title: "Completed Tasks",
                    count: this.getCompletedTasks.length,
                },
                {
                    title: "Remaining Tasks",
                    count: this.getRemaningTasks.length,
                },
            ];
        },
    },
};
</script>
