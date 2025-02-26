<script setup lang="ts">
import { onMounted } from "vue"
import FiltersItem from "@/components/AssortimentItem/FiltersItem/FiltersItem.vue"
import CardItem from "../CardItem/CardItemInteractive.vue"
import { useCollection } from "@/stores/collection"

const collectionStore = useCollection()

onMounted(() => {
  collectionStore.getCollection()
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
  </section>
</template>

<style scoped>
@import "./assortiment-item.css";
</style>
