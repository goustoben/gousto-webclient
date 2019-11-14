import config from 'config/recipes'
import roundelsConfig from 'config/roundels'

// [TR-2087] - Used a forEach for all the below to catch any missing data that may be in normalisedRelationships but missing from normalisedData

const allergensTransformer = (allergensArray) => {
  const contains = allergensArray.filter((allergen) => {
    return allergen.contain_type === 'contains'
  })

  return contains.map((allergen) => {
    return allergen.name
  })
}

const basicsTransformer = (basicsArray) => {
  return basicsArray.map((basic) => {
    return basic.name
  })
}

const cropsTransformer = (media) => {
  return media.map((url) => {
    return {
      src: url.url,
      width: url.width,
    }
  })
}

const dietaryTagsTransformer = (dietaryArray) => {
  return dietaryArray.map((attribute) => {
    return {
      name: attribute.name,
      slug: attribute.slug,
    }
  })
}

const equpimentTransformer = (equipmentArray) => {
  return equipmentArray.map((piece) => {
    return piece.name
  })
}

const foodBrandTransformer = (foodBrand) => {

  if (foodBrand) {
    return [{
      name: foodBrand.name,
      slug: foodBrand.slug,
      properties: config.foodBrandColours[foodBrand.slug] || config.foodBrandColours.default
    }]
  }

  return {}
}

const formatIngredients = (normalisedRelationships, normalisedData) => {
  const result = []

  if (normalisedRelationships && normalisedRelationships.ingredients && normalisedRelationships.ingredients.data){
    normalisedRelationships.ingredients.data.forEach((individualIngredient) => {
      if (normalisedData.ingredient && normalisedData.ingredient[individualIngredient.id]) {
        const currentIngredient = normalisedData.ingredient[individualIngredient.id]
        const ingredientLabel = individualIngredient.labels.for2
        const normalisedIngredients = currentIngredient && currentIngredient

        if (normalisedIngredients) {
          normalisedIngredients.label = ingredientLabel

          return result.push(normalisedIngredients)
        }
      }
    })
  }

  return result
}

const imageUrlMap = (urls) => {
  return urls.map((url) => {
    return {
      src: url.url,
      width: url.width,
    }
  })
}

const roundelTransformer = (roundel) => {
  if (roundel && roundel.slug) {
    const match = roundelsConfig.data.roundels.find((item) => {
      return item.slug === roundel.slug
    })

    if (match) {
      return {
        name: match.name,
        celebrity: true,
        media: {
          images: [
            {
              title: match.name,
              description: '',
              type: 'headshot-image',
              urls: [
                {
                  src: match.images[0].url,
                  width: 0,
                }
              ]
            }
          ]
        }
      }
    }

    return
  }

  return
}

const shelfLifeTransformer = (minDays, maxDays) => {
  return `${minDays}-${maxDays}`
}

const surchargeTransformer = (surcharge) => {
  const decimalSurcharge = surcharge/ 100

  return {
    listPrice: decimalSurcharge
  }
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
  equpimentTransformer,
  formatIngredients,
  imageUrlMap,
  roundelTransformer,
  shelfLifeTransformer,
  surchargeTransformer,
  taxonomyTransformer
}
