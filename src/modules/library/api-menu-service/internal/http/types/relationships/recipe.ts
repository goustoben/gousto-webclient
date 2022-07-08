/**
 * This represents a `recipe` object in the `relationships` block of Menu service response.
 */
export type MenuAPIResponseRelationshipRecipe = {
  id: string
  type: 'recipe'
  core_recipe_id: string
  meta: { core_recipe_id: string }
}
