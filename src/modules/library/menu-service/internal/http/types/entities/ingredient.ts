import { Allergen, NameAndSlug, RecipeImage } from "./recipe";

/**
 * This represents an `ingredient` object in the `included` block of Menu service response.
 */
export type MenuAPIResponseIncludedIngredient = {
  id: string
  type: 'ingredient'
  published_at: string

  attributes: {
    allergens: Allergen[]
    dietary_claims: NameAndSlug[]
    images: RecipeImage[]
    label: string
    name: string
    net_weight_mg: number
    sub_ingredients: string
  }

  label?: string // TODO does this actually exist?
}
