<script setup lang="ts">
import { ref } from "vue"
import HeaderItem from "@/components/HeaderItem/HeaderItem.vue"
import ShirtImages from "@/components/ShirtItem/ShirtImages.vue"
import { useRoute } from "vue-router"
import type { Shirt } from "@/types"
import { getImagePath } from "@/utils/utils"

const route = useRoute()
const shirtId = route.params.id

console.log(shirtId)

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
  <HeaderItem class="header" />
  <main class="main container">
    <section class="content">
      <div class="head">
        <router-link to="/" class="head--back"> < Главная</router-link>
        <p class="head--text">
          {{ data.gender === "male" ? "Мужская" : "Женская" }} рубашка
        </p>
      </div>
      <ShirtImages
        class="content--list"
        :images="data.images"
        :manufacturer="data.manufacturer"
      />
    </section>
    <section class="aside">
      <h2 class="aside--title">{{ data.name }}</h2>
      <img
        :src="getImagePath(data.manufacturer, `${data.manufacturer}_logo.png`)"
        alt=""
        class="aside--image"
      />
      <p class="aside--price">
        {{ data.price.toLocaleString().replace(/,/g, " ") }} ₽
      </p>
      <ul class="aside--sizes-list">
        <li
          v-for="[size, quantity] in Object.entries(data.sizes)"
          :key="size"
          class="aside--size"
        >
          {{ size }} - {{ quantity }} шт.
        </li>
      </ul>
    </section>
  </main>
  <router-view />
</template>

<style scoped>
@import url("./shirt-view.css");
</style>
