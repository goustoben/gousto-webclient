export const transformOrderPricesV2ToOrderV1 = (response) => {
  const { prices } = response.data.attributes

  return {
    data: {
      flatDiscountApplied: prices.is_flat_discount_applied,
      amountOff: prices.amount_off,
      percentageOff: prices.percentage_off,
      promoCode: prices.promo_code,
      promoCodeValid: prices.is_promo_code_valid,
      pricePerPortion: prices.per_portion,
      pricePerPortionDiscounted: prices.per_portion_discounted,
      productTotal: prices.product_total,
      recipeTotal: prices.recipe_total,
      surchargeTotal: prices.surcharge_total,
      recipeDiscount: prices.recipe_discount,
      deliveryTotal: prices.delivery_total,
      grossTotal: prices.gross_total,
      vatCharged: prices.vat_charged,
      total: prices.total,
      totalDiscount: prices.total_discount,
      recipeTotalDiscounted: prices.recipe_total_discounted,
      items: Array(prices.surcharge_count).fill({ type: 'Surcharge' }),
    },
  }
}
