export const arrayToColumns = (arr, count, indexOffset = 0) => {
  const columns = []

  for (let i = 0; i < count; i++) {
    columns[i] = []
  }

  arr.forEach((value, index) => {
    const destination = index % count

    columns[destination].push({ 
      index: (index + indexOffset),
      value
    })
  })

  return columns
}
