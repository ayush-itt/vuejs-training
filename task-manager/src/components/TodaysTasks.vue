<template>
    <v-card elevation="2" outlined>
        <v-card-title class="headline">
            <v-badge
                :content="todaysTasks.length || '0'"
                color="primary"
                floating
                >Today's Tasks</v-badge
            >
        </v-card-title>
        <v-divider></v-divider>

        <ag-grid-vue
            class="ag-theme-quartz"
            :columnDefs="todaysTaskHeaders"
            :rowData="todaysTasks"
            :gridOptions="gridOptions"
            :domLayout="'autoHeight'"
        ></ag-grid-vue>
    </v-card>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import { todaysTaskHeaders, gridOptions } from "../commons/columnHeadres";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export default {
    name: "TodaysTasks",
    components: { AgGridVue },
    data() {
        return {
            todaysTaskHeaders,
            gridOptions,
        };
    },
    computed: {
        getAllTasks() {
            return this.$store.getters.getTasksByLoggedUser;
        },
        todaysTasks() {
            const today = new Date().toISOString().substr(0, 10);
            return this.getAllTasks.filter(
                (task) => task.dueDate === today && !task.status
            );
        },
    },
    methods: {
        formatDate(date) {
            const options = { year: "numeric", month: "short", day: "numeric" };
            return new Date(date).toLocaleDateString(undefined, options);
        },
    },
};
</script>
