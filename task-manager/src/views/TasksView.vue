<template>
    <v-col class="task">
        <h1 class="grey--text overline">Tasks</h1>
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
                :columnDefs="columnDefs"
                :rowData="filteredTasks"
                :gridOptions="gridOptions"
                @grid-ready="onGridReady"
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

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline" v-if="!editTask">Add Task</span>
                    <span class="headline" v-else>Edit Task</span>
                </v-card-title>

                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-select
                            v-if="isAdmin"
                            v-model="newTask.userId"
                            :items="getAllUsers"
                            item-text="email"
                            item-value="id"
                            label="User"
                            outlined
                            dense
                        >
                            <template v-slot:item="data">
                                <v-list-item-avatar>
                                    <v-img :src="data.item.image" />
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        data.item.username
                                    }}</v-list-item-title>
                                    <v-list-item-subtitle>{{
                                        data.item.email
                                    }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                        </v-select>
                        <v-text-field
                            v-model="newTask.title"
                            label="Task Title"
                            outlined
                            dense
                            required
                        ></v-text-field>

                        <v-menu
                            ref="menu"
                            v-model="datePickerMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="newTask.dueDate"
                                    label="Due Date"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    dense
                                    required
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="newTask.dueDate"
                                :min="minDate"
                                no-title
                                @input="datePickerMenu = false"
                            ></v-date-picker>
                        </v-menu>

                        <v-checkbox
                            v-model="newTask.priority"
                            label="High Priority"
                            color="primary"
                            dense
                        ></v-checkbox>

                        <v-checkbox
                            v-model="newTask.status"
                            label="Status"
                            color="green"
                            dense
                            v-if="editTask"
                        ></v-checkbox>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="resetForm">Cancel</v-btn>
                    <v-btn
                        color="primary"
                        @click="addTaskHandler"
                        v-if="!editTask"
                        >Save</v-btn
                    >
                    <v-btn
                        color="primary"
                        @click="updateTaskHandler"
                        v-if="editTask"
                        >Update</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-col>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import { mapGetters } from "vuex";
import ActionRenderer from "@/components/ActionRenderer"; // eslint-disable-line no-unused-vars

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export default {
    name: "TaskView",
    components: {
        AgGridVue,
        ActionRenderer, // eslint-disable-line
    },
    data() {
        return {
            currentFilter: "all",
            dialog: false,
            editTask: false,
            valid: false,
            newTask: {
                title: "",
                dueDate: "",
                priority: false,
                userId: this.$store.getters.loggedUser.id,
            },
            gridOptions: {
                pagination: true,
                paginationPageSize: 5,
                paginationPageSizeSelector: [5, 10, 20],
                defaultColDef: {
                    sortable: true,
                    filter: true,
                },
                context: {
                    openEditTaskDialog: this.openAddTaskDialog,
                    deleteTaskHandler: this.deleteTaskHandler,
                },
            },
            columnDefs: [
                { headerName: "ID", field: "id", sortable: false },
                {
                    headerName: "Title",
                    field: "title",
                },
                {
                    headerName: "Created Date",
                    field: "createdDate",
                },
                {
                    headerName: "Due Date",
                    field: "dueDate",
                },
                {
                    headerName: "Priority",
                    field: "priority",
                    cellRenderer: (params) => {
                        return params.value
                            ? `<span class="mdi mdi-star" style="color:green"></span>`
                            : ``;
                    },
                },
                {
                    headerName: "Status",
                    field: "status",
                },
                {
                    headerName: "Action",
                    field: "action",
                    cellRenderer: "ActionRenderer",
                    sortable: false,
                    filter: false,
                },
            ],
            datePickerMenu: false,
            minDate: new Date().toISOString().substring(0, 10),
        };
    },
    computed: {
        ...mapGetters(["loggedUser", "getAllUsers"]),
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
        isAdmin() {
            return this.$store.getters.loggedUser.isAdmin;
        },
    },
    methods: {
        onGridReady() {},
        openAddTaskDialog(data) {
            if (data?.id) {
                this.editTask = true;
                this.newTask = data;
            } else {
                this.editTask = false;
            }
            this.dialog = true;
        },
        addTaskHandler() {
            if (this.$refs.form.validate()) {
                const task = {
                    userId: this.$store.getters.loggedUser.id,
                    ...this.newTask,
                    status: false,
                };
                this.$store.dispatch("addTask", task);
                this.resetForm();
            }
        },
        resetForm() {
            this.dialog = false;
            this.newTask = {
                title: "",
                dueDate: "",
                priority: false,
                userId: this.$store.getters.loggedUser.id,
            };
        },
        updateTaskHandler() {
            this.$store.dispatch("updateTask", this.newTask);
            this.resetForm();
            this.editTask = false;
        },
        deleteTaskHandler(taskId) {
            this.$store.dispatch("deleteTask", taskId);
        },
    },
    watch: {
        allTasks: {
            handler(newTodos) {
                this.$store.dispatch("updateTask", newTodos);
            },
            deep: true,
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
