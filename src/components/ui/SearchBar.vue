<script setup lang="ts">
import { ref } from "vue";
import SearchIcon from "../../assets/icons/SearchIcon.vue";

const props = defineProps<{
  label?: string;
  debounceDelay?: number;
}>();

const emit = defineEmits<{
  (e: "update:query", value: string): void;
}>();

const query = ref<string>("");
const floatLabel = ref<boolean>(false);

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const onInput = () => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(() => {
    emit("update:query", query.value);
  }, props.debounceDelay ?? 300);
};
</script>

<template>
  <div class="search__container">
    <div class="search__floating-label" @click="floatLabel = true">
      <span :class="{ 'focus-label': floatLabel }">{{ label }}</span>
      <SearchIcon v-if="!floatLabel" class="search__end-adornment" />
    </div>
    <input
      type="text"
      v-model="query"
      @input="onInput"
      @focus="floatLabel = true"
      @blur="floatLabel = query"
    />
  </div>
</template>

<style scoped lang="scss">
.search__container {
  width: 100%;
  position: relative;
}

.search__floating-label {
  width: 100%;
  position: absolute;
  padding: 7px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #63666e;

  & > * {
    display: block;
  }
}

input {
  font-size: 12px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #9a9da4;
  padding: 7px;
  transition: border-color 0.3s, outline-color 0.3s;
}

input:active,
input:focus {
  border: 1px solid #1952e1;
  outline: none;
  border-radius: 4px;
}

.focus-label {
  position: absolute;
  bottom: 6px;
  z-index: 1;
}

.focus-label::after {
  content: " ";
  position: absolute;
  bottom: 40%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #fff;
  z-index: -1;
}
</style>
