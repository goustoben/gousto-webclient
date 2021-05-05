import PropTypes from 'prop-types'
import React, { PureComponent, Fragment } from 'react'
import Immutable from 'immutable'
import { PricePerServingMessage } from 'PricePerServingMessage'
import Receipt from 'Receipt'
import Loading from 'Loading'
import { getSurchargeItems } from 'utils/pricing'
import { basketSum } from 'utils/basket'
import { SectionHeader } from '../SectionHeader'
import { PromoCode } from '../PromoCode'
import css from './Summary.css'

const propTypes = {
  prices: PropTypes.instanceOf(Immutable.Map),
  // eslint-disable-next-line react/forbid-prop-types
  basketRecipes: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  isLoading: PropTypes.bool,
}

const defaultProps = {
  prices: Immutable.Map({}),
  basketRecipes: Immutable.Map({}),
  isLoading: false,
}

class Summary extends PureComponent {
  render() {
    const { prices, basketRecipes, isLoading } = this.props
    const numRecipes = basketSum(basketRecipes)

    return (
      <div className={css.summaryContainerRedesign} data-testing="checkoutOrderSummary">
        <SectionHeader title="Order total" />
        {isLoading ? (
          <div className={css.loaderContainer}>
            <Loading className={css.loadingImage} />
          </div>
        ) : (
          <Fragment>
            <div className={css.pricePerServingBlock}>
              <div className={css.discountIcon} />
              <PricePerServingMessage isPriceInCheckout />
            </div>
            <div className={css.details}>
              <Receipt
                numRecipes={numRecipes}
                prices={prices}
                deliveryTotalPrice={prices.get('deliveryTotal')}
                surcharges={getSurchargeItems(prices.get('items'))}
                surchargeTotal={prices.get('surchargeTotal')}
                recipeTotalPrice={prices.get('recipeTotal')}
                totalToPay={prices.get('total')}
                recipeDiscountAmount={prices.get('recipeDiscount')}
                recipeDiscountPercent={prices.get('percentageOff')}
                extrasTotalPrice={prices.get('productTotal')}
                isReceiptInCheckout
              />
              <PromoCode />
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

Summary.defaultProps = defaultProps
Summary.propTypes = propTypes

export { Summary }
