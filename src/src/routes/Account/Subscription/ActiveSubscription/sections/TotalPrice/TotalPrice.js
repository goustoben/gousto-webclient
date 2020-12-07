import React, { useContext } from 'react'
import css from './TotalPrice.css'
import {
  SubscriptionContext,
} from '../../../context'

import {
  getIsBoxAndPricesLoaded,
  getTotalBoxPriceDiscounted,
  getPricePerPortionDiscounted
} from '../../../context/selectors/box'

export const TotalPrice = () => {
  const context = useContext(SubscriptionContext)
  const { state } = context
  const isBoxAndPricesLoaded = getIsBoxAndPricesLoaded(state)
  const totalBoxPrice = getTotalBoxPriceDiscounted(state)
  const pricePerPortion = getPricePerPortionDiscounted(state)

  return (isBoxAndPricesLoaded
    ? (
      <section>
        <div className={css.priceRow} data-testing="price-per-servings">
          <p>Price per Serving</p>
          <span>
            £
            {pricePerPortion}
          </span>
        </div>
        <div className={css.totalPrice} data-testing="total-price">
          <p>Total Box Price</p>
          <span>
            £
            {totalBoxPrice}
          </span>
        </div>
      </section>
    )
    : null )
}
