<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Liste für die abgeschlossenen Wochenstunden
const weekSummaries = ref<{ name: string; week: string; hours: number }[]>([]);

onMounted(() => {
  weekSummaries.value = [];

  for (const key in localStorage) {
    // Nur abgeschlossene Wochen erfassen
    if (key.startsWith('tracker-') && key.endsWith('-weeks')) {
      try {
        const name = key.replace('tracker-', '').replace('-weeks', '');
        const raw = localStorage.getItem(key);
        const data: { week: string; totalHours: number }[] = JSON.parse(raw || '[]');
        data.forEach(entry => {
          weekSummaries.value.push({ name, week: entry.week, hours: entry.totalHours });
        });
      } catch (e) {
        console.warn(`Fehler beim Parsen von ${key}:`, e);
      }
    }
  }
});
</script>

<template>
  <div class="summary-view">
    <h2>Abgeschlossene Wochenübersicht</h2>
    <ul v-if="weekSummaries.length > 0">
      <li v-for="(entry, index) in weekSummaries" :key="index">
        🧑 {{ entry.name }} – 📅 {{ entry.week }}:
        <strong>{{ entry.hours.toFixed(2) }} h</strong>
      </li>
    </ul>
    <p v-else>Es wurden noch keine Wochen abgeschlossen.</p>
  </div>
</template>

<style scoped>
.summary-view {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 8px;
}
</style>
