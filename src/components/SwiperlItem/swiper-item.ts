const data = [
  {
    id: 0,
    name: "Eternal Code",
    images: ["baon-MP002XW0PX9O-1.webp"],
    price: "6699",
    manufacturer: "baon",
  },
  {
    id: 1,
    name: "Silent Structure",
    images: ["baon-MP002XW08RE0-1.webp"],
    price: "4599",
    manufacturer: "baon",
  },
  {
    id: 2,
    name: "Pure Axis",
    images: ["baon-MP002XW1FIH5-1.webp"],
    price: "3499",
    manufacturer: "baon",
  },
  {
    id: 3,
    name: "Abstract Core",
    images: ["colins-MP002XW0J3O1-1.webp"],
    price: "2790",
    manufacturer: "colins",
  },
  {
    id: 4,
    name: "Minimal Vector",
    images: ["colins-MP002XW0ZMHS-1.webp"],
    price: "1690",
    manufacturer: "colins",
  },
]

function getImagePath(manufacturer: string, imageName: string): string {
  return new URL(
    `../../assets/images/${manufacturer}/${imageName}`,
    import.meta.url
  ).href
}

export { data, getImagePath }
