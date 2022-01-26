export const transformRecipesWithIngredients = (recipes, ingredientsData) => (
  recipes.map((recipe) => {
    const { id: uuid, attributes, relationships } = recipe
    const { name: title, core_recipe_id: id, gousto_reference: goustoReference, images } = attributes
    const { ingredients: { data: recipeIngredients } } = relationships

    const imageUrl = images?.[0]?.crops?.[1]?.url || ''
    const ingredients = recipeIngredients.map(
      ({ id: ingredientId, labels: { for2 } }) => {
        const ingredient = ingredientsData.find(item => item.id === ingredientId)
        const urls = ingredient.attributes?.images?.[0]?.crops || []

        return (
          { label: for2, urls, uuid: ingredientId }
        )
      }
    )

    return { id, uuid, title, goustoReference: goustoReference.toString(), ingredients, imageUrl }
  })
)
