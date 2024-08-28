<template>
    <div>
        <v-btn icon @click="editTask">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteTask">
            <v-icon>mdi-delete</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    methods: {
        editTask() {
            this.params.context.openEditTaskDialog(this.params.data);
        },
        deleteTask() {
            this.params.context.deleteTaskHandler(this.params.data.id);
        },
    },
};
</script>
