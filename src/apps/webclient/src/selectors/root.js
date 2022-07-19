// Root
export const getStock = ({ menuRecipeStock }) => menuRecipeStock
export const getBasket = ({ basket }) => basket
export const getRecipes = ({ recipes }) => recipes
export const getMenuRecipeIds = ({ menuRecipes }) => menuRecipes
export const getMenuCollections = ({ menuCollections }) => menuCollections
export const getMenuCutoffUntil = ({ menuCutoffUntil }) => menuCutoffUntil
export const getBoxSummaryDeliveryDays = ({ boxSummaryDeliveryDays }) => boxSummaryDeliveryDays
export const getUserAgent = ({ request }) => request.get('userAgent')
export const getProductCategories = ({ productsCategories }) => productsCategories
export const getMenuBrowseCTAShow = ({ menuBrowseCTAShow }) => menuBrowseCTAShow
export const getMenuService = ({ menuService }) => menuService
