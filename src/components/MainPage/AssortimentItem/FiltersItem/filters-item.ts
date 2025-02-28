import { ref } from "vue"
import { SERVER_URL } from "@/utils/utils"
import { useCollection } from "@/stores/collection"
import { showToast } from "@/utils/toast"
import { useDebounceFn } from "@vueuse/core"
import type { Shirt } from "@/types"

type OptionItem = { name: string; code: string }

const optionsSearch = ref({
  color: [
    { name: "Чёрный", code: "black" },
    { name: "Белый", code: "white" },
    { name: "Серый", code: "gray" },
    { name: "Синий", code: "blue" },
    { name: "Голубой", code: "light_blue" },
    { name: "Красный", code: "red" },
    { name: "Бордовый", code: "burgundy" },
    { name: "Зелёный", code: "green" },
    { name: "Оливковый", code: "olive" },
    { name: "Жёлтый", code: "yellow" },
    { name: "Оранжевый", code: "orange" },
    { name: "Коричневый", code: "brown" },
    { name: "Фиолетовый", code: "purple" },
    { name: "Розовый", code: "pink" },
    { name: "Бежевый", code: "beige" },
  ],
  manufacturer: [
    { name: "Baon", code: "baon" },
    { name: "Colin's", code: "colins" },
    { name: "Eterna", code: "eterna" },
    { name: "Bawer", code: "bawer" },
  ],
  material: [
    { name: "Хлопок", code: "cotton" },
    { name: "Лён", code: "flax" },
    { name: "Шёлк", code: "silk" },
    { name: "Полиэстер", code: "polyester" },
    { name: "Вискоза", code: "viscose" },
    { name: "Фланель", code: "flannel" },
    { name: "Деним", code: "denim" },
    { name: "Шерсть", code: "wool" },
    { name: "Сатин", code: "satin" },
    { name: "Оксфорд", code: "oxford" },
    { name: "Твид", code: "tweed" },
    { name: "Поплин", code: "poplin" },
    { name: "Жаккард", code: "jacquard" },
    { name: "Кашемир", code: "cashmere" },
  ],
})

const options = ref({
  gender: [
    { name: "Мужский", code: "male" },
    { name: "Женский", code: "female" },
  ],
  price: [
    { name: "От дешёвых к дорогим", code: "asc" },
    { name: "От дорогих к дешёвым", code: "desc" },
  ],
})

const filters = ref<{
  searchQuery: string
  color: OptionItem[]
  manufacturer: OptionItem[]
  material: OptionItem[]
  gender: OptionItem
  price: OptionItem
}>({
  searchQuery: "",
  color: [],
  manufacturer: [],
  material: [],
  gender: { name: "", code: "" },
  price: { name: "", code: "" },
})
const data = ref()
const params = ref()
const searchResults = ref<any[]>([]) // Результаты поиска
const nothingFound = ref(false)
const loading = ref(false)
const multiSelectArr = [
  {
    select: "color",
    name: "Цвет",
  },
  {
    select: "manufacturers",
    name: "Производитель",
  },
  {
    select: "materials",
    name: "Материал",
  },
]

async function getAllParams() {
  try {
    const response = await fetch(`${SERVER_URL}/shirts/filter-options`)
    data.value = await response.json()
    params.value = mapAllCategories(
      data.value.colors,
      data.value.manufacturers,
      data.value.materials,
      optionsSearch.value
    )
  } catch (error) {
    console.error(error)
  }
}

function mapValuesToObjects(
  values: string[],
  category: OptionItem[]
): OptionItem[] {
  return values
    .map((value) => category.find((item) => item.code === value))
    .filter((item): item is OptionItem => item !== undefined) // Убираем undefined
}

function mapAllCategories(
  colors: string[],
  manufacturers: string[],
  materials: string[],
  optionsSearch: {
    color: OptionItem[]
    manufacturer: OptionItem[]
    material: OptionItem[]
  }
) {
  return {
    colors: mapValuesToObjects(colors, optionsSearch.color),
    manufacturers: mapValuesToObjects(
      manufacturers,
      optionsSearch.manufacturer
    ),
    materials: mapValuesToObjects(materials, optionsSearch.material),
  }
}

async function clearFilters() {
  if (checkFilters()) {
    filters.value = {
      searchQuery: "",
      color: [],
      manufacturer: [],
      material: [],
      gender: { name: "", code: "" },
      price: { name: "", code: "" },
    }
    try {
      const response = await fetch(`${SERVER_URL}/shirts/all`)
      useCollection().collection = await response.json()
    } catch (error) {
      console.error(error)
    }
  } else {
    showToast("warn", "Внимание", "Фильтры не применены")
  }
}

async function filterData() {
  if (checkFilters()) {
    try {
      useCollection().collection = []
      const color = filters.value.color.length
        ? `colors=${extractFilters(filters.value.color)}&`
        : ""
      const manufacturer = filters.value.manufacturer.length
        ? `manufacturer=${extractFilters(filters.value.manufacturer)}&`
        : ""
      const material = filters.value.material.length
        ? `materials=${extractFilters(filters.value.material)}&`
        : ""
      const gender = filters.value.gender.code
        ? `gender=${filters.value.gender.code}&`
        : ""
      const price =
        "sortOrder=" +
        (filters.value.price.code ? `${filters.value.price.code}` : "random")

      const response = await fetch(
        `${SERVER_URL}/shirts/filter?${color}${manufacturer}${material}${gender}${price}`
      )
      useCollection().collection = await response.json()
    } catch (error) {
      console.error(error)
    }
  } else {
    showToast("warn", "Внимание", "Фильтры не применены")
  }
}

function extractFilters(arr: Record<string, string>[]): string {
  if (arr.length == 0) return ""
  let result = ""
  arr.forEach((element) => {
    result += `${element.code},`
  })
  return result.slice(0, -1)
}

function checkFilters() {
  return (
    filters.value.searchQuery.length ||
    filters.value.color.length ||
    filters.value.manufacturer.length ||
    filters.value.material.length ||
    filters.value.gender.code ||
    filters.value.price.code
  )
}

// Функция для выполнения поиска
const handleSearch = async () => {
  loading.value = true
  if (!filters.value.searchQuery) {
    searchResults.value = []
    return
  }

  try {
    const response = await fetch(
      `http://localhost:3000/shirts/name/${filters.value.searchQuery}`
    )
    searchResults.value = await response.json()
    searchResults.value.length === 0
      ? (nothingFound.value = true)
      : (nothingFound.value = false)
  } catch (error) {
    console.error("Ошибка при поиске:", error)
    searchResults.value = []
  }
  loading.value = false
}

// Debounce для уменьшения запросов
const debounce = useDebounceFn(handleSearch, 250)

export {
  options,
  params,
  data,
  getAllParams,
  filters,
  clearFilters,
  filterData,
  multiSelectArr,
  searchResults,
  debounce,
  nothingFound,
  loading,
}
