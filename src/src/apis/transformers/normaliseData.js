export const normaliseData = (response) => {
  const { included } = response

  const normalised = {}

  included.forEach(row => {

    if(normalised[row.type] === undefined) {
      normalised[row.type] = {}
    }

    if (row.type === 'recipe') {
      normalised[row.type][row.attributes.core_recipe_id.toString()] = row
    } else {
      normalised[row.type][row.id] = row
    }
  })

  return normalised
}
