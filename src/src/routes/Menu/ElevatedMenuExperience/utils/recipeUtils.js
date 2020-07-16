export const getPercentageFromCookingTime = (cookingTime) => {
  const percentage = Math.min((cookingTime / 60) * 100, 100)

  return percentage
}
