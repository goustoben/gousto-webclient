import { activeMenuForDate } from "routes/Menu/selectors/menu"
import { collectionsTransformer } from "apis/transformers/collections"
import { recipesTransformer } from "apis/transformers/recipes"
import { menuCollectionsReceive } from "actions/menuActionHelper/menuCollectionsReceive"
import { menuReceiveMenu } from "actions/menuActionHelper/menuReceiveMenu"
import { basketCurrentMenuIdChange } from "actions/menuActionHelper/basketCurrentMenuIdChange"
import { menuSetLandingCollection } from "routes/Menu/actions/menuSetLandingCollection/menuSetLandingCollection"

const loadMenuCollectionsWithMenuService = async (dispatch, getState, date) => {
    const state = getState()
    const menuServiceData = state.menuService

    if (!menuServiceData || !menuServiceData.data || !menuServiceData.data.length) {
        return
    }

    const brandData = state.brand
    const activeMenu = activeMenuForDate(menuServiceData, date)
    const transformedCollections = collectionsTransformer(activeMenu, menuServiceData)
    const transformedRecipes = recipesTransformer(activeMenu, menuServiceData, brandData)

    dispatch(menuCollectionsReceive(transformedCollections))
    dispatch(menuReceiveMenu(transformedRecipes))

    // this is unfortunately required because menuSetLandingCollection
    // requires collections, collectionRecipes and recipeStock to all be loaded
    // it doesn't work without this as the thunk runs before all the store updates have completed
    await Promise.resolve()

    dispatch(basketCurrentMenuIdChange(activeMenu))
    dispatch(menuSetLandingCollection())
}
export { loadMenuCollectionsWithMenuService }
