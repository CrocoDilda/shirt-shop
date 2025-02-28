<script setup lang="ts">
import { onMounted } from "vue"
import IconField from "primevue/iconfield"
import InputIcon from "primevue/inputicon"
import InputText from "primevue/inputtext"
import DropDown from "./DropDown/DropDown.vue"

import {
  options,
  params,
  getAllParams,
  filters,
  clearFilters,
  filterData,
  searchResults,
  debounce,
  nothingFound,
  loading,
} from "./filters-item"

// Скрытие результатов при снятии фокуса
const hideResults = () => {
  searchResults.value = []
  filters.value.searchQuery = ""
}

onMounted(() => getAllParams())
</script>

<template>
  <div v-if="params" class="filter">
    <div class="search">
      <!-- Строка поиска -->
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText
          v-model="filters.searchQuery"
          placeholder="Поиск по названию"
          @input="debounce"
          @blur="hideResults"
        />
      </IconField>
      <DropDown
        v-if="filters.searchQuery.length > 0"
        :arr="searchResults"
        :loading="loading"
        :nothing-found="nothingFound"
        class="dropdown"
      />
    </div>

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
