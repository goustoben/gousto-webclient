import moment from 'moment'

/**
 * This is a quick descriptions of the menuService state.
 * {
 *  menuService: {
 *    meta: {},
 *    data: [{ type: 'menu' }],
 *    collection: { [collectionId]: { type: 'collection' } }
 *    recipe: { [recipeId]: { type: 'recipe' } }
 *    ingredient: { [ingredientId]: { type: 'ingredient' } }
 *  }
 * }
 */

const getMenuService = (state) => state.menuService

const getMenus = (state) => getMenuService(state).data

const getNthMenu = (state, index = 0) => {
  const menus = getMenus(state)

  return menus && menus[index]
}

const getNthMenuAttribute = (state, index = 0) => {
  const menu = getNthMenu(state, index)

  return menu && menu.attributes
}

export const getPreviewMenuDateForCutoff = (state) => {
  const menuAttributes = getNthMenuAttribute(state)

  if (!menuAttributes) {
    return null
  }

  const menuCutoff = moment(menuAttributes.ends_at).subtract(1, 'days').format('YYYY-MM-DD')

  return menuCutoff
}

const getRecipes = (state) => getMenuService(state).recipe

const getRecipe = (state, recipeId) => getRecipes(state)[recipeId]

const getRecipeSurcharges = (state, recipeId) => {
  const recipe = getRecipe(state, recipeId)
  const { surcharges } = recipe.attributes

  return surcharges
}

export const doesRecipeHaveSurcharges = (state, recipeId) => {
  const surcharges = getRecipeSurcharges(state, recipeId)

  return Object.values(surcharges).some((surcharge) => surcharge !== null)
}

export const menuBoxes = ({menuService}) => menuService?.box
