import PropTypes from 'prop-types'
import React from 'react'
import configRoute from 'config/routes'
import Immutable from 'immutable'
import { H3 } from 'Page/Header'
import classnames from 'classnames'
import Receipt from 'Receipt'
import Link from 'Link'
import Loading from 'Loading'
import { getSurchargeItems } from 'utils/pricing'
import { onEnter } from 'utils/accessibility'
import { basketSum } from 'utils/basket'
import css from './Summary.css'

class Summary extends React.PureComponent {

  static propTypes = {
    prices: PropTypes.instanceOf(Immutable.Map),
    basketRecipes: PropTypes.object,
    browser: PropTypes.string,
    routing: PropTypes.object,
    isLoading: PropTypes.bool,
    showNoDiscountCTA: PropTypes.bool,
    promoCode: PropTypes.string,
    promoApplyCheckoutCode: PropTypes.func,
  }

  static defaultProps = {
    prices: Immutable.Map({}),
    basketRecipes: Immutable.Map({}),
    deliveryDate: '',
    slotId: '',
    showPromocode: false,
    loadingPreviewOrder: false,
  }

  renderLink() {
    const { showNoDiscountCTA, promoCode , promoApplyCheckoutCode} = this.props
    const classes = classnames(css.link, css.noDiscountCTA)

    if (showNoDiscountCTA) {
      return !promoCode && (
      <div
        className={classes}
        role="button"
        tabIndex='0'
        onClick={() => { promoApplyCheckoutCode() }}
        onKeyDown={e => { onEnter(e,promoApplyCheckoutCode) }}
      >
        Enter your discount code above, or click here to get 30% off all boxes in your first month&nbsp;<span className={css.arrowRight}/>
      </div>
      )
    }

    return (
        <Link to={configRoute.client.menu} className={css.link}>
          Edit order&nbsp;<span className={css.arrowRight} />
        </Link>
    )
  }

  render() {
    const { prices, basketRecipes, browser, isLoading, routing } = this.props
    const numRecipes = basketSum(basketRecipes)

    const isMobile = browser === 'mobile'
    let currentStep

    if (routing && routing.locationBeforeTransitions) {
      if (routing.locationBeforeTransitions.pathname) {
        const pathnameArray = routing.locationBeforeTransitions.pathname.split('/')
        currentStep = pathnameArray.pop()
      }
    }

    return (
      <div className={css.summaryContainer}>
        <H3 headlineFont>Order total</H3>
        {
          (isLoading) ?
            <div className={css.loaderContainer}>
              <Loading />
            </div>
            :
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
                showAddPromocode
              />
              <div>
                {(currentStep !== 'payment') &&
                  this.renderLink()
                }
              </div>
            </div>
        }
      </div>
    )
  }
}

export default Summary
