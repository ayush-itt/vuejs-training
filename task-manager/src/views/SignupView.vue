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
                    v-model="email"
                    label="Email"
                    type="email"
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
                <v-checkbox
                    v-model="isAdmin"
                    label="Register as Admin"
                    dense
                ></v-checkbox>
                Already have an account?
                <router-link to="/login" color="primary">
                    Login here.
                </router-link>
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
            email: "",
            password: "",
            profileURL: "",
            isAdmin: false,
        };
    },
    methods: {
        async signup() {
            if (this.username && this.email && this.password) {
                const newUser = {
                    id: Date.now().toString(),
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    image:
                        this.profileURL ||
                        `https://randomuser.me/api/portraits/men/${Math.ceil(
                            Math.random() * 100
                        )}.jpg`,
                    isAdmin: this.isAdmin,
                };

                const success = await this.$store.dispatch("addUser", newUser);
                if (success) {
                    this.$router.push("/login");
                } else {
                    alert("username or email already exists!!");
                }
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
