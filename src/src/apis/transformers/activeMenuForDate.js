export const activeMenuForDateTransformer = (menuServiceData, date) => {
  const isPreviewMenu = menuServiceData.meta && menuServiceData.meta.isPreviewMenu
  if (isPreviewMenu || !date) {
    const defaultFallbackMenu = menuServiceData.data[0]

    return defaultFallbackMenu
  }

  return menuServiceData.data.find((menu) =>
    date <= menu.attributes.ends_at // ends_at is the last cutoff date for the menu
  )
}
