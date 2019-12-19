import moment from 'moment'

const withinOptionDate = (currentDate, option) => {
  const optionDate = moment(option.start)

  return currentDate.isSameOrAfter(optionDate)
}

export const getCurrentImage = (date, options) => {
  if (!date) {
    return null
  }
  
  const currentDate = moment(date)

  for (let i = 0; i < options.length; i++) {
    const currentOption = options[i]

    const matchesCurrentOption = withinOptionDate(currentDate, currentOption)
    
    // we can skip the rest of the checks if we don't match the option at all
    if (!matchesCurrentOption) {
      continue
    }

    const nextOption = options[i + 1]

    // if there are no more options and we match this one then we can return it
    if (!nextOption) {
      return currentOption.url
    }

    const matchesNextOption = withinOptionDate(currentDate, nextOption)

    // if the current date also fits into the next option then move on to that one
    if (matchesNextOption) {
      continue
    }

    // otherwise we match the current option and don't match the next one, so return it
    return currentOption.url
  }

  return null
}
