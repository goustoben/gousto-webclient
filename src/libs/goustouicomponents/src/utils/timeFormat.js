const createDateFromTime = (time) => new Date(`1970-01-01T${time}Z`)

const formatFor12Hour = { timeZone: 'UTC', hour12: true, hour: 'numeric' }

const roundDateToClosestHour = (date) => {
  date.setHours(date.getHours() + Math.round(date.getMinutes() / 60))
  date.setMinutes(0, 0, 0)

  return date
}

export const formatTimeToHour = (time) => (
  roundDateToClosestHour(createDateFromTime(time))
    .toLocaleTimeString('en-US', formatFor12Hour)
    .toLowerCase()
    .replace(' ', '')
)
