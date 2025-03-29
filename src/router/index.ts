import { createRouter, createWebHistory } from 'vue-router';
import AddEmployee from '../components/AddEmployee.vue';
import CalculateHour from '../components/CalculateHour.vue';
import WeeklyTimeInput from "@/components/WeeklyTimeInput.vue";
import WeatherWidget from "@/components/WeatherWidget.vue";
import HomeWelcome from "@/components/HomeWelcome.vue";


const routes = [
  { path: '/', component: HomeWelcome },
  { path: '/time-recorder', name: 'CalculateHour', component: CalculateHour, props: true },
  { path: '/employer', name: 'Employer', component: AddEmployee },
  { path: '/weeklyTimeInput', name: 'WeeklyTime', component: WeeklyTimeInput},
  { path: '/weatherWidget', name: 'WeatherWidget', component: WeatherWidget}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
