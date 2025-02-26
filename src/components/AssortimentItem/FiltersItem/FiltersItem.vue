<script setup lang="ts">
import { onMounted } from "vue"
import Select from "primevue/select"
import {
  options,
  params,
  getAllParams,
  filters,
  clearFilters,
  filterData,
} from "./filters-item"

onMounted(() => getAllParams())
</script>

<template>
  <div v-if="params" class="filter">
    <MultiSelect
      v-model="filters.color"
      :options="params.colors"
      optionLabel="name"
      filter
      placeholder="Цвет"
      :maxSelectedLabels="3"
      class="w-full md:w-80"
    />
    <MultiSelect
      v-model="filters.manufacturer"
      :options="params.manufacturers"
      optionLabel="name"
      filter
      placeholder="Производитель"
      :maxSelectedLabels="3"
      class="w-full md:w-80"
    />
    <MultiSelect
      v-model="filters.material"
      :options="params.materials"
      optionLabel="name"
      filter
      placeholder="Материал"
      :maxSelectedLabels="3"
      class="w-full md:w-80"
    />
    <Select
      v-model="filters.gender"
      :options="options.gender"
      optionLabel="name"
      placeholder="Пол"
      class="w-full md:w-56"
    />
    <Select
      v-model="filters.price"
      :options="options.price"
      optionLabel="name"
      placeholder="Цена"
      class="w-full md:w-56"
    />
    <Button class="button" label="Фильтровать" @click="filterData" />
    <Button class="clear" label="Сбросить" @click="clearFilters" />
  </div>
</template>

<style scoped>
@import "./filters-item.css";
</style>
