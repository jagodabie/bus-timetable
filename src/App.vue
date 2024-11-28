<script setup lang="ts">
import { useStore } from "vuex";
import NavTabs from "./components/ui/NavTabs.vue";
import { onMounted } from "vue";

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
    <h2>Timetable</h2>
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
}

#app {
  padding: 60px 50px;
  width: 100%;
  box-sizing: border-box;
  /* TODO: change color  #f8f9fa*/
  background: red;
  font-size: 12px;

  display: flex;
  flex-direction: column;
  height: 100%;
}

main {
  margin: 10px 0;
}
</style>
