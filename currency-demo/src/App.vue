<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <h1>USD to INR</h1>
            </div>
        </v-app-bar>

        <v-main>
            <CurrencyConverter v-model="amountInUSD"></CurrencyConverter>
            <!-- <CurrencyConverter
                :value="amountInUSD"
                @input="amountInUSD = $event"
            ></CurrencyConverter> -->
        </v-main>
    </v-app>
</template>

<script>
import CurrencyConverter from "./components/CurrencyConverter.vue";

export default {
    name: "App",

    components: {
        CurrencyConverter,
    },

    data: () => ({
        amountInUSD: 10,
    }),
};
</script>
