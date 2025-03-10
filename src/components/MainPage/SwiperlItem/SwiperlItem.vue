<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination } from "swiper/modules"
import { data } from "./swiper-item"
import { computed } from "vue"
import { useWindow } from "@/stores/window-size"
import CardItem from "../CardItem/CardItem.vue"
import "swiper/css"
import "swiper/css/pagination"

const swiperValue = computed(() => {
  return useWindow().width > 950 ? 3 : useWindow().width > 680 ? 2 : 1
})

const modules = [Pagination, Autoplay]
</script>

<template>
  <section class="sec-swiper">
    <h2 class="title swiper--title container">Популярные модели</h2>
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
        <CardItem
          :name="item.name"
          :images="item.images"
          :price="item.price"
          :manufacturer="item.manufacturer"
          :interactive="false"
          :id="item.id"
          class="swiper--card"
        />
      </swiper-slide>
    </swiper>
  </section>
</template>

<style scoped>
@import url(./swiper-item.css);
</style>
