<script setup lang="ts">
import { useToast } from "primevue/usetoast"
import { setToastInstance } from "@/utils/toast"

const toast = useToast()
setToastInstance(toast)
</script>

<template>
  <router-view />
  <Toast />
</template>
