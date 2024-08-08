<template>
    <v-card>
        <v-card-text>
            <v-text-field
                v-model="usdValue"
                label="USD"
                type="number"
            ></v-text-field>
            <v-text-field
                v-model="inrValue"
                label="INR"
                type="number"
                readonly
            ></v-text-field>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "CurrencyConverter",
    props: {
        value: {
            type: Number,
            default: 0,
        },
        exchangeRate: {
            type: Number,
            default: 80, // default
        },
    },
    computed: {
        usdValue: {
            get() {
                return this.value || 0;
            },
            set(newValue) {
                this.$emit("input", parseFloat(newValue ?? 0));
            },
        },
        inrValue() {
            return (this.usdValue * this.exchangeRate).toFixed(2);
        },
    },
};
</script>
