<script setup lang="ts">
import { ref, onMounted } from 'vue';

const city = ref('Zürich');
const weatherData = ref<any>(null);
const loading = ref(false);
const errorMsg = ref('');

const cities = ['Zürich', 'Bern', 'Genf', 'Basel', 'Lugano'];

const fetchWeather = async () => {
  try {
    loading.value = true;
    errorMsg.value = '';

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city.value}&lang=de`
    );

    if (!response.ok) {
      throw new Error('Fehler beim Abruf der Wetterdaten');
    }

    const data = await response.json();
    weatherData.value = data;
  } catch (err: any) {
    errorMsg.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchWeather);
</script>

<template>
  <div :class="['weather-widget', { centered: true }]">
    <h2>🌤️ Wetter</h2>

    <!-- Dropdown zur Stadtauswahl -->
    <label for="city">Stadt:</label>
    <select v-model="city" @change="fetchWeather">
      <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
    </select>

    <div v-if="loading">⏳ Lade Wetterdaten...</div>
    <div v-else-if="errorMsg">{{ errorMsg }}</div>
    <div v-else-if="weatherData">
      <p>🌡 Temperatur: {{ weatherData.current.temp_c }}°C</p>
      <p>📋 Zustand: {{ weatherData.current.condition.text }}</p>
      <p>💧 Luftfeuchtigkeit: {{ weatherData.current.humidity }}%</p>
      <button @click="fetchWeather">🔄 Aktualisieren</button>
    </div>
  </div>
</template>

<style scoped>
.weather-widget {
  padding: 20px;
  border-radius: 12px;
  background-color: #e0f7fa;
  border: 1px solid #90caf9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  transition: all 0.3s ease;
}

.centered {
  margin: 0 auto;
  text-align: center;
}

.weather-widget select {
  margin-bottom: 12px;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #90caf9;
}

.weather-widget button {
  background-color: #0277bd;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 8px;
}

.weather-widget button:hover {
  background-color: #01579b;
}
</style>
