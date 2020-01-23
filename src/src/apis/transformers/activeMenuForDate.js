export const activeMenuForDateTransformer = (response, date) => {  
  if (!date) {
    const defaultFallbackMenu = response.data[0]
    
    return defaultFallbackMenu
  }
  
  return response.data.find((menu) => {
    return date <= menu.attributes.ends_at // ends_at is the last cutoff date for the menu
  })
}
