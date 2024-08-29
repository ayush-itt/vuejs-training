<template>
    <v-container
        fluid
        class="d-flex align-center justify-center login-container"
    >
        <v-card class="elevation-12 login-card">
            <v-card-title class="headline">Login</v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="username"
                    label="Username"
                    outlined
                    dense
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    outlined
                    dense
                    required
                ></v-text-field>

                Don't have an account?
                <router-link to="/signup" color="primary"
                    >Sign up here.</router-link
                >
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        async login() {
            const success = await this.$store.dispatch("login", {
                username: this.username.toLowerCase(),
                password: this.password,
            });

            if (success) {
                this.$router.push("/dashboard");
            } else {
                alert("Invalid username or password.");
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    background: #f5f5f5;
}

.login-card {
    max-width: 400px;
    border-radius: 12px;
    background: white;
    padding: 20px;
}

.v-card-title {
    justify-content: center;
}

.v-btn {
    width: 100%;
    border-radius: 8px;
}

.v-card-actions {
    justify-content: center;
}

.v-btn.text {
    width: 100%;
    margin-top: 10px;
    text-transform: none;
    justify-content: center;
}
</style>
