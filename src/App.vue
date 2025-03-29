<script setup lang="ts">
import {computed, ref} from 'vue'


const isDarkMode = ref(false); // Beispielzustand
const navClass = computed(() => ({
  'navbar-base': true,
  'navbar-dark': isDarkMode.value,
  'navbar-light': !isDarkMode.value,
}));
// Du könntest dies später auch über Theme-Optionen steuern
const themeClass = ref('theme-green')
</script>


<template>
  <header :class="['main-header', themeClass]">
    <h1>Employer</h1>
    <nav :class="navClass">
      <router-link to="/">Home</router-link>
      <router-link to="/employer">Employer</router-link>
      <router-link to="/time-recorder">Zeiterfassung</router-link>
      <router-link to="/weatherWidget">Wetter</router-link>
    </nav>
  </header>
  <router-view/>
</template>


<style scoped>
.main-header {
  background-color: #2e7d32; /* Standard grün */
  padding: 20px;
  border-radius: 16px;
  margin: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

nav {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 10px;
}

nav a {
  color: white;
  font-weight: 500;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}


h1 {
  text-align: center;
  color: white;
  margin-bottom: 10px;
}
</style>

