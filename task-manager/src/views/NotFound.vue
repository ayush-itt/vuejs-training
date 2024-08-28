<template>
    <v-container class="text-center">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for doesn't exist.</p>
        <v-btn color="primary" @click="$router.push('/')">Go to Home</v-btn>
    </v-container>
</template>

<script>
export default {
    name: "NotFound",
};
</script>
