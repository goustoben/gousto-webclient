import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import Immutable from 'immutable'
import { basketSum } from 'utils/basket'
import { getSlot } from 'utils/deliveries'
import { getSurchargeItems } from 'utils/pricing'
import { isAvailableRecipeList } from 'utils/recipe'

import config from 'config'
import { Button, Heading, LayoutContentWrapper, Segment, Spinner } from 'goustouicomponents'
import RecipeItem from 'Recipe/RecipeItem'
import ShortlistItem from 'Recipe/ShortlistItem'
import Receipt from 'Receipt'
import Portions from 'BoxSummary/Details/Portions'
import css from './Details.css'
import BoxProgressAlert from './BoxProgressAlert'

class Details extends React.Component {
  static propTypes = {
    accessToken: PropTypes.string,
    basketNumPortionChange: PropTypes.func.isRequired,
    portionSizeSelectedTracking: PropTypes.func.isRequired,
    basketRecipes: PropTypes.instanceOf(Immutable.Map).isRequired,
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
    shortlistFeatureEnabled: PropTypes.bool
  }

  static defaultProps = {
    view: 'desktop',
    accessToken: '',
    displayOptions: Immutable.List([]),
    prices: Immutable.Map({}),
    pricingPending: false,
    showRecipeDetailsOnClick: () => { },
    shortlistFeatureEnabled: false
  }

  getCtaText = (numRecipes) => {
    const { maxRecipesNum, minRecipesNum } = config.basket
    let text = ''

    if (numRecipes < maxRecipesNum) {
      if (numRecipes < minRecipesNum) {
        text = 'Choose Recipes'
      } else {
        text = 'Choose More Recipes'
      }
    }

    return text
  }

  slotTimes = () => {
    const { date, deliveryDays, slotId } = this.props
    const chosenSlot = getSlot(deliveryDays, date, slotId)
    let slotText = ''
    if (chosenSlot) {
      slotText = `${moment(`${date} ${chosenSlot.get('deliveryStartTime')}`).format('ha')} - ${moment(`${date} ${chosenSlot.get('deliveryEndTime')}`).format('ha')} `
    }

    return slotText
  }

