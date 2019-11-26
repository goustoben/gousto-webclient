import { allergensTransformer, imageUrlMap} from './recipeHelpers'

const ingredientTransformer = (ingredient) => {

  return {
    allergens: allergensTransformer(ingredient.attributes.allergens),
    id: ingredient.id,
    label: ingredient.label,
    name: ingredient.attributes.name,
    media:{
      images:[
        {
          title: ingredient.attributes.images[0].title,
          description: ingredient.attributes.images[0].title,
          type: ingredient.attributes.images[0].type,
          urls: imageUrlMap(ingredient.attributes.images[0].crops)
        }
      ]
    },
    subIngredients: ingredient.attributes.sub_ingredients,
  }
}

export { ingredientTransformer }
