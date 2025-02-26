import { ref } from "vue"
import { SERVER_URL } from "@/utils/utils"
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
    { name: "От дешёвых к дорогим", code: "free" },
    { name: "От дорогих к дешёвым", code: "expensive" },
  ],
})

const data = ref()
const params = ref()

async function getAllParams() {
  try {
    const response = await fetch(`${SERVER_URL}/shirts/filter-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
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

export { options, params, data, getAllParams }
