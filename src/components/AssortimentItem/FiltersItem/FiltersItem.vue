<script setup>
import { ref } from "vue"
import Select from "primevue/select"
import { optionsSearch, options } from "./filters-item"

const selectedCities = ref()
</script>

<template>
  <div class="filter">
    <MultiSelect
      v-model="selectedCities"
      :options="optionsSearch.color"
      optionLabel="name"
      filter
      placeholder="Цвет"
      :maxSelectedLabels="3"
      class="w-full md:w-80"
    />
    <MultiSelect
      v-model="selectedCities"
      :options="optionsSearch.manufacturer"
      optionLabel="name"
      filter
      placeholder="Производитель"
      :maxSelectedLabels="3"
      class="w-full md:w-80"
    />
    <MultiSelect
      v-model="selectedCities"
      :options="optionsSearch.material"
      optionLabel="name"
      filter
      placeholder="Материал"
      :maxSelectedLabels="3"
      class="w-full md:w-80"
    />
    <Select
      v-model="selectedCity"
      :options="options.gender"
      optionLabel="name"
      placeholder="Пол"
      class="w-full md:w-56"
    />
    <Select
      v-model="selectedCity"
      :options="options.price"
      optionLabel="name"
      placeholder="Цена"
      class="w-full md:w-56"
    />
  </div>
</template>

<style scoped>
@import "./filters-item.css";
</style>
