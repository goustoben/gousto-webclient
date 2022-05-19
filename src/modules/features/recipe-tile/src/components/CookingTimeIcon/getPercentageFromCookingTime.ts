export const getPercentageFromCookingTime = (cookingTime: number ) => {
    const percentage = Math.min((cookingTime / 60) * 100, 100)
  
    return percentage
}
  