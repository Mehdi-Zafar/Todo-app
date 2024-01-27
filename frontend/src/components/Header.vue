<script setup>
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Create Todo", href: "/create-todo" },
];
</script>

<template>
  <nav>
    <div class="nav-left">
      <h2>Todo App</h2>
    </div>
    <div class="nav-right">
      <router-link v-for="link in navLinks" :to="link.href">{{
        link.label
      }}</router-link>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #30415b;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 500;
}

a {
  text-decoration: none;
  color: #30415b;
  font-weight: 600;
}
</style>
