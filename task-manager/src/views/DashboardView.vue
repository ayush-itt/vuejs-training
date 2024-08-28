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
import { mapGetters } from "vuex";
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
        ...mapGetters([
            "getTasksByLoggedUser",
            "getRemaningTaskOfUser",
            "getCompletedTaskOfUser",
        ]),
        taskSummaries() {
            return [
                {
                    title: "Total Tasks",
                    count: this.getTasksByLoggedUser.length,
                },
                {
                    title: "Completed Tasks",
                    count: this.getCompletedTaskOfUser.length,
                },
                {
                    title: "Remaining Tasks",
                    count: this.getRemaningTaskOfUser.length,
                },
            ];
        },
    },
};
</script>
