import { defineStore } from "pinia"
import { ref } from "vue"
import { SERVER_URL } from "@/utils/utils"
import type { Shirt } from "@/types"

export const useCollection = defineStore("collection", () => {
  const collection = ref<Shirt[]>([])
  async function getCollection() {
    try {
      const response = await fetch(`${SERVER_URL}/shirts/all`)
      collection.value = await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  return { collection, getCollection }
})
