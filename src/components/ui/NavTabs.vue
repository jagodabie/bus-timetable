<script setup lang="ts">
import { Tab } from "@/types/BusStop";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  tabs: Tab[];
}>();
</script>
<template>
  <nav>
    <router-link
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
      active-class="active-tab"
    >
      {{ tab.label }}
    </router-link>
  </nav>
</template>
<style scoped>
nav {
  background: #fff;
  display: flex;
  margin-top: 20px;
  padding-left: 16px;
}

a {
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  color: #6c757d;
  position: relative;
  padding: 22px 28px;
}

a.active-tab {
  color: #000000;
  font-weight: bold;
}

a.active-tab::after {
  content: "";
  display: block;
  width: 100%;
  height: 3px;
  background-color: #007bff;
  position: absolute;
  bottom: -2px;
  left: 0;
}

a:hover {
  color: #007bff;
}
</style>
