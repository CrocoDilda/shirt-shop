<script setup lang="ts">
import type { Shirt } from "@/types"
import Skeleton from "primevue/skeleton"

type Props = {
  arr: Shirt[]
  loading: boolean
  nothingFound: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: true,
})
</script>

<template>
  <div id="dropdown-wrapper">
    <ul v-if="!loading" class="dropdown">
      <li v-for="item in arr" class="item">
        <a class="link" href="#">
          {{ item.name }}
        </a>
      </li>
    </ul>
    <ul v-if="loading" class="dropdown">
      <Skeleton width="100%" height="31px"></Skeleton>
      <Skeleton width="100%" height="31px"></Skeleton>
      <Skeleton width="100%" height="31px"></Skeleton>
    </ul>
    <ul v-if="nothingFound && !loading" class="dropdown">
      <li class="text">По вашему запросу ничего не найдено</li>
    </ul>
  </div>
</template>

<style scoped>
#dropdown-wrapper {
  background-color: var(--p-inputtext-background);
  border: 1px solid var(--p-inputtext-border-color);
  overflow-y: hidden;
  max-height: 220px;
}

.dropdown {
  padding: 5px;
  display: grid;
  gap: 5px;
  overflow-y: auto !important;
  width: 100%;
  border-radius: 6px;
  max-height: 200px;
  height: auto;
}

.dropdown::-webkit-scrollbar {
  width: 8px;
}

.dropdown::-webkit-scrollbar-track {
  background-color: transparent;
  padding: 5px;
}

.dropdown::-webkit-scrollbar-thumb {
  background-color: var(--p-inputtext-border-color);
  border-radius: 4px;
}

.dropdown::-webkit-scrollbar-button {
  display: none;
}

.link {
  display: block;
  width: 100%;
  font-size: 16px;
  width: 100%;
  padding: 5px 10px;
  border-radius: 6px;
  color: var(--p-inputtext-color);
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--p-inputtext-border-color);
  }
}

.text {
  font-size: 16px;
}
</style>
