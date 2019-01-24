import { getCookingTime } from 'utils/recipe'

const getUseWithinFormatted = useWithin => String(useWithin).replace(/(\d)-(\d)/, '$1 - $2')

const descriptions = {
  cookingTime: time => `Takes ${getCookingTime(time)}`,
  useWithin: useWithin => `Use within ${getUseWithinFormatted(useWithin)} days`,
  equipmentRequired: (equipment, view) => view === 'list' ? equipment.toJS().join(', ') : 'Equipment required',
  fiveADay: fiveADayValue => `${fiveADayValue}/5 a day`
}

export const getDescription = (attributeName, attributeValue, view) => (descriptions[attributeName](attributeValue, view) || '')
