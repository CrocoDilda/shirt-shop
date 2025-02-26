<script setup lang="ts">
import HeaderItem from "./components/HeaderItem/HeaderItem.vue"
import SwiperlItem from "./components/SwiperlItem/SwiperlItem.vue"
import AssortimentIteml from "./components/AssortimentItem/AssortimentItem.vue"
import Toast from "primevue/toast"
import { useToast } from "primevue/usetoast"
import { setToastInstance } from "@/utils/toast"

const toast = useToast()
setToastInstance(toast)
</script>

<template>
  <Toast />
  <HeaderItem />
  <SwiperlItem />
  <AssortimentIteml />
</template>

<style scoped></style>
