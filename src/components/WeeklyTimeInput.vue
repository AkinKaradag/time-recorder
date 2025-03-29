<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

// Prop für den Namen des Mitarbeitenden
const props = defineProps<{
  employeeName: string;
}>();

// LocalStorage Schlüssel dynamisch pro Mitarbeitendenname
const localStorageKey = `tracker-${props.employeeName}`;
const weeksKey = `${localStorageKey}-weeks`;

// Dropdown-Auswahl für Wochentage
const dayOptions = [
  'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag',
  'Freitag', 'Samstag', 'Sonntag'
];

// Alle Einträge der Woche werden in einem Objekt gespeichert
const days = ref<Record<string, { start: string; end: string }>>({});
const selectedDay = ref('Montag');

// Start- und Endzeit für den ausgewählten Tag
const startTime = ref('');
const endTime = ref('');

// Wöchentliche Zusammenfassung
const completedWeeks = ref<{ week: string; totalHours: number }[]>([]);

// Hilfsfunktion zur Umwandlung von Uhrzeit in Minuten
function parseTime(time: string): number {
  if (!time) return 0;
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

// Berechnet Stunden für den aktuellen Tag
const currentDayHours = computed(() => {
  const start = parseTime(startTime.value);
  const end = parseTime(endTime.value);
  return end > start ? (end - start) / 60 : 0;
});

// Berechnet die Totalstunden der Woche
const totalWeekHours = computed(() => {
  return Object.values(days.value).reduce((sum, entry) => {
    const s = parseTime(entry.start);
    const e = parseTime(entry.end);
    const diff = e - s;
    return sum + (diff > 0 ? diff / 60 : 0);
  }, 0);
});

// Speichert den gewählten Tag
function saveDay() {
  if (!startTime.value || !endTime.value || parseTime(endTime.value) <= parseTime(startTime.value)) {
    alert('Bitte gültige Zeiten eingeben.');
    return;
  }

  days.value[selectedDay.value] = {
    start: startTime.value,
    end: endTime.value,
  };

  startTime.value = '';
  endTime.value = '';
}

// Abschliessen der Woche
function saveWeek() {
  completedWeeks.value.push({
    week: new Date().toLocaleDateString('de-CH'),
    totalHours: totalWeekHours.value,
  });

  localStorage.setItem(weeksKey, JSON.stringify(completedWeeks.value));
  days.value = {};
  localStorage.setItem(localStorageKey, JSON.stringify(days.value));
}

// Wochentag-Auswahl lädt bestehende Zeiten (oder Defaults)
watch(selectedDay, (day) => {
  const entry = days.value[day];
  startTime.value = entry?.start || '08:00';
  endTime.value = entry?.end || '17:00';
});

// Lädt bestehende Daten beim Start
onMounted(() => {
  const stored = localStorage.getItem(localStorageKey);
  if (stored) days.value = JSON.parse(stored);

  const storedWeeks = localStorage.getItem(weeksKey);
  if (storedWeeks) completedWeeks.value = JSON.parse(storedWeeks);

  const entry = days.value[selectedDay.value];
  startTime.value = entry?.start || '08:00';
  endTime.value = entry?.end || '17:00';
});

// Speichert jede Änderung automatisch
watch(days, (val) => {
  localStorage.setItem(localStorageKey, JSON.stringify(val));
}, { deep: true });
</script>

<template>
  <div class="weekly-time-input">
    <h3>Woche erfassen für {{ props.employeeName }}</h3>

    <!-- Wochentag auswählen -->
    <label>Wochentag:
      <select v-model="selectedDay">
        <option v-for="day in dayOptions" :key="day" :value="day">{{ day }}</option>
      </select>
    </label>

    <!-- Eingabe Start/Endzeit -->
    <div class="time-input">
      <label>Startzeit:
        <input type="time" v-model="startTime" step="60" />
      </label>
      <label>Endzeit:
        <input type="time" v-model="endTime" step="60" />
      </label>
      <p>Total: {{ currentDayHours.toFixed(2) }} Stunden</p>
      <button @click="saveDay">Erfassen</button>
    </div>

    <!-- Übersicht aller erfassten Tage -->
    <div v-if="Object.keys(days).length > 0" class="week-summary">
      <h4>Erfasste Tage</h4>
      <ul>
        <li v-for="(entry, day) in days" :key="day">
          {{ day }}: {{ entry.start }} – {{ entry.end }} ({{ ((parseTime(entry.end) - parseTime(entry.start)) / 60).toFixed(2) }} h)
        </li>
      </ul>

      <p><strong>Gesamte Woche: {{ totalWeekHours.toFixed(2) }} Stunden</strong></p>
      <button @click="saveWeek">Woche abschliessen</button>
    </div>

    <!-- Historie der abgeschlossenen Wochen -->
    <div class="completed-list" v-if="completedWeeks.length > 0">
      <h4>Abgeschlossene Wochen</h4>
      <ul>
        <li v-for="(week, index) in completedWeeks" :key="index">
          {{ week.week }} – {{ week.totalHours.toFixed(2) }} h
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.weekly-time-input {
  margin-top: 16px;
  padding: 12px;
  background-color: #f4f4f4;
  border-radius: 8px;
}
label {
  display: block;
  margin: 6px 0;
}
.time-input {
  margin-top: 10px;
}
.week-summary {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #ccc;
}
.completed-list {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed #aaa;
}
button {
  margin-top: 8px;
  background-color: #2e7d32;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #388e3c;
}
input[type="time"] {
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 4px 6px;
  background-color: #ffffff;
  width: 140px;
  font-size: 14px;
  color: #333;
}
input[type="time"]:focus {
  border-color: #2e7d32;
  outline: none;
  box-shadow: 0 0 2px #2e7d32;
}
</style>
