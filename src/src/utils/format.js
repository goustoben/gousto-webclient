import React from 'react'

const pound = String.fromCharCode(163)

export function formatPrice(amount) {
  return `${pound}${parseFloat(amount).toFixed(2)}`
}

export function getFirstPartPostcode(postcode) {
  return postcode.slice(0, -3).trim().toLowerCase()
}

export const formatLabelPlural = (string, numItem) => {
  if (numItem > 1) {
    return `${string}s (${numItem})`
  } else if (numItem === 1) {
    return `${string} (${numItem})`
  }

  return string
}

export const formatDashOrPrice = (price, numRecipes, prices, dash = null) => {
  if (numRecipes < 2 || !prices) {
    return <span>{pound}{dash}</span>
  }

  return formatPrice(price)
}

export const formatDeliveryTotal = (prices, deliveryTotalPrice, dash = null) => {
  if (deliveryTotalPrice) {
    return parseFloat(deliveryTotalPrice) > 0 ? formatPrice(deliveryTotalPrice) : 'FREE'
  }

  return <span>{pound}{dash}</span>
}

export const formatRecipeDiscount = (recipeDiscountPercent) => {
  if (recipeDiscountPercent) {
    return `${Math.ceil(recipeDiscountPercent)}% discount`
  }

  return 'Discount'
}

export default {
  formatPrice,
  getFirstPartPostcode,
}
