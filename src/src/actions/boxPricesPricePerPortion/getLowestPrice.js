export const getLowestPrice = (data, nPeople, key) => {
    if (!(data && data[nPeople])) {
        return null
    }

    const pricesForThisNumberOfPeople = data[nPeople]

    const allPrices = Object.values(pricesForThisNumberOfPeople)
        .map((cuisineToPrices) => {
            if (cuisineToPrices && cuisineToPrices.gourmet && cuisineToPrices.gourmet[key]) {
                return Number(cuisineToPrices.gourmet[key])
            }

            return null
        })
        .filter((x) => !!x)

    if (allPrices.length === 0) {
        return null
    }

    const lowestPrice = Math.min(...allPrices)

    return String(lowestPrice)
}
