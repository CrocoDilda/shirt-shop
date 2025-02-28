<script setup lang="ts">
import HeaderItem from "@/components/HeaderItem/HeaderItem.vue"
import SwiperlItem from "@/components/MainPage/SwiperlItem/SwiperlItem.vue"
import AssortimentIteml from "@/components/MainPage/AssortimentItem/AssortimentItem.vue"

import { useActiveShirt } from "@/stores/activeShirt"
import { useCollection } from "@/stores/collection"

setTimeout(() => {
  useActiveShirt().setActiveShirt(useCollection().collection, 5)
}, 500)
</script>

<template>
  <HeaderItem />

  {{ useActiveShirt().activeShirt }}
  <SwiperlItem />
  <AssortimentIteml />
</template>
