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
            :columnDefs="columnDefs"
            :rowData="todaysTasks"
            :defaultColDef="defaultColDef"
            :domLayout="'autoHeight'"
        ></ag-grid-vue>
    </v-card>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export default {
    name: "TodaysTasks",
    components: { AgGridVue },
    data() {
        return {
            columnDefs: [
                { headerName: "Id", field: "id", sortable: false },
                {
                    headerName: "Title",
                    field: "title",
                },
                {
                    headerName: "Created Date",
                    field: "createdDate",
                    filter: false,
                },
                {
                    headerName: "Due Date",
                    field: "dueDate",
                    sortable: false,
                    filter: false,
                },
                {
                    headerName: "Priority",
                    field: "priority",
                    cellRenderer: (params) => {
                        return params.value
                            ? `<span class="mdi mdi-star" style="color:green"></span>`
                            : ``;
                    },
                    filter: false,
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
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
