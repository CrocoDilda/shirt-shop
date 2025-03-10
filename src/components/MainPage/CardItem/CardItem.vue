<script setup lang="ts">
import { getImagePath } from "@/utils/utils"

type Props = {
  name: string
  images: string[]
  price: number
  manufacturer: string
  id: number
}
const props = defineProps<Props>()
</script>

<template>
  <router-link :to="`/shirt/${id}`" class="card--link static">
    <img
      :src="getImagePath(manufacturer, images[0])"
      alt="Product Image"
      class="card--image"
    />

    <div class="card--inner">
      <p>{{ name }}</p>
      <p>{{ price.toLocaleString().replace(/,/g, " ") }} ₽</p>
      <div class="card--logo-inner">
        <img
          class="card--logo"
          :src="getImagePath(manufacturer, `${manufacturer}_logo.png`)"
          alt=""
        />
      </div>
    </div>
  </router-link>
</template>
<style scoped>
@import url("./card-item.css");
</style>
