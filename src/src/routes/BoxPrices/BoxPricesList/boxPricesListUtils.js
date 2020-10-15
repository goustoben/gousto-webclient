export const groupBy = (collection, key) =>
  collection.reduce((accumulator, currentValue) => {
    (accumulator[currentValue[key]] = accumulator[currentValue[key]] || []).push(currentValue)

    return accumulator
  }, {})
