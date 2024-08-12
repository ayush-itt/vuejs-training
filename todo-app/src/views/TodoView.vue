<template>
    <v-col class="todo">
        <h1 class="grey--text overline">To Do</h1>
        <v-container class="my-5">
            <!-- Filters -->
            <v-row class="mb-4">
                <v-btn-toggle
                    v-model="currentFilter"
                    mandatory
                    tile
                    dense
                    rounded
                >
                    <v-btn value="all" color="primary" outlined>All</v-btn>
                    <v-btn value="remaining" color="primary" outlined
                        >Remaining</v-btn
                    >
                    <v-btn value="completed" color="primary" outlined
                        >Completed</v-btn
                    >
                </v-btn-toggle>
            </v-row>

            <!-- Todo Items List (Scrollable) -->
            <v-list class="scrollable-list">
                <v-list-item
                    v-for="(task, id) in filteredTasks"
                    :key="id"
                    class="todo-item"
                >
                    <v-list-item>
                        <v-list-item-action>
                            <v-checkbox
                                v-model="task.done"
                                color="success"
                                dense
                            ></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title
                                :class="{
                                    'text-decoration-line-through': task.done,
                                }"
                            >
                                {{ task.text }}
                            </v-list-item-title>
                            <v-list-item-subtitle class="grey--text">
                                Due: {{ task.dueDate }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon @click="deleteTodo(id)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                </v-list-item>
                <v-list-item v-if="!filteredTasks.length">
                    <v-list-item-content>
                        <v-list-item-title class="text-center grey--text">
                            No tasks to display.
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <!-- Floating Action Button -->
            <v-btn
                fab
                color="primary"
                class="floating-btn"
                @click="openAddTaskDialog"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-container>

        <!-- Add Task Dialog -->
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Add New Task</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-text-field
                            v-model="newTask.text"
                            label="Task Title"
                            :rules="[(v) => !!v || 'Title is required']"
                            required
                        ></v-text-field>
                        <v-menu
                            v-model="datePickerMenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290"
                        >
                            <template #activator="{ on, attrs }">
                                <v-text-field
                                    v-model="newTask.dueDate"
                                    label="Due Date"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :rules="[
                                        (v) => !!v || 'Due Date is required',
                                    ]"
                                    required
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="newTask.dueDate"
                                @input="datePickerMenu = false"
                                :min="minDate"
                                locale="en"
                            ></v-date-picker>
                        </v-menu>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="addTask" :disabled="!valid"
                        >Add</v-btn
                    >
                    <v-btn text @click="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-col>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "ToDoView",
    data() {
        return {
            currentFilter: "all",
            dialog: false,
            valid: false,
            newTask: {
                text: "",
                dueDate: "",
            },
            datePickerMenu: false, // For controlling the date picker menu
            minDate: new Date().toISOString().substr(0, 10), // Minimum date to today
        };
    },
    computed: {
        ...mapGetters(["remainingTodos", "completedTodos"]),
        allTodos() {
            return this.$store.getters.allTodos;
        },
        filteredTasks() {
            switch (this.currentFilter) {
                case "all":
                    return this.allTodos;
                case "remaining":
                    return this.remainingTodos;
                case "completed":
                    return this.completedTodos;
                default:
                    return [];
            }
        },
    },
    methods: {
        ...mapActions(["addTodo", "updateTodo", "deleteTodo"]),
        openAddTaskDialog() {
            this.dialog = true;
        },
        addTask() {
            if (this.$refs.form.validate()) {
                this.addTodo({
                    text: this.newTask.text,
                    dueDate: this.newTask.dueDate,
                    done: false,
                });
                this.dialog = false;
                this.newTask = { text: "", dueDate: "" };
            }
        },
    },
    watch: {
        allTodos: {
            handler(newTodos) {
                this.$store.dispatch("updateTodo", newTodos);
            },
            deep: true,
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

.floating-btn {
    position: fixed;
    bottom: 16px;
    right: 16px;
}

/* Scrollable Todo List */
.scrollable-list {
    max-height: 54vh; /* Adjust as needed */
    overflow-y: auto;
}

/* Style adjustments for better spacing and readability */
.v-menu__content {
    padding: 0;
}

.v-date-picker {
    border: 1px solid #ddd;
    border-radius: 4px;
}

.v-text-field--readonly {
    cursor: pointer;
}
</style>
