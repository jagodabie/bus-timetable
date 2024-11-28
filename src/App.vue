<script setup lang="ts">
import { useStore } from "vuex";
import { onMounted } from "vue";

import NavTabs from "./components/ui/NavTabs.vue";

const tabs = [
  { path: "/", label: "Bus Lines" },
  { path: "/stops", label: "Stops" },
];

const store = useStore();
onMounted(async () => {
  await store.dispatch("fetchBusStops/fetchData");
  await store.dispatch("fetchBusStops/generateStopsList");
});
</script>

<template>
  <header>
    <h4>Timetable</h4>
  </header>
  <NavTabs :tabs="tabs" />
  <main>
    <router-view />
  </main>
</template>

<style>
html,
body {
  height: 100%;
  margin: 0;
  background: #f8f8fb !important;
}

#app {
  padding: 45px 30px;
  width: 100%;
  box-sizing: border-box;
  font-size: 12px;

  display: flex;
  flex-direction: column;
  height: 100%;
}

main {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
