import config from 'config/recipes'

const allergensTransformer = (allergensArray) => {
  const contains = allergensArray.filter((allergen) => {
    return allergen.contain_type === 'contains'
  })

  return contains.map((allergen) => {
    return allergen.name
  })
}

const basicsTransformer =
  (basicsArray) => basicsArray.map((basic) => basic.name)

const cropsTransformer = (media) => {
  const mediaMap = media.map((url) => {
    return {
      src: url.url,
      width: url.width,
    }
  })

  return mediaMap
}

const dietaryTagsTransformer = (dietaryArray) => {
  const newAttributes = dietaryArray.map((attribute) => ({
    name: attribute.name,
    slug: attribute.slug,
  }))

  return newAttributes
}

const foodBrandTransformer = (foodBrand) => {
  return [{
    name: foodBrand.name,
    slug: foodBrand.slug,
    properties: config.foodBrandColours[foodBrand.slug]
  }]
}

const formatIngredients = (normalisedRelationships, normalisedData) => {
  return normalisedRelationships.ingredients.data.map((individualIngredient) => {
    const currentIngredient = normalisedData.ingredient[individualIngredient.id]
    const ingredientLabel = individualIngredient.labels.for2
    const normalisedIngredients = currentIngredient && currentIngredient
    normalisedIngredients.label = ingredientLabel

    return normalisedIngredients
  })
}

const healthKitchenTransformer = (healthKitchen) => {
  if (!healthKitchen) {
    return null
  }

  return {
    disclaimer: healthKitchen.disclaimer,
    micronutrients: healthKitchen.micronutrients.map(micronutrient => ({
      name: micronutrient.name,
      content: {
        amount: micronutrient.content.amount,
        unit: micronutrient.content.unit
      },
      nrvPercent: micronutrient.nrv_percent
    }))
  }
}

const imageUrlMap = (urls) => {
  const urlsMap = urls.map((url) => {
    return {
      src: url.url,
      width: url.width,
    }
  })

  return urlsMap
}

const shelfLifeTransformer = (minDays, maxDays) => {
  return `${minDays}-${maxDays}`
}

const taxonomyTransformer = (attributes) => {
  return [{
    name: "Dietary attributes",
    slug: "dietary-attributes",
    tags: dietaryTagsTransformer(attributes.dietary_claims)
  },
  {
    name: "Food Brands",
    slug: "food-brands",
    tags: foodBrandTransformer(attributes.food_brand)
  }]
}

export {
  allergensTransformer,
  basicsTransformer,
  cropsTransformer,
  formatIngredients,
  healthKitchenTransformer,
  imageUrlMap,
  shelfLifeTransformer,
  taxonomyTransformer
}
