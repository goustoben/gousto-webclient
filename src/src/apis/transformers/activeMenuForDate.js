export const activeMenuForDateTransformer = (response, date) => {

  if (date){
    return response.data.find((menu) => {
      return date <= menu.attributes.ends_at // ends_at is the last cutoff date for the menu
    })
  }

  // TODO: we think that if today or no date is supplied we should return menu[0]
  return response.data[0]
}
