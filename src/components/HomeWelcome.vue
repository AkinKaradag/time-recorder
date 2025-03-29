<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

defineProps<{ typingSpeed?: number }>();


const fullText = 'Herzlich willkommen! Diese Applikation wurde für die ATL im Modul WT A entwickelt.';
const displayedText = ref('');
const router = useRouter();

onMounted(() => {
  let index = 0;
  const interval = setInterval(() => {
    displayedText.value += fullText[index];
    index++;
    if (index >= fullText.length) {
      clearInterval(interval);
    }
  }, 40); // Schreibgeschwindigkeit in ms
});

function goToApp() {
  router.push('/employer');
}
</script>

<template>
  <div class="welcome-container">
    <h1 class="typing-text">{{ displayedText }}</h1>
    <button v-if="displayedText.length === fullText.length" @click="goToApp">
      Weiter zur App
    </button>
  </div>
</template>

<style scoped>
.welcome-container {
  max-width: 800px;
  margin: 100px auto;
  padding: 20px;
  text-align: center;
}

.typing-text {
  font-size: 1.5rem;
  font-family: monospace;
  white-space: pre-wrap;
  min-height: 4em;
}

button {
  margin-top: 30px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #388e3c;
}
</style>
