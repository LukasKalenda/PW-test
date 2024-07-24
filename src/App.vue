<script setup>
import { RouterLink, RouterView } from "vue-router";

import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <header><Navbar></Navbar></header>
  <main><RouterView></RouterView></main>
  <footer><Footer></Footer></footer>
</template>

<style scoped></style>
