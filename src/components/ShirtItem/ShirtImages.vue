<script setup lang="ts">
import { ref } from "vue"
import Image from "primevue/image"
import { getImagePath } from "@/utils/utils"

type Props = {
  images: string[]
  manufacturer: string
}

const props = defineProps<Props>()
const path = ref()
</script>

<template>
  <ul class="list">
    <li v-for="(item, index) in images" :key="index" class="images-item">
      <div class="image--wrapper">
        <Image
          :src="getImagePath(manufacturer, item)"
          alt="Image"
          preview
          class="list--image"
          width="100%"
        />
      </div>
    </li>
  </ul>
</template>

<style scoped>
.list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 30px;
}

.image--wrapper {
  display: grid;
  border-radius: 10px;
  overflow: hidden;
}

.list--image {
}
</style>
