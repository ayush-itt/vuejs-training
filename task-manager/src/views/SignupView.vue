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
        <ToastComponent
            v-model="snackbarProp.show"
            :text="snackbarProp.msgText"
            :timeout="snackbarProp.timeout"
            :color="snackbarProp.color"
        ></ToastComponent>
    </v-container>
</template>

<script>
import ToastComponent from "../components/ToastComponent";

export default {
    components: {
        ToastComponent,
    },
    data() {
        return {
            username: "",
            email: "",
            password: "",
            profileURL: "",
            isAdmin: false,
            snackbarProp: {
                show: false,
                timeout: 2000,
                msgText: "",
                color: "",
            },
        };
    },
    methods: {
        async signup() {
            if (this.username && this.email && this.password) {
                const newUser = {
                    id: Date.now().toString(),
                    username: this.username.toLowerCase(),
                    email: this.email.toLowerCase(),
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
                    this.snackbarProp.show = true;
                    this.snackbarProp.color = "success";
                    this.snackbarProp.msgText = "User created successful!!";

                    setTimeout(
                        () => this.$router.push("/login"),
                        this.snackbarProp.timeout
                    );
                } else {
                    this.snackbarProp.show = true;
                    this.snackbarProp.color = "error";
                    this.snackbarProp.msgText =
                        "Username or Email already exists!!";
                }
            } else {
                this.snackbarProp.show = true;
                this.snackbarProp.color = "error";
                this.snackbarProp.msgText =
                    "Please fill in all required fields!!";
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
