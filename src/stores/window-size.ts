import { defineStore } from "pinia"
import { useWindowSize } from "@vueuse/core"

export const useWindow = defineStore("useWindow", () => {
  const { width } = useWindowSize()

  return { width }
})
