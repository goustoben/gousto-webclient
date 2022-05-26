import { RootStateOrAny, useSelector } from 'react-redux'

import { getSurcharge, getSurchargePerPortion } from 'utils/recipe'

export const useSurchargePerPortion = ({
  recipeId,
  numPortions,
}: {
  recipeId: string
  numPortions: number
}) => {
  const meals = useSelector<RootStateOrAny, any>((state) =>
    state.recipes.getIn([recipeId, 'meals']),
  )
  const overallSurcharge = getSurcharge(meals, numPortions)
  const surchargePerPortion = overallSurcharge
    ? getSurchargePerPortion(overallSurcharge, numPortions)
    : null

  return surchargePerPortion
}
