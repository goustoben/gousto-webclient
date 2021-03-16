import PropTypes from 'prop-types'
import React, { PureComponent, Fragment } from 'react'
import configRoute from 'config/routes'
import Immutable from 'immutable'
import { Alert } from 'goustouicomponents'
import { PricePerServingMessage } from 'PricePerServingMessage'
import { H3 } from 'Page/Header'
import classNames from 'classnames'
import Receipt from 'Receipt'
import Link from 'Link'
import Loading from 'Loading'
import { getSurchargeItems } from 'utils/pricing'
import { onEnter } from 'utils/accessibility'
import { basketSum } from 'utils/basket'
import { SectionHeader } from '../SectionHeader'
import css from './Summary.css'

const propTypes = {
  prices: PropTypes.instanceOf(Immutable.Map),
  // eslint-disable-next-line react/forbid-prop-types
  basketRecipes: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  routing: PropTypes.object,
  isLoading: PropTypes.bool,
  showNoDiscountCTA: PropTypes.bool,
  showAddPromocode: PropTypes.bool,
  promoCode: PropTypes.string,
  promoApplyCheckoutCode: PropTypes.func,
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

const defaultProps = {
  prices: Immutable.Map({}),
  basketRecipes: Immutable.Map({}),
  showAddPromocode: true,
  isCheckoutOverhaulEnabled: false,
  isLoading: false,
  showNoDiscountCTA: false,
  promoCode: '',
  promoApplyCheckoutCode: () => {},
  routing: {},
}

class Summary extends PureComponent {
  renderLink() {
    const { showNoDiscountCTA, promoCode , promoApplyCheckoutCode} = this.props
    const classes = classNames(css.link, css.noDiscountCTA)

    if (showNoDiscountCTA) {
      return !promoCode && (
      <div
        className={classes}
        role="button"
        tabIndex="0"
        onClick={() => { promoApplyCheckoutCode() }}
        onKeyDown={onEnter(promoApplyCheckoutCode)}
      >
        Enter your discount code above, or click here to get 30% off all boxes in your first month&nbsp;
        <span className={css.arrowRight} />
      </div>
      )
    }

    return (
      <Link to={configRoute.client.menu} className={css.link}>
        Edit order&nbsp;
        <span className={css.arrowRight} />
      </Link>
    )
  }

  render() {
    const { prices, basketRecipes, isLoading, routing, showAddPromocode, isCheckoutOverhaulEnabled } = this.props
    const numRecipes = basketSum(basketRecipes)

    let currentStep

    if (routing && routing.locationBeforeTransitions) {
      if (routing.locationBeforeTransitions.pathname) {
        const pathnameArray = routing.locationBeforeTransitions.pathname.split('/')
        currentStep = pathnameArray.pop()
      }
    }

    return (
      <div
        className={classNames(css.summaryContainer,
          { [css.summaryContainerRedesign]: isCheckoutOverhaulEnabled }
        )}
        data-testing="checkoutOrderSummary"
      >
        {!isLoading && !isCheckoutOverhaulEnabled && (
          <Alert type="info">
            <PricePerServingMessage />
          </Alert>
        )}
        {isCheckoutOverhaulEnabled
          ? <SectionHeader title="Order total" />
          : <H3 headlineFont>Order total</H3>}
        {isLoading ? (
          <div className={classNames(css.loaderContainer, { [css.loaderContainerRedesign]: isCheckoutOverhaulEnabled })}>
            <Loading className={css.loadingImage} />
          </div>
        ) : (
          <Fragment>
            {isCheckoutOverhaulEnabled && (
              <div className={css.pricePerServingBlock}>
                <div className={css.discountIcon} />
                <PricePerServingMessage isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled} />
              </div>
            )}
            <div className={classNames(css.details, { [css.detailsRedesign]: isCheckoutOverhaulEnabled })}>
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
                showAddPromocode={showAddPromocode}
                hasFirstDeliveryDay
                isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}
              />
              {!isCheckoutOverhaulEnabled && (
                <div>
                  {(currentStep !== 'payment')
                  && this.renderLink()}
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

Summary.defaultProps = defaultProps
Summary.propTypes = propTypes

export {
  Summary
}
