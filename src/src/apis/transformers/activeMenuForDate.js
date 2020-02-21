export const activeMenuForDateTransformer = (response, date) => {
  const isPreviewMenu = response.meta && response.meta.isPreviewMenu
  if (isPreviewMenu || !date) {
    const defaultFallbackMenu = response.data[0]

    return defaultFallbackMenu
  }

  return response.data.find((menu) =>
    date <= menu.attributes.ends_at // ends_at is the last cutoff date for the menu
  )
}
