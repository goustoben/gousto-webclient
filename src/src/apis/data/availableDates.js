import { fetchAvailableDates } from 'apis/recipes'

export const getAvailableDates = async (accessToken, useMenuService) => {
  const { data: dates = [] } = await fetchAvailableDates(accessToken)

  return dates
}
