export const normaliseData = (response) => {
  const { included } = response

  const normalised = {}

  included.forEach(row => {
    normalised[row.id] = row
  })

  return normalised
}
