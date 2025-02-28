import { defineStore } from "pinia"
import { ref } from "vue"
import type { Shirt } from "@/types"

export const useActiveShirt = defineStore("activeShirt", () => {
  const activeShirt = ref<Shirt | null | undefined>(null)
  function setActiveShirt(arr: Shirt[], id: number) {
    activeShirt.value = arr.find((shirt) => shirt.id === id)
    console.log(activeShirt.value)
    console.log(arr)
  }
  return { activeShirt, setActiveShirt }
})
