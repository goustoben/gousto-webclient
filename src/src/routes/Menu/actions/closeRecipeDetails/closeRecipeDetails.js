import { menuRecipeDetailVisibilityChange } from "routes/Menu/actions/menuRecipeDetails/menuRecipeDetailVisibilityChange"

export const closeRecipeDetails = () => (
    async (dispatch) => {
        dispatch(menuRecipeDetailVisibilityChange())
    }
)
