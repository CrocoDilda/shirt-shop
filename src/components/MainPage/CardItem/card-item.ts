import { ref, computed } from "vue"
import { useElementBounding } from "@vueuse/core"

export function useCardItem(props: { manufacturer: string; images: string[] }) {
  const isHovered = ref(false)
  const cardRef = ref<HTMLElement | null>(null)
  const currentImageIndex = ref(0)

  const currentImage = computed(() => {
    return `/src/assets/images/${props.manufacturer}/${
      props.images[currentImageIndex.value]
    }`
  })

  const { width, left } = useElementBounding(cardRef)

  const handleMouseMove = (event: MouseEvent) => {
    isHovered.value = true
    if (!width.value) return
    const mouseX = event.clientX - left.value // Позиция курсора относительно карточки
    const zone = Math.floor((mouseX / width.value) * props.images.length)
    currentImageIndex.value = zone
  }

  let resetTimer: ReturnType<typeof setTimeout> | null = null

  const resetImage = () => {
    if (resetTimer) clearTimeout(resetTimer)

    resetTimer = setTimeout(() => {
      currentImageIndex.value = 0
      isHovered.value = false
      resetTimer = null
    }, 100)
  }

  return {
    isHovered,
    currentImage,
    handleMouseMove,
    resetImage,
    cardRef,
    currentImageIndex,
  }
}
