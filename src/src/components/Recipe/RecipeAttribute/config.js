import { getCookingTime } from 'utils/recipe'

const getUseWithinFormatted = useWithin => String(useWithin).replace(/(\d)-(\d)/, '$1 - $2')
const asterisk = String.fromCharCode(42)

const descriptions = {
  cookingTime: time => `Takes ${getCookingTime(time)}`,
  useWithin: useWithin => `Use within ${getUseWithinFormatted(useWithin)} days`,
  equipmentRequired: (equipment, view) => view === 'list' ? equipment.toJS().join(', ') : 'Equipment required',
  fiveADay: fiveADayValue => `${fiveADayValue}/5 a day`,
  cuisine: cuisine => `${cuisine} Cuisine`,
  cals: cals => `${Math.round(cals)} cals / serving${asterisk}`,
  diet: diet => (diet === 'vegan') ? 'plant-based' : diet,
}

export const getDescription = (name, value, view) => (descriptions[name](value, view) || '')
