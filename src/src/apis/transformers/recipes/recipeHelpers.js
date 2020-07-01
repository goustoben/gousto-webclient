// [TR-2087] - Used a forEach for all the below to catch any missing data that may be in normalisedRelationships but missing from normalisedData

const allergensTransformer = (allergensArray) => {
  const contains = allergensArray.filter((allergen) => allergen.contain_type === 'contains')

  return contains.map((allergen) => allergen.name)
}

const basicsTransformer = (basicsArray) => basicsArray.map((basic) => basic.name)

const cropsTransformer = (media) => media.map((url) => ({
  src: url.url,
  width: url.width,
}))

const equipmentTransformer = (equipmentArray) => equipmentArray.map((piece) => piece.name)

const formatIngredients = (normalisedRelationships, normalisedData) => {
  const result = []

  if (normalisedRelationships && normalisedRelationships.ingredients && normalisedRelationships.ingredients.data) {
    normalisedRelationships.ingredients.data.forEach((individualIngredient) => {
      if (normalisedData.ingredient && normalisedData.ingredient[individualIngredient.id]) {
        const currentIngredient = normalisedData.ingredient[individualIngredient.id]
        const ingredientLabel = individualIngredient.labels.for2
        const normalisedIngredients = currentIngredient && currentIngredient

        if (normalisedIngredients) {
          normalisedIngredients.label = ingredientLabel

          result.push(normalisedIngredients)
        }
      }
    })
  }

  return result
}

const micronutrientsTransformer = (micronutrients) => {
  if (!micronutrients) {
    return null
  }

  return micronutrients.map(micronutrient => ({
    name: micronutrient.name,
    content: micronutrient.content,
    nrvPercent: micronutrient.nrv_percent
  }))
}

const imageUrlMap = (urls) => urls.map((url) => ({
  src: url.url,
  width: url.width,
}))

const roundelTransformer = (roundel, brandData = {}) => {
  if (roundel
    && roundel.slug
    && brandData.data
    && brandData.data.roundels
    && brandData.data.roundels.length > 0) {
    const match = brandData.data.roundels.find((item) => item.slug === roundel.slug)

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
  }
}

const shelfLifeTransformer = (minDays, maxDays) => `${minDays}-${maxDays}`

const surchargeTransformer = (surcharge) => {
  const decimalSurcharge = surcharge / 100

  return {
    listPrice: decimalSurcharge
  }
}

const isFineDineInTransformer = (attributes) => Boolean(attributes.food_brand && attributes.food_brand.slug === 'fine-dine-in')

const promotionsTransformer = (attributes) => (attributes.promotions ? attributes.promotions.map(p => p.slug) : [])

export {
  allergensTransformer,
  basicsTransformer,
  cropsTransformer,
  equipmentTransformer,
  formatIngredients,
  micronutrientsTransformer,
  imageUrlMap,
  roundelTransformer,
  shelfLifeTransformer,
  surchargeTransformer,
  isFineDineInTransformer,
  promotionsTransformer
}
