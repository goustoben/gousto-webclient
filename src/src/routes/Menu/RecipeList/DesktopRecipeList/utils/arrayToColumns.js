// arrayToColumns([1, 2, 3, 4, 5, 6], 3)
//  -> [
//    [ { index: 0, value: 1 }, { index: 3, value: 4 } ],
//    [ { index: 1, value: 2 }, { index: 4, value: 5 } ],
//    [ { index: 2, value: 3 }, { index: 5, value: 6 } ]
//  ]
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
