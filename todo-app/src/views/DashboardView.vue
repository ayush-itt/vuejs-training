<template>
    <v-col class="dashboard">
        <h1 class="grey--text overline">Dashboard</h1>
        <v-container class="my-5">
            <!-- First Row: Task Summaries -->
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

            <!-- Second Row: Today's Tasks -->
            <v-row dense>
                <v-col cols="12">
                    <v-card elevation="2" outlined>
                        <v-card-title class="headline"
                            >Today's Tasks

                            <v-badge
                                :content="todaysTasks.length || '0'"
                                color="primary"
                            ></v-badge
                        ></v-card-title>
                        <v-divider></v-divider>
                        <v-list class="scrollable-list">
                            <v-list-item
                                v-for="(task, id) in todaysTasks"
                                :key="id"
                                class="todo-item"
                            >
                                <v-list-item-content class="px-5">
                                    <v-list-item-title
                                        :class="{
                                            'text-decoration-line-through':
                                                task.done,
                                        }"
                                    >
                                        {{ task.text }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle class="grey--text">
                                        Due: {{ task.dueDate }}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item v-if="!todaysTasks.length">
                                <v-list-item-content>
                                    <v-list-item-title
                                        class="text-center grey--text"
                                    >
                                        No tasks for today.
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-col>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "DashboardView",
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

/* Scrollable Todo List */
.scrollable-list {
    max-height: 40vh; /* Adjust as needed */
    overflow-y: auto;
}
</style>
