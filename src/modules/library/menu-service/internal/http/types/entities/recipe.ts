type County = { name: string; alpha2: string }
type NameAndSlug = { name: string; slug: string }

type Allergen = NameAndSlug & {
  contain_type: 'contains' | string
}
type NutritionalInfo = {
  fibre_mg: number
  protein_mg: number
  net_weight_mg: number
  energy_kj: number
  carbs_sugars_mg: number
  fat_saturates_mg: number
  carbs_mg: number
  salt_mg: number
  fat_mg: number
  energy_kcal: number
}

type Image = {
  type: 'mood-image' | string
  title: string | null
  description: string | null
  crops: {
    url: string
    width: number
  }[]
}

type PortionBasedValues<TValue> = {
  for2: TValue
  for4: TValue
}

type RecipeIngredientRelationship = {
  id: string
  type: 'ingredient'
  quantities: PortionBasedValues<number>
  labels: PortionBasedValues<string>
}

/**
 * This represents a `recipe` object in the `included` block of Menu service response.
 */
export type MenuAPIResponseIncludedRecipe = {
  type: 'recipe'
  id: string
  attributes: {
    country: County
    basics: NameAndSlug[]
    health_attributes: NameAndSlug[]
    spice_level: { name: string }
    core_recipe_id: string
    description: string
    shelf_life: { min_days: number; max_days: number }
    food_brand: NameAndSlug
    box_type: NameAndSlug
    country_secondary: County
    gousto_reference: number
    difficulty_level: { id: string; name: string }
    roundel: any // TODO what type is this?
    nutritional_information: {
      per_100g: NutritionalInfo
      per_portion: NutritionalInfo
    }
    images: Image[]
    partnership: any // TODO what type is this?
    five_a_day: number
    cuisine: NameAndSlug
    equipment: { name: string }[]
    diet_type: NameAndSlug
    prep_times: PortionBasedValues<number>
    allergens: Allergen[]
    dietary_claims: NameAndSlug[]
    recipe_developer: { name: string } // TODO shall we remove this?
    name: string
    surcharges: PortionBasedValues<number>
    dish_types: { name: string }[]
    chef_prepared: boolean
    ingredient_preparation: {
      time: PortionBasedValues<number>
    }
    rating: {
      average: number
      count: number
      love_count: number
    }
  }
  relationships: {
    ingredients: {
      data: RecipeIngredientRelationship[]
    }
  }
}
