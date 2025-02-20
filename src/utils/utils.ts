function getImagePath(manufacturer: string, imageName: string): string {
  return new URL(
    `/src/assets/images/${manufacturer}/${imageName}`,
    import.meta.url
  ).href
}

export { getImagePath }
