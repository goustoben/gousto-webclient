export type MenuAPIResponseRelationshipRecipeOptionAlternative = {
  type: 'alternative'
  data: {
    id: string
    type: 'recipe'
    core_recipe_id: string
    meta: {
      core_recipe_id: string
    }
    attributes: {
      short_display_name: string
    }
  }
}

/**
 * This represents a `recipe_options` object in the `relationships` block of Menu service response.
 */
export type MenuAPIResponseRelationshipRecipeOptions = {
  id: string
  type: 'recipe'
  core_recipe_id: string
  meta: {
    core_recipe_id: string
  }
  attributes: {
    short_display_name: string
  }
  relationships: MenuAPIResponseRelationshipRecipeOptionAlternative[]
}
