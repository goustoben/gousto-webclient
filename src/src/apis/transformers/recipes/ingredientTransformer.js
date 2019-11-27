import { allergensTransformer, imageUrlMap} from './recipeHelpers'

const images = (ingredient) => {
  if (ingredient && ingredient.attributes && ingredient.attributes.images && ingredient.attributes.images.length > 0) {
    const image = ingredient.attributes.images[0]

    return [
      {
        title: image.title || '',
        description: image.title || '',
        type: image.type || '',
        urls: imageUrlMap(image.crops)
      }
    ]
  }

  return []
}

const ingredientTransformer = (ingredient) => {

  return {
    allergens: allergensTransformer(ingredient.attributes.allergens),
    id: ingredient.id,
    label: ingredient.label,
    name: ingredient.attributes.name,
    media:{
      images: images(ingredient)
    },
    subIngredients: ingredient.attributes.sub_ingredients || '',
  }
}

export { ingredientTransformer }
