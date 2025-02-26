import { ref } from "vue"
import { SERVER_URL } from "@/utils/utils"
import { useCollection } from "@/stores/collection"
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
  color: OptionItem[]
  manufacturer: OptionItem[]
  material: OptionItem[]
  gender: OptionItem
  price: OptionItem
}>({
  color: [],
  manufacturer: [],
  material: [],
  gender: { name: "", code: "" },
  price: { name: "", code: "" },
})
const data = ref()
const params = ref()

async function clearFilters() {
  filters.value = {
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
}

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

async function filterData() {
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
    console.log(
      `${SERVER_URL}/shirts/filter?${color}${manufacturer}${material}${gender}${price}`
    )
    useCollection().collection = await response.json()
  } catch (error) {
    console.error(error)
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

export {
  options,
  params,
  data,
  getAllParams,
  filters,
  clearFilters,
  filterData,
}
