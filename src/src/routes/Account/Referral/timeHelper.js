import moment from 'moment'

export const getTimeDifference = (expiry) => {
  const expiryMoment = moment(expiry)
  const timeDiff = expiryMoment.diff(moment().format())
  const diffDuration = moment.duration(timeDiff)

  return {
    days: expiryMoment.diff(moment(), 'days'),
    hours: diffDuration.hours(),
    minutes: diffDuration.minutes(),
  }
}

export const isTimeInPast = (days, hours, minutes) => (days <= 0 && hours <= 0 && minutes <= 0)