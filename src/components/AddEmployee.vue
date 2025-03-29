<script setup lang="ts">
import { ref, onMounted } from 'vue';
import cardElement from './CardElement.vue';

const employees = ref<{ name: string; surname: string; weeklyHour: number }[]>([]);
const name = ref('');
const surname = ref('');
const weeklyHour = ref<number | null>(null);

const addEmployee = () => {
  if (name.value.trim() !== '' && surname.value.trim() !== '' && weeklyHour.value !== null) {
    employees.value.push({ name: name.value, surname: surname.value, weeklyHour: weeklyHour.value });
    localStorage.setItem('employees', JSON.stringify(employees.value));
    name.value = '';
    surname.value = '';
    weeklyHour.value = null;
  }
};

const clearEmployees = () => {
  employees.value = [];
  localStorage.removeItem('employees');
};

onMounted(() => {
  const stored = localStorage.getItem('employees');
  if (stored) {
    employees.value = JSON.parse(stored);
  }
});
</script>

<template>
  <main class="employee-container">
    <h1>Mitarbeiter erfassen</h1>

    <div class="form-container">
      <input class="text-input" type="text" placeholder="Vorname" v-model="name" />
      <input class="text-input" type="text" placeholder="Nachname" v-model="surname" />
      <input class="text-input" type="number" placeholder="Wochenstunden" v-model.number="weeklyHour" />

      <div class="button-group">
        <button class="btn green" @click="addEmployee">Hinzufügen</button>
        <button class="btn red" @click="clearEmployees">Alle löschen</button>
      </div>
    </div>

    <div class="card-container">
      <cardElement
          v-for="(employee, index) in employees"
          :key="index"
          :employeeName="`${employee.name} ${employee.surname}`"
          :weeklyHour="employee.weeklyHour"
      />
    </div>
  </main>
</template>

<style scoped>
.employee-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.text-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  background-color: #fefefe;
  box-shadow: inset 0 0 2px #ccc;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.btn.green {
  background-color: #2e7d32;
}

.btn.red {
  background-color: #c62828;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-top: 20px;
}
</style>
