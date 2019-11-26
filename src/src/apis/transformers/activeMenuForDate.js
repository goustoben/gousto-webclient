export const activeMenuForDateTransformer = (response, date) => {

  if (date){
    return response.data.find((menu) => {
      return date <= menu.attributes.ends_at // ends_at is the last cutoff date for the menu
    })
  }

  const defaultFallbackMenu = response.data[0]

  return defaultFallbackMenu
}
