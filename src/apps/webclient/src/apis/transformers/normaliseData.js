const getIdForRow = (row) => (
  (row.type === 'recipe')
    ? row.attributes.core_recipe_id && row.attributes.core_recipe_id.toString()
    : row.id
)

export const normaliseData = (response) => {
  const { included = [], data, meta } = response

  const normalised = {
    meta,
    data
  }

  included.forEach(row => {
    if (normalised[row.type] === undefined) {
      normalised[row.type] = {}
    }

    const id = getIdForRow(row)
    normalised[row.type][id] = row
  })

  return normalised
}
