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
        login() {
            const user = this.$store.getters.getUserByUsername(this.username);

            if (user && user.password === this.password) {
                this.$store.dispatch("setProfile", user);
                this.$router.push("/dashboard"); // Redirect to dashboard after login
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
</style>
