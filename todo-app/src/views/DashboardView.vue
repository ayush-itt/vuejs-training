<template>
    <v-col class="dashboard">
        <h1 class="grey--text overline">Dashboard</h1>
        <v-container class="my-5">
            <v-row class="mb-3" dense>
                <v-col
                    v-for="(item, index) in taskSummaries"
                    :key="index"
                    cols="12"
                    md="4"
                >
                    <v-card class="pa-3" elevation="2" outlined>
                        <v-card-title
                            class="d-flex justify-space-between align-center"
                        >
                            <span class="headline">{{ item.title }}</span>
                            <v-badge
                                :content="item.count || '0'"
                                color="primary"
                                overlap
                                class="text-3"
                            ></v-badge>
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="12">
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
                </v-col>
            </v-row>
        </v-container>
    </v-col>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import { mapGetters } from "vuex";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export default {
    name: "DashboardView",
    components: { AgGridVue },
    data() {
        return {
            columnDefs: [
                { headerName: "Title", field: "text" },
                { headerName: "Due Date", field: "dueDate", sortable: false },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
        };
    },
    computed: {
        ...mapGetters(["allTodos", "remainingTodos", "completedTodos"]),
        taskSummaries() {
            return [
                { title: "Total Tasks", count: this.allTodos.length },
                { title: "Completed Tasks", count: this.completedTodos.length },
                { title: "Remaining Tasks", count: this.remainingTodos.length },
            ];
        },
        todaysTasks() {
            const today = new Date().toISOString().substr(0, 10);
            return this.allTodos.filter(
                (task) => task.dueDate === today && !task.done
            );
        },
    },
};
</script>

<style scoped>
.todo-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
}

.text-decoration-line-through {
    text-decoration: line-through;
}
</style>
