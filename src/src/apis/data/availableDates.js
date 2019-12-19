import { fetchAvailableDates } from 'apis/recipes'

export const getAvailableDates = async (accessToken) => {
  const { data: dates = [] } = await fetchAvailableDates(accessToken)

  return dates
}
