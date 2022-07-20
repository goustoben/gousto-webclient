export type Country = { name: string; alpha2: string }
export type NameAndSlug = { name: string; slug: string }

export type Allergen = NameAndSlug & {
  contain_type: 'contains' | string
}
export type NutritionalInfo = {
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

export type Micronutrient = {
  name: string
  nrv_percent: number
  content: { amount: number; unit: string }
}

export type RecipeImage = {
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

export type RecipePortionSurcharge = {
  name: string
  price: {
    value: number
    currency: string
  }
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
    core_recipe_id: string
    gousto_reference: number

    country: Country
    basics: NameAndSlug[]
    health_attributes: NameAndSlug[]
    spice_level: { name: string }
    description: string
    shelf_life: { min_days: number; max_days: number }
    food_brand: NameAndSlug
    box_type: NameAndSlug
    country_secondary: Country | null
    difficulty_level: { id: string; name: string } | null
    roundel: NameAndSlug | null
    partnership: NameAndSlug | null

    allergens: Allergen[]
    diet_type: NameAndSlug
    dietary_claims: NameAndSlug[]
    five_a_day: number
    nutritional_information: {
      per_100g: NutritionalInfo
      per_portion: NutritionalInfo

      micronutrients?: Micronutrient[]
    }

    images: RecipeImage[]
    cuisine: NameAndSlug
    equipment: { name: string }[]
    prep_times: PortionBasedValues<number>
    recipe_developer: { name: string } // TODO shall we remove this?
    name: string
    surcharges: PortionBasedValues<RecipePortionSurcharge | null>
    dish_types: { name: string }[]
    chef_prepared: boolean
    ingredient_preparation: {
      time: PortionBasedValues<number | null>
    }
    rating: {
      average: number
      count: number
      love_count: number
    }

    // optional below
    health?: {
      claims: {
        slug: string
        disclaimer: string
      }[]
    }

    promotions?: { slug: string }[] // TODO what is this?
  }
  relationships: {
    ingredients: {
      data: RecipeIngredientRelationship[]
    }
  }
}
