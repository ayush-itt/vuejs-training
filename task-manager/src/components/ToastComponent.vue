<template>
    <v-snackbar
        v-model="show"
        :timeout="timeout"
        :color="color"
        absolute
        right
        top
    >
        {{ text }}
        <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="show = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    props: {
        value: Boolean,
        text: String,
        color: String,
        timeout: Number,
    },
    computed: {
        show: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit("input", newValue);
            },
        },
    },
};
</script>
