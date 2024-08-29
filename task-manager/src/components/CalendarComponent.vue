<template>
    <v-col>
        <v-sheet height="64">
            <v-toolbar flat>
                <v-btn
                    outlined
                    class="mr-4"
                    color="grey darken-2"
                    @click="setToday"
                >
                    Today
                </v-btn>
                <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="previousMonth"
                >
                    <v-icon small> mdi-chevron-left </v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="nextMonth">
                    <v-icon small> mdi-chevron-right </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                    {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
        </v-sheet>
        <v-sheet>
            <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                elevation="2"
                outlined
                :first-day-of-week="1"
                :events="events"
            >
            </v-calendar>
        </v-sheet>
    </v-col>
</template>

<script>
export default {
    name: "CalendarComponent",
    data() {
        return {
            focus: "",
        };
    },
    mounted() {
        this.focus = Date.now();
        this.$refs.calendar.checkChange();
    },
    computed: {
        getAllTasks() {
            return this.$store.getters.getTasksByLoggedUser;
        },
        events() {
            const eventData = this.getAllTasks.reduce((prev, curr) => {
                prev[curr.dueDate] = prev[curr.dueDate]
                    ? prev[curr.dueDate] + 1
                    : 1;
                return prev;
            }, {});

            return Object.keys(eventData).map((key) => ({
                name: eventData[key],
                start: key,
            }));
        },
    },
    methods: {
        setToday() {
            this.focus = Date.now();
        },
        previousMonth() {
            this.$refs.calendar.prev();
        },
        nextMonth() {
            this.$refs.calendar.next();
        },
    },
};
</script>
