const getFirstMenu = (state) => {
  const menus = state.menuService?.data

  return menus && menus[0]
}

const getBoxes = (state) => getFirstMenu(state)?.relationships?.boxes

const isUserEligibleFor5Recipes = (state) => {
  const boxes = getBoxes(state)

  return boxes?.data?.some((box) => box.id === 'SKU-GMT-5-2')
}

export const getMaxNumRecipes = (state) => (isUserEligibleFor5Recipes(state) ? 5 : 4)
