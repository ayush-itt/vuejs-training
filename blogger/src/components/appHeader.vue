<template>
    <v-tabs bg-color="indigo-darken-2" fixed-tabs center-active>
        <router-link to="/" exact><v-tab>Blogs</v-tab></router-link>
        <router-link to="/add" exact><v-tab>Add Blog</v-tab></router-link>
    </v-tabs>
</template>

<script>
export default {};
</script>

<style scoped>
/* ul {
    list-style-type: none;
    text-align: center;
    margin: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}
nav {
    background: #444;
    padding: 14px 0;
    margin-bottom: 40px;
}
.router-link-active {
    background: #eee;
    color: #444;
} */
</style>
