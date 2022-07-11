import {
  MenuAPIResponseIncludedBox,
  MenuAPIResponseIncludedCollection,
  MenuAPIResponseIncludedIngredient,
  MenuAPIResponseIncludedRecipe,
} from './entities'
import {
  MenuAPIResponseRelationshipBox,
  MenuAPIResponseRelationshipCollection,
  MenuApiResponseRelationshipFeaturedCategory,
  MenuAPIResponseRelationshipRecipe,
  MenuAPIResponseRelationshipRecipeOptions,
} from './relationships'

export type MenuAPIResponseDataItem = {
  type: 'menu'
  id: string
  attributes: {
    name: string
    core_menu_id: string
    starts_at: string
    ends_at: string
    is_default: boolean
    period: {
      core_period_id: string
    }
    signup_default_day: unknown
  }
  meta: {
    cfyLengthExperimentUserAllocationGroup: string
    swapsExperimentUserAllocationGroup: string
    recommender: {
      enabled: boolean
      version: string
      name: string
      limit: number
      tutorial: string
    }
  }
  relationships: {
    boxes: {
      data: MenuAPIResponseRelationshipBox[]
    }
    collections: {
      data: MenuAPIResponseRelationshipCollection[]
    }
    featured_categories: {
      data: MenuApiResponseRelationshipFeaturedCategory[]
    }
    recipes: {
      data: MenuAPIResponseRelationshipRecipe[]
    }
    featured_recipe: {
      data: MenuAPIResponseRelationshipRecipe
    }
    debut_recipes: {
      data: { core_recipe_id: string }[]
    }
    recipe_options: {
      data: MenuAPIResponseRelationshipRecipeOptions[]
    }
  }
}

export type MenuAPIResponseIncludedItem =
  | MenuAPIResponseIncludedBox
  | MenuAPIResponseIncludedCollection
  | MenuAPIResponseIncludedRecipe
  | MenuAPIResponseIncludedIngredient

export type MenuAPIResponseResult = {
  data: MenuAPIResponseDataItem[]
  included: MenuAPIResponseIncludedItem[]
  meta: {
    isPreviewMenu?: boolean // TODO is this still used?
    recommendations: {
      enabled: boolean
      version: string
      name: string
      limit: number
      tutorial: string
    }
  }
}

/**
 * This represents the return shape of the /menus endpoint
 */
export type MenuAPIResponse = {
  result: MenuAPIResponseResult
  status: 'ok'
}
