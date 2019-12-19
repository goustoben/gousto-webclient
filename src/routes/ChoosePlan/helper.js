import { transactional } from './config'
export const calculateTransactionalOptionPrices = (totalPrice, numPortions, numRecipes) => {
  const total = Number(totalPrice).toFixed(2)
  const percentageOffDecimal = transactional.percentageOff / 100

  const discount = (total * percentageOffDecimal).toFixed(2)
  const totalPriceDiscounted = (total - discount).toFixed(2).toString()

  const numMeals = numPortions * numRecipes
  const pricePerPortion = (totalPriceDiscounted / numMeals).toFixed(2).toString()

  return {
    totalPrice,
    totalPriceDiscounted,
    pricePerPortion
  }
}
