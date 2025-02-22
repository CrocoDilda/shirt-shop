import { ref } from "vue"

const optionsSearch = ref({
  color: [
    { name: "Чёрный", code: "black" },
    { name: "Белый", code: "white" },
    { name: "Серый", code: "gray" },
  ],
  manufacturer: [
    { name: "Baon", code: "baon" },
    { name: "Colin's", code: "colins" },
    { name: "Eterna", code: "eterna" },
    { name: "Bawer", code: "bawer" },
  ],
  material: [
    { name: "Вискоза", code: "viscose" },
    { name: "Хлопок", code: "cotton" },
    { name: "Лён", code: "flax" },
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

export { optionsSearch, options }
