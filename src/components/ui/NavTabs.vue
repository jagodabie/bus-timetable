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

<script lang="ts">
import { defineComponent } from "vue";

interface Tab {
  path: string; // Route path
  label: string; // Display name
}

export default defineComponent({
  name: "NavTabs",
  props: {
    tabs: {
      type: Array as () => Tab[], // Define the type of the tabs prop
      required: true,
    },
  },
});
</script>

<style scoped>
nav {
  background: #fff;
  display: flex;

  margin-top: 30px;
}

a {
  text-decoration: none;
  font-size: 20px;
  line-height: 24px;
  color: #6c757d;
  position: relative;
  padding: 30px;
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
