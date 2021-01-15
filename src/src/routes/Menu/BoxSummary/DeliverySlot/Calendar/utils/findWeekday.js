const WEEKDAY_FRIDAY = 5
const WEEKDAY_SATURDAY = 6

const recursiveFindWeekday = (dateMoment, targetWeekday, dayDelta) => {
  if (dateMoment.isoWeekday() === targetWeekday) {
    return dateMoment
  }

  return recursiveFindWeekday(
    dateMoment.add(dayDelta, 'days'),
    targetWeekday,
    dayDelta
  )
}

export const getUpcomingFridayInclusive = (dateMoment) => recursiveFindWeekday(dateMoment, WEEKDAY_FRIDAY, 1)
export const getPrecedingSaturdayInclusive = (dateMoment) => recursiveFindWeekday(dateMoment, WEEKDAY_SATURDAY, -1)
