<script setup lang="ts">
import { getImagePath } from "@/utils/utils"

type Props = {
  name: string
  images: string[]
  price: number
  manufacturer: string
}
const props = defineProps<Props>()
</script>

<template>
  <a href="#" class="swiper--link static">
    <img
      :src="getImagePath(manufacturer, images[0])"
      alt="Product Image"
      class="swiper--image"
    />

    <div class="swiper--inner">
      <p>{{ name }}</p>
      <p>{{ price.toLocaleString().replace(/,/g, " ") }} ₽</p>
      <div class="swiper--logo-inner">
        <div class="swiper--image-inner">
          <img
            class="swiper--logo"
            :src="getImagePath(manufacturer, `${manufacturer}_logo.png`)"
            alt=""
          />
        </div>
      </div>
    </div>
  </a>
</template>
<style scoped>
@import url("./card-item.css");
</style>
