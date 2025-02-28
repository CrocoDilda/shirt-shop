<script setup lang="ts">
import HeaderItem from "@/components/HeaderItem/HeaderItem.vue"
import ShirtImages from "@/components/ShirtItem/ShirtImages.vue"
import type { Shirt } from "@/types"
import { useActiveShirt } from "@/stores/activeShirt"

const data = {
  price: 1690,
  id: 5,
  sizes: { S: 9, XL: 7, XS: 1 },
  popularity: 0,
  created_at: "2025-02-21T10:57:29.311Z",
  updated_at: "2025-02-21T10:57:29.311Z",
  material: "cotton",
  gender: "female",
  model_sizes: "80-60-90",
  manufacturer: "colins",
  name: "Minimal Vector",
  article: "MP002XW0ZMHS",
  images: [
    "colins-MP002XW0ZMHS-1.webp",
    "colins-MP002XW0ZMHS-2.webp",
    "colins-MP002XW0ZMHS-3.webp",
    "colins-MP002XW0ZMHS-4.webp",
  ],
  color: ["white"],
  model_height: "177",
}
</script>

<template>
  <HeaderItem />

  <main class="main container">
    <router-link to="/" class="back"> < Главная</router-link>
    <section class="images">
      <ShirtImages
        class="images--list"
        :images="data.images"
        :manufacturer="data.manufacturer"
      />
    </section>
  </main>
  <router-view />
</template>

<style scoped>
.main {
  display: grid;
  gap: 30px;
}

.images--list {
  max-width: 70%;
}

.back {
  justify-self: start;
  background-color: red;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: var(--p-button-contrast-background);
  border: 1px solid var(--p-button-contrast-border-color);
  color: var(--p-button-primary-hover-color);
  &:hover {
    background-color: var(--p-button-contrast-hover-background);
    border: 1px solid var(--p-button-contrast-hover-border-color);
  }
}
</style>
