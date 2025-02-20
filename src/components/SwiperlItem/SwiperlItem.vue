<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination } from "swiper/modules"
import { data, getImagePath } from "./swiper-item"
import { useWindow } from "@/stores/window-size"
import "swiper/css"
import "swiper/css/pagination"
import { computed } from "vue"

const swiperValue = computed(() => {
  return useWindow().width > 700 ? 3 : useWindow().width > 500 ? 2 : 1
})

const modules = [Pagination, Autoplay]
</script>

<template>
  <section class="sec-swiper">
    <h2 class="swiper--title container">Популярные модели</h2>
    <swiper
      :slidesPerView="swiperValue"
      :spaceBetween="30"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :loop="true"
      class="mySwiper"
    >
      <swiper-slide class="swiper--slide" v-for="item in data" :key="item.id">
        <a href="#" class="swiper--link">
          <img
            class="swiper--image"
            :src="getImagePath(item.manufacturer, item.images[0])"
            alt=""
          />
          <div class="swiper--inner">
            <p>{{ item.name }}</p>
            <p>
              {{ Number(item.price).toLocaleString().replace(/,/g, " ") }} ₽
            </p>
          </div>
        </a>
      </swiper-slide>
    </swiper>
  </section>
</template>

<style scoped>
@import url(./swiper-item.css);
</style>
