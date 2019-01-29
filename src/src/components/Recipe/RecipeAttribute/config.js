import { getCookingTime } from 'utils/recipe'

const getUseWithinFormatted = useWithin => String(useWithin).replace(/(\d)-(\d)/, '$1 - $2')
const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
const asterisk = String.fromCharCode(42)

const descriptions = {
  cookingTime: time => `Takes ${getCookingTime(time)}`,
  useWithin: useWithin => `Use within ${getUseWithinFormatted(useWithin)} days`,
  equipmentRequired: (equipment, view) => view === 'list' ? equipment.toJS().join(', ') : 'Equipment required',
  fiveADay: fiveADay => `${fiveADay}/5 a day`,
  cuisine: cuisine => `${cuisine} Cuisine`,
  cals: cals => `${Math.round(cals)} cals / serving${asterisk}`,
  diet: diet => (diet === 'vegan') ? 'Plant-based' : capitalizeFirstLetter(diet),
  glutenFree: glutenFree => glutenFree && 'Gluten Free',
  dairyFree: dairyFree => dairyFree && 'Dairy Free',
}

export const getDescription = (name, value, view) => (descriptions[name](value, view) || '')
