<script setup lang="ts">
import { getImagePath } from "@/utils/utils"
import { useDebounceFn } from "@vueuse/core"
import { useCardItem } from "./card-item"

type Props = {
  name: string
  images: string[]
  price: number
  manufacturer: string
  id: number
}

const props = defineProps<Props>()

const {
  isHovered,
  currentImage,
  handleMouseMove,
  resetImage,
  cardRef,
  currentImageIndex,
} = useCardItem(props)

const debouncedMouseMove = useDebounceFn(handleMouseMove, 50)
</script>

<template>
  <router-link
    :to="`/shirt/${id}`"
    class="card--link"
    ref="cardRef"
    @mousemove="debouncedMouseMove"
    @mouseleave="resetImage"
  >
    <Transition name="fade" mode="out-in">
      <ul v-if="isHovered" class="card--bar">
        <li
          v-for="(item, index) in images"
          :key="index"
          :class="
            'card--item' + (index === currentImageIndex ? ' item-active' : '')
          "
        ></li>
      </ul>
    </Transition>

    <Transition name="fade" mode="out-in">
      <img
        :key="currentImage"
        :src="currentImage"
        alt="Product Image"
        class="card--image"
      />
    </Transition>

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
