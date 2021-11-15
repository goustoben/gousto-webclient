import { doesRecipeHaveSurcharges } from "routes/Menu/selectors/menuService"
import { selectRecipeVariantAction } from "routes/Menu/actions/menuRecipeDetails/selectRecipeVariantAction"

export const selectRecipeVariant = (originalRecipeId, variantId, collectionId, variantOutOfStock, view = 'grid', close = true) =>
    async (dispatch, getState) => {
        const hasSurcharges = doesRecipeHaveSurcharges(getState(), variantId)

        dispatch(
            selectRecipeVariantAction(
                originalRecipeId,
                variantId,
                collectionId,
                variantOutOfStock,
                view,
                close,
                hasSurcharges
            )
        )
    }
