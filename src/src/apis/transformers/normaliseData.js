export const normaliseData = (response) => {
  const { included } = response

  const normalised = {}

  included.forEach(row => {

    if(normalised[row.type] === undefined) {
      normalised[row.type] = {}
    }

    const id = (row.type === 'recipe') ? row.attributes.core_recipe_id.toString() : row.id
    normalised[row.type][id] = row

  })

  return normalised
}
