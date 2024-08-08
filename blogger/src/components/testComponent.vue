<template>
<div>
    <input type="text" v-model="firstName" placeholder="firstname">
    <input type="text" v-model="lastName" placeholder="lastname">
    <label >{{_fullName}}</label>
</div>
</template>
<script>
export default {
    name: "testComponent",
    data() {
        return {
            firstName: "",
            lastName: "",
            fullName: "",
        };
    },
    mounted() {
        console.log("mounted");
        
    },
    computed: {
        _fullName() {
            return `${this.firstName} ${this.lastName}`;
        }
    },
    watch: {
        firstName() {
            this.fullName = `${this.firstName} ${this.lastName}`;
        },
        lastName() {
            this.fullName = `${this.firstName} ${this.lastName}`;
        }
    }
};
</script>

<style>
