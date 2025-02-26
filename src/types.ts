export type Shirt = {
  id: number
  name: string
  article: string
  color: string[]
  created_at: string
  gender: "male" | "female" | "unisex"
  images: string[]
  manufacturer: string
  material: string
  model_height: string
  model_sizes: string
  popularity: number
  price: number
  sizes: Record<string, number>
}
