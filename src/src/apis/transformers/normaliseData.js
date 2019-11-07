export const normaliseData = (response) => {
  const { included } = response

  const normalised = {}

  included.forEach(row => {

    if(normalised[row.type] === undefined) {
      normalised[row.type] = {}
    }

    normalised[row.type][row.id] = row
  })

  return normalised
}