  unavailableMessage = (plural, errorMsg) => {
    const { basketRestorePreviousDate, clearSlot } = this.props

    return (
      <span className={css.notAvailableText}>
        <span className={css.warningIcon}></span>
        The following {plural ? 'recipes are' : 'recipe is'} no longer available. Please choose {plural ? 'different recipes' : 'another recipe'}, or&nbsp;
        {
          errorMsg === 'no-stock'
            ? <a className={css.undoLink} onClick={clearSlot}>choose a later date</a>
            : <a className={css.undoLink} onClick={basketRestorePreviousDate}>undo your date change</a>
        }
      </span>
    )
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

  renderRecipeList = ({
    basketRecipes,
    menuFetchPending,
    numPortions,
    okRecipeIds,
    onRemove,
    orderSaveError,
    recipesStore,
    shortlistFeatureEnabled,
    showRecipeDetailsOnClick,
    unavailableRecipeIds,
  }) => {
    const okRecipeList = isAvailableRecipeList(okRecipeIds, recipesStore)
    const unavailableRecipeList = isAvailableRecipeList(unavailableRecipeIds, recipesStore)

    return (
      <div>
        <LayoutContentWrapper>
          <div className={css.recipeItems}>
            {okRecipeList.map(recipe => (
              <RecipeItem
                key={recipe.get('id')}
                available
                fromBox
                media={recipe.get('media')}
                numPortions={basketRecipes.get(recipe.get('id')) * numPortions}
                onImageClick={() => showRecipeDetailsOnClick(recipe.get('id'))}
                onRemove={() => onRemove(recipe.get('id'), 'boxsummary')}
                showShortlistButton={shortlistFeatureEnabled}
                recipeId={recipe.get('id')}
                title={recipe.get('title')}
              />
            )).toArray()}

            {(unavailableRecipeList.size > 0 && !menuFetchPending) && this.unavailableMessage(unavailableRecipeList.size > 1, orderSaveError)}

            {unavailableRecipeList.map(recipe => (
              <RecipeItem
                key={recipe.get('id')}
                available={menuFetchPending}
                media={recipe.get('media')}
                numPortions={basketRecipes.get(recipe.get('id')) * numPortions}
                onImageClick={() => showRecipeDetailsOnClick(recipe.get('id'))}
                onRemove={() => onRemove(recipe.get('id'), 'boxsummary')}
                title={recipe.get('title')}
              />
            )).toArray()}
          </div>
        </LayoutContentWrapper>
        {shortlistFeatureEnabled &&
          <ShortlistItem
            available
            numPortions={numPortions}
            onImageClick={showRecipeDetailsOnClick}
          />
        }
      </div>
    )
  }

  renderDateHeader = () => {
    const {
      orderId,
      date,
      clearSlot
    } = this.props

    if (orderId) {
      return (
        <div className={css.row}>
          <p className={css.deliverySlotText}>
            Edit recipes for your upcoming box. To change date or cancel box, visit &apos;My Deliveries&apos;
          </p>
          <p className={css.dateText}>{`${moment(date).format('ddd Do MMM')}, ${this.slotTimes()}`}</p>
        </div>
      )
    }
    const text = `${moment(date).format('ddd Do MMM')}, ${this.slotTimes()}`

    return (
      <div className={css.rowSMMargin}>
        <Button fill={false} width="full">
          <Segment onClick={clearSlot} fill={false}>
            <span className={text.length > 21 ? css.limitedLengthPadding : css.limitedLength}>{text}</span>
            <span className={css.clear}>
              <span className={css.clearIcon}></span>
              edit
            </span>
          </Segment>
        </Button>
      </div>
    )
  }

  renderPromoCodeMessage = () => {
    const { accessToken, displayOptions, promoCode } = this.props

    if (accessToken || displayOptions.contains('hidePromoCodeText')) {
      return null
    }

    return !promoCode && <p className={css.supportingText}>You can enter promo codes later.</p>
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
      accessToken,
      promoCode,
      boxSummaryVisibilityChange,
    } = this.props
    const numRecipes = basketSum(okRecipeIds)
    const ctaText = this.getCtaText(numRecipes)
    const displayCta = !displayOptions.contains('hideChooseRecipesCta') && ctaText

    return (
      <div className={css[`supercontainer${view}`]}>
        <div className={css[`container${view}`]}>
          <div className={css.content}>
            <LayoutContentWrapper>
              <Heading center size="large" type="h2">Box Summary</Heading>
              {(() => {
                if (orderId) {
                  return (
                    <div className={css.row}>
                      <p className={css.deliverySlotText}>
                        Edit recipes for your upcoming box. To change date or cancel box, visit &apos;My Deliveries&apos;
                      </p>
                      <p className={css.dateText}>{`${moment(date).format('ddd Do MMM')}, ${this.slotTimes()}`}</p>
                    </div>
                  )
                }
                const text = `${moment(date).format('ddd Do MMM')}, ${this.slotTimes()}`

                return (
                  <div className={css.rowSMMargin}>
                    <Button fill={false} width="full">
                      <Segment onClick={clearSlot} fill={false}>
                        <span className={text.length > 21 ? css.limitedLengthPadding : css.limitedLength}>{text}</span>
                        <span className={css.clear}>
                          <span className={css.clearIcon}></span>
                          edit
                        </span>
                      </Segment>
                    </Button>
                  </div>
                )
              })()}
              {
                !displayOptions.contains('hidePortions') &&
                this.renderPortions(this.props)
              }
            </LayoutContentWrapper>
            <LayoutContentWrapper>
              <p className={css.titleSection}>Recipe Box</p>
            </LayoutContentWrapper>
            {
              !displayOptions.contains('hideRecipeList') &&
              this.renderRecipeList(this.props)
            }
            <LayoutContentWrapper>
              <BoxProgressAlert numRecipes={numRecipes} />
              {
                (pricingPending)
                  ? <div className={css.spinner}><Spinner color="black" /></div>
                  : <Receipt
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
              }

              {(() => {
                if (accessToken || displayOptions.contains('hidePromoCodeText')) {
                  return null
                }

                return !promoCode &&
                  <p className={css.supportingText}>You can enter promo codes later.</p>
              })()}

              {
                displayCta &&
                <Button
                  onClick={() => { boxSummaryVisibilityChange(false) }}
                  width="full"
                >
                  {ctaText}
                </Button>
              }
            </LayoutContentWrapper>
          </div>
        </div>
      </div>
    )
  }
}

export default Details
