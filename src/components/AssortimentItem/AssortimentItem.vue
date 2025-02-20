<script setup lang="ts">
import FiltersItem from "./FiltersItem/FiltersItem.vue"
import CardItem from "../CardItem/CardItemInteractive.vue"
import { data } from "@/utils/data"
</script>
<template>
  <section class="assortiment container">
    <h2 class="title">Наша коллекция</h2>
    <FiltersItem />
    <ul class="assortiment--list">
      <CardItem
        v-for="iterm in data"
        :key="data[0].id"
        :name="iterm.name"
        :images="iterm.images"
        :price="iterm.price"
        :manufacturer="iterm.manufacturer"
      />
    </ul>
  </section>
</template>

<style scoped>
@import "./assortiment-item.css";
</style>
