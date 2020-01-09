import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import { basketSum } from 'utils/basket'
import { getSurchargeItems } from 'utils/pricing'

import config from 'config'
import { Button, Heading, LayoutContentWrapper, Spinner } from 'goustouicomponents'
import { UserCreditMessage } from 'components/UserCreditMessage'
import Receipt from 'Receipt'
import Portions from './Portions'
import css from './Details.css'
import BoxProgressAlert from './BoxProgressAlert'
import { RecipeList } from './RecipeList'
import { DateHeader } from './DateHeader'
import { CheckoutContainer } from '../BannerButton/Checkout'
import {
  HIDE_CHOOSE_RECIPES_CTA,
  HIDE_RECIPE_LIST,
  HIDE_PORTIONS,
  HIDE_PROMO_CODE_TEXT
} from './displayOptionsProps'

class Details extends React.Component {
  static propTypes = {
    accessToken: PropTypes.string,
    basketNumPortionChange: PropTypes.func.isRequired,
    portionSizeSelectedTracking: PropTypes.func.isRequired,
    basketRestorePreviousDate: PropTypes.func.isRequired,
    boxSummaryVisibilityChange: PropTypes.func.isRequired,
    clearSlot: PropTypes.func.isRequired,
    date: PropTypes.string,
    deliveryDays: PropTypes.instanceOf(Immutable.Map).isRequired,
    displayOptions: PropTypes.instanceOf(Immutable.List),
    numPortions: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
    orderId: PropTypes.string,
    promoCode: PropTypes.string,
    okRecipeIds: PropTypes.instanceOf(Immutable.Map).isRequired,
    recipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
    slotId: PropTypes.string,
    view: PropTypes.string,
    menuFetchPending: PropTypes.bool,
    orderSaveError: PropTypes.string,
    pricingPending: PropTypes.bool,
    prices: PropTypes.instanceOf(Immutable.Map),
    unavailableRecipeIds: PropTypes.instanceOf(Immutable.Map),
    showRecipeDetailsOnClick: PropTypes.func,
    shouldDisplayFullScreenBoxSummary: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    view: 'desktop',
    accessToken: '',
    displayOptions: Immutable.List([]),
    prices: Immutable.Map({}),
    pricingPending: false,
    showRecipeDetailsOnClick: () => { },
  }

  getCtaText = (numRecipes) => {
    const { maxRecipesNum, minRecipesNum } = config.basket
    let text = ''

    if (numRecipes < maxRecipesNum) {
      text = 'Choose more recipes'
      if (numRecipes < minRecipesNum) {
        text = 'Choose recipes'
      }
    }

    return text
  }

  renderPortions = ({ basketNumPortionChange, numPortions, orderId, portionSizeSelectedTracking }) => (
    <div className={css.row}>
      <Portions
        numPortions={numPortions}
        onNumPortionChange={basketNumPortionChange}
        trackNumPortionChange={portionSizeSelectedTracking}
        orderId={orderId}
      />
    </div>
  )

  renderPromoCodeMessage = () => {
    const { accessToken, displayOptions, promoCode } = this.props

    if (accessToken || displayOptions.contains(HIDE_PROMO_CODE_TEXT) || promoCode) {
      return null
    }

    return <p className={css.supportingText}>You can enter promo codes later.</p>
  }

  render() {
    const {
      displayOptions,
      numPortions,
      pricingPending,
      prices,
      okRecipeIds,
      view,
      orderId,
      date,
      clearSlot,
      boxSummaryVisibilityChange,
      deliveryDays,
      slotId,
      shouldDisplayFullScreenBoxSummary,
    } = this.props
    const numRecipes = basketSum(okRecipeIds)
    const ctaText = this.getCtaText(numRecipes)
    const showSecondCta = (numRecipes > 1 && numRecipes < 4) && shouldDisplayFullScreenBoxSummary
    const displayCta = !displayOptions.contains(HIDE_CHOOSE_RECIPES_CTA) && ctaText && !showSecondCta
    let btnClassName = css.ctaButton
    let contentClass = css.content
    if (shouldDisplayFullScreenBoxSummary) {
      btnClassName = css.stickyButton
      contentClass = css.marginBottom
    }

    return (
      <div className={css[`supercontainer${view}`]}>
        <div className={css[`container${view}`]}>
          <div className={contentClass}>
            <LayoutContentWrapper>
              <Heading center size="large" type="h2">Box Summary</Heading>
              <DateHeader
                orderId={orderId}
                date={date}
                clearSlot={clearSlot}
                deliveryDays={deliveryDays}
                slotId={slotId}
              />
              {
                !displayOptions.contains(HIDE_PORTIONS)
                && this.renderPortions(this.props)
              }
            </LayoutContentWrapper>
            <LayoutContentWrapper>
              <p className={css.titleSection}>Recipe Box</p>
              {
                numRecipes === 0
                && <p>Add up to 4 recipes to create your Gousto box. The more you add, the lower the price per portion.</p>
              }
            </LayoutContentWrapper>
            {
              !displayOptions.contains(HIDE_RECIPE_LIST)
              && <RecipeList {...this.props} />
            }
            <LayoutContentWrapper>
              <BoxProgressAlert numRecipes={numRecipes} />
              {showSecondCta && (
                <Button
                  color="secondary"
                  onClick={() => { boxSummaryVisibilityChange(false) }}
                  width="full"
                >
                  {ctaText}
                </Button>
              )}
              {
                (pricingPending)
                  ? <div className={css.spinner}><Spinner color="black" /></div>
                  : (
                    <div>
                      <Receipt
                        dashPricing={numRecipes < config.basket.minRecipesNum}
                        numRecipes={numRecipes}
                        numPortions={numPortions}
                        prices={prices}
                        deliveryTotalPrice={prices.get('deliveryTotal')}
                        surcharges={getSurchargeItems(prices.get('items'))}
                        surchargeTotal={prices.get('surchargeTotal')}
                        recipeTotalPrice={prices.get('recipeTotal')}
                        totalToPay={prices.get('total')}
                        recipeDiscountAmount={prices.get('recipeDiscount')}
                        recipeDiscountPercent={prices.get('percentageOff')}
                        extrasTotalPrice={prices.get('productTotal')}
                        showTitleSection
                      />
                      <UserCreditMessage />
                    </div>
                  )
              }
              {this.renderPromoCodeMessage()}
              <div className={btnClassName}>
                {
                  displayCta ? (
                    <Button
                      onClick={() => { boxSummaryVisibilityChange(false) }}
                      width="full"
                    >
                      {ctaText}
                    </Button>
                  )
                    : <CheckoutContainer view={view} />
                }
              </div>
            </LayoutContentWrapper>
          </div>
        </div>
      </div>
    )
  }
}

export default Details
