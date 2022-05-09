import moment from 'moment'

// The menu week is Saturday - Friday. From the chosen delivery date, we
// subtract/add a certain amount of days to reach the previous Saturday / next
// Friday.

// moment#day:        Sun               Sat
const PREVIOUS_DAYS = [1, 2, 3, 4, 5, 6, 0]
const UPCOMING_DAYS = [5, 4, 3, 2, 1, 0, 6]

const findDateRangeForMenuWeek = (basketDate) => {
  if (!basketDate) {
    return null
  }

  const slotMoment = moment(basketDate)
  const dayOfWeek = slotMoment.day()

  const startMoment = moment(slotMoment)
  startMoment.subtract(PREVIOUS_DAYS[dayOfWeek], 'days')

  const endMoment = moment(slotMoment)
  endMoment.add(UPCOMING_DAYS[dayOfWeek], 'days')

  return {
    startMoment,
    endMoment,
  }
}

const formatMoment = (dateMoment) => dateMoment.format('MMM DD')

export const getMenuDateRangeText = (basketDate) => {
  const range = findDateRangeForMenuWeek(basketDate)

  if (!range) {
    return 'Choose Recipes'
  }

  const { startMoment, endMoment } = range

  return `Menu for ${formatMoment(startMoment)} - ${formatMoment(endMoment)}`
}
