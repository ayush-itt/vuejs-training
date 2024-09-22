<template>
    <v-card class="pa-2" elevation="2" outlined rounded="xl">
        <v-card-title class="d-flex justify-space-between align-center">
            <span class="headline">{{ title }}</span>
            <v-badge
                :content="count || '0'"
                color="primary"
                overlap
                class="text-3"
            ></v-badge>
        </v-card-title>
    </v-card>
</template>

<script>
export default {
    name: "TaskSummaryCard",
    props: {
        title: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
    },
};
</script>
