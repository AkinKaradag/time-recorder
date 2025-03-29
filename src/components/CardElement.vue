<script setup lang="ts">
import WeeklyTimeInput from './WeeklyTimeInput.vue';

defineProps<{
  employeeName: string;
  weeklyHour: number;
}>();
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h2>{{ employeeName }}</h2>
      <p class="subtitle">Wöchentliche Sollstunden: {{ weeklyHour }} h</p>
      <div class="card-divider"></div>
    </div>

    <div class="card-body">
      <slot></slot>
      <WeeklyTimeInput :employeeName="employeeName" />
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #fdfdfd;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  transition: box-shadow 0.3s ease-in-out;
}

.card:hover {
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}

.card-header {
  text-align: center;
  margin-bottom: 10px;
}

.card-header h2 {
  font-size: 20px;
  margin: 0;
  color: #333;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.card-divider {
  width: 90%;
  height: 2px;
  background-color: #ddd;
  margin: 10px auto 0;
}

.card-body {
  text-align: center;
}
</style>
