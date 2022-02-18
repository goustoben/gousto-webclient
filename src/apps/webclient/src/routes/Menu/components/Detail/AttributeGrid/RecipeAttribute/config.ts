import { getCookingTime } from 'utils/recipe'

const getUseWithinFormatted = (useWithin: string) =>
  String(useWithin).replace(/(\d)-(\d)/, '$1 - $2')

const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)

const asterisk = String.fromCharCode(42)

type funcString = (_: string | boolean | number) => string | boolean

const descriptions = {
  cookingTime: (time: string) => `Takes ${getCookingTime(time)}`,
  useWithin: (useWithin: string) => `Use within ${getUseWithinFormatted(useWithin)} days`,
  equipmentRequired: (equipment: boolean) => equipment && 'Equipment required',
  fiveADay: (fiveADay: string) => `${fiveADay}/5 a day`,
  cuisine: (cuisine: string) => `${cuisine} Cuisine`,
  cals: (cals: number) => `${Math.round(cals)} cals / serving${asterisk}`,
  diet: (diet: string) => (diet === 'vegan' ? 'Plant-based' : capitalizeFirstLetter(diet)),
  glutenFree: (glutenFree: boolean) => glutenFree && 'Gluten free',
  dairyFree: (dairyFree: boolean) => dairyFree && 'Dairy free',
  numPortions: (numPortions: boolean) => `${numPortions} servings`,
}

/**
 * Name of recipe attribute which is exposed on the details overlay.
 */
export type VisibleAttribute = keyof typeof descriptions

export const getDescription = <
  TName extends VisibleAttribute,
  TFunction extends funcString = funcString,
  TValue extends Parameters<TFunction>[0] = Parameters<TFunction>[0]
>(
  name: TName,
  value: TValue
) => {
  const f = descriptions[name] as TFunction

  return f(value) || ''
}
