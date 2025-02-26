function getImagePath(manufacturer: string, imageName: string): string {
  return new URL(
    `/src/assets/images/${manufacturer}/${imageName}`,
    import.meta.url
  ).href
}

const SERVER_URL = "http://localhost:3000"

export { getImagePath, SERVER_URL }
