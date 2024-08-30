<template>
    <v-container class="my-5">
        <v-row class="mb-4">
            <v-btn-toggle v-model="currentFilter" mandatory tile dense>
                <v-btn value="all" color="primary" outlined>All</v-btn>
                <v-btn value="remaining" color="primary" outlined
                    >Remaining</v-btn
                >
                <v-btn value="completed" color="primary" outlined
                    >Completed</v-btn
                >
            </v-btn-toggle>
        </v-row>

        <ag-grid-vue
            class="ag-theme-quartz"
            :domLayout="'autoHeight'"
            :columnDefs="taskHeaders"
            :rowData="filteredTasks"
            :gridOptions="gridOptions"
        >
        </ag-grid-vue>

        <v-btn
            fab
            color="primary"
            class="floating-btn"
            @click="openAddTaskDialog"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-container>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import ActionRenderer from "@/components/ActionRenderer"; // eslint-disable-line no-unused-vars
import { taskHeaders, gridOptions } from "../commons/columnHeadres";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export default {
    props: {
        dialog: Boolean,
        editTask: Boolean,
        context: Object,
        openAddTaskDialog: Function,
    },
    components: {
        AgGridVue,
    },
    data() {
        return {
            currentFilter: "all",
            taskHeaders,
            gridOptions: {
                ...gridOptions,
                context: this.context,
            },
        };
    },
    computed: {
        allTasks() {
            return this.$store.getters.getTasksByLoggedUser;
        },
        remainingTasks() {
            return this.$store.getters.getRemaningTaskOfUser;
        },
        completedTasks() {
            return this.$store.getters.getCompletedTaskOfUser;
        },
        filteredTasks() {
            switch (this.currentFilter) {
                case "all":
                    return this.allTasks;
                case "remaining":
                    return this.remainingTasks;
                case "completed":
                    return this.completedTasks;
                default:
                    return [];
            }
        },
    },
};
</script>

<style scoped>
.floating-btn {
    position: fixed;
    bottom: 16px;
    right: 16px;
}
</style>
