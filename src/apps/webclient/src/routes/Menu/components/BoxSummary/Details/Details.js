import React from 'react'

import { Button, Heading, LayoutContentWrapper, Spinner } from 'goustouicomponents'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { Receipt } from 'components/Receipt'
import { UserCreditMessage } from 'components/UserCreditMessage'
import { basketSum } from 'utils/basket'
import { getSurchargeItems } from 'utils/pricing'

import { BoxProgressAlert } from './BoxProgressAlert'
import { DateHeader } from './DateHeader'
import { DetailsCheckoutButton } from './DetailsCheckoutButton'
import { Portions } from './Portions'
import { RecipeList } from './RecipeList'
import {
  HIDE_CHOOSE_RECIPES_CTA,
  HIDE_RECIPE_LIST,
  HIDE_PORTIONS,
  HIDE_PROMO_CODE_TEXT,
} from './displayOptionsProps'

import css from './Details.css'

class Details extends React.Component {
  getCtaText = (numRecipes, maxRecipesNum, minRecipesNum) => {
    let text = ''

    if (numRecipes < maxRecipesNum) {
      text = 'Choose more recipes'
      if (numRecipes < minRecipesNum) {
        text = 'Choose recipes'
      }
    }

    return text
  }

  validatePortionChange = (numPortions) => {
    const {
      basketNumPortionChange,
      isPortionSizeAllowedByRecipeCount,
      okRecipeIds,
      portionChangeErrorModalHandler,
      maxRecipesForPortion,
    } = this.props
    const numRecipes = basketSum(okRecipeIds)

    if (!isPortionSizeAllowedByRecipeCount(numRecipes, numPortions)) {
      portionChangeErrorModalHandler(true, maxRecipesForPortion(numPortions))

      return
    }

    basketNumPortionChange(numPortions)
  }

  renderPortions = ({ numPortions, orderId, portionSizeSelectedTracking }) => (
    <div className={css.row}>
      <Portions
        numPortions={numPortions}
        onNumPortionChange={this.validatePortionChange}
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
      maxRecipesForPortion,
      minRecipesForPortion,
    } = this.props

    const {
      deliveryTotal,
      items,
      surchargeTotal,
      recipeTotal,
      total,
      recipeDiscount,
      percentageOff,
      productTotal,
    } = prices || {}

    const numRecipes = basketSum(okRecipeIds)
    const maxRecipesNum = maxRecipesForPortion(numPortions)
    const minRecipesNum = minRecipesForPortion(numPortions)
    const ctaText = this.getCtaText(numRecipes, maxRecipesNum, minRecipesNum)
    const showSecondCta = numRecipes > 1 && numRecipes < 4 && shouldDisplayFullScreenBoxSummary
    const displayCta =
      !displayOptions.contains(HIDE_CHOOSE_RECIPES_CTA) && ctaText && !showSecondCta
    let btnClassName = css.ctaButton
    if (shouldDisplayFullScreenBoxSummary) {
      btnClassName = css.stickyButton
    }

    return (
      <React.Fragment>
        <LayoutContentWrapper>
          <Heading isCenter size="_legacy_large" type="h2">
            Box Summary
          </Heading>
          <DateHeader
            orderId={orderId}
            date={date}
            clearSlot={clearSlot}
            deliveryDays={deliveryDays}
            slotId={slotId}
          />
          {!displayOptions.contains(HIDE_PORTIONS) && this.renderPortions(this.props)}
        </LayoutContentWrapper>
        <LayoutContentWrapper>
          <p className={css.titleSection}>Recipe Box</p>
          {numRecipes === 0 && (
            <p>
              Add up to {maxRecipesNum} recipes to create your Gousto box. The more you add, the
              lower the price per portion.
            </p>
          )}
        </LayoutContentWrapper>
        {
          // eslint-disable-next-line react/jsx-props-no-spreading
          !displayOptions.contains(HIDE_RECIPE_LIST) && <RecipeList {...this.props} />
        }
        <LayoutContentWrapper>
          <BoxProgressAlert numRecipes={numRecipes} />
          {showSecondCta && (
            <Button
              color="secondary"
              onClick={() => {
                boxSummaryVisibilityChange(false)
              }}
              width="full"
            >
              {ctaText}
            </Button>
          )}
          {pricingPending ? (
            <div className={css.spinner}>
              <Spinner color="black" />
            </div>
          ) : (
            <div>
              <Receipt
                dashPricing={numRecipes < minRecipesNum}
                numRecipes={numRecipes}
                numPortions={numPortions}
                prices={prices}
                deliveryTotalPrice={deliveryTotal}
                surcharges={getSurchargeItems(items)}
                surchargeTotal={surchargeTotal}
                recipeTotalPrice={recipeTotal}
                totalToPay={total}
                recipeDiscountAmount={recipeDiscount}
                recipeDiscountPercent={percentageOff}
                extrasTotalPrice={productTotal}
                showTitleSection
              />
              <UserCreditMessage />
            </div>
          )}
          {this.renderPromoCodeMessage()}
          <DetailsCheckoutButton
            btnClassName={btnClassName}
            displayCta={displayCta}
            ctaText={ctaText}
            view={view}
            onClick={() => {
              boxSummaryVisibilityChange(false)
            }}
          />
        </LayoutContentWrapper>
      </React.Fragment>
    )
  }
}

Details.propTypes = {
  accessToken: PropTypes.string,
  portionChangeErrorModalHandler: PropTypes.func.isRequired,
  maxRecipesForPortion: PropTypes.func.isRequired,
  minRecipesForPortion: PropTypes.func.isRequired,
  basketNumPortionChange: PropTypes.func.isRequired,
  portionSizeSelectedTracking: PropTypes.func.isRequired,
  isPortionSizeAllowedByRecipeCount: PropTypes.func.isRequired,
  basketRestorePreviousDate: PropTypes.func.isRequired,
  boxSummaryVisibilityChange: PropTypes.func.isRequired,
  clearSlot: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  deliveryDays: PropTypes.instanceOf(Immutable.Map).isRequired,
  displayOptions: PropTypes.instanceOf(Immutable.List),
  numPortions: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
  promoCode: PropTypes.string,
  okRecipeIds: PropTypes.instanceOf(Immutable.Map).isRequired,
  recipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  slotId: PropTypes.string,
  view: PropTypes.string,
  menuFetchPending: PropTypes.bool.isRequired,
  orderSaveError: PropTypes.string,
  pricingPending: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  prices: PropTypes.object,
  unavailableRecipeIds: PropTypes.instanceOf(Immutable.Map).isRequired,
  showRecipeDetailsOnClick: PropTypes.func,
  shouldDisplayFullScreenBoxSummary: PropTypes.bool.isRequired,
}

Details.defaultProps = {
  view: 'desktop',
  accessToken: '',
  displayOptions: Immutable.List([]),
  prices: {},
  pricingPending: false,
  showRecipeDetailsOnClick: () => {},
  promoCode: null,
  slotId: null,
  orderSaveError: null,
}

export { Details }
