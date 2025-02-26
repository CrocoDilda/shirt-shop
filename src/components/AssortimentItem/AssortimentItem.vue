<script setup lang="ts">
import { onMounted, ref } from "vue"
import FiltersItem from "@/components/AssortimentItem/FiltersItem/FiltersItem.vue"
import CardItem from "../CardItem/CardItemInteractive.vue"
import { useCollection } from "@/stores/collection"
import Skeleton from "primevue/skeleton"

const collectionStore = useCollection()
const isLoading = ref(true)

onMounted(async () => {
  await collectionStore.getCollection()
  isLoading.value = false
})
</script>
<template>
  <section class="assortiment container">
    <h2 class="title">Наша коллекция</h2>
    <FiltersItem />
    <ul v-if="collectionStore.collection" class="assortiment--list">
      <CardItem
        v-for="item in collectionStore.collection"
        :key="item.id"
        :name="item.name"
        :images="item.images"
        :price="item.price"
        :manufacturer="item.manufacturer"
      />
    </ul>
    <ul
      v-if="
        !collectionStore.collection ||
        isLoading ||
        collectionStore.collection.length === 0
      "
      class="assortiment--list"
    >
      <li v-for="i in 6" class="skeleton">
        <Skeleton width="100%" height="450px"></Skeleton>
        <div class="skeleton--wrapper">
          <Skeleton width="100%" height="18px"></Skeleton>
          <Skeleton width="100%" height="18px"></Skeleton>
          <Skeleton class="skeleton-logo" width="100%" height="46px"></Skeleton>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
@import "./assortiment-item.css";
</style>
