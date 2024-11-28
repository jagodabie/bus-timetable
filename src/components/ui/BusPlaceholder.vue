<script setup lang="ts">
import { defineProps } from "vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="placeholder__container">
    <p class="placeholder__title">{{ title }}</p>
  </div>
</template>

<style scoped>
.placeholder__container {
  height: 444px;
  display: flex;
  background: #fff;
  border: 2px dashed #9a9da4;
  border-radius: 4px;
  justify-content: center;
  align-items: center;

  & > .placeholder__title {
    font-size: 14px;
    line-height: 24px;
    color: #63666e;
    margin-top: 15px;
  }
}
</style>
