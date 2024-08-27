<template>
    <v-container
        fluid
        class="d-flex align-center justify-center signup-container"
    >
        <v-card class="elevation-12 signup-card">
            <v-card-title class="headline">Sign Up</v-card-title>
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
                <v-text-field
                    v-model="profileURL"
                    label="Profile URL (optional)"
                    outlined
                    dense
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="signup">Sign Up</v-btn>
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
            profileURL: "",
        };
    },
    methods: {
        signup() {
            if (this.username && this.password) {
                const newUser = {
                    id: Date.now(),
                    username: this.username,
                    password: this.password,
                    img:
                        this.profileURL ||
                        `https://randomuser.me/api/portraits/men/${Math.ceil(
                            Math.random() * 100
                        )}.jpg`,
                };

                // Add user to Vuex store
                this.$store.dispatch("addUser", newUser);

                // Redirect to login page
                this.$router.push("/login");
            } else {
                alert("Please fill in all required fields.");
            }
        },
    },
};
</script>

<style scoped>
.signup-container {
    min-height: 100vh;
    background: #f5f5f5;
}

.signup-card {
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
