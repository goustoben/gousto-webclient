import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import Immutable from 'immutable'
import { basketSum } from 'utils/basket'
import { getSlot } from 'utils/deliveries'
import { getSurchargeItems } from 'utils/pricing'

import config from 'config'
import { Button, Segment, Spinner } from 'goustouicomponents'
import RecipeItem from 'Recipe/RecipeItem'
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
  }

  static defaultProps = {
    view: 'desktop',
    accessToken: '',
    displayOptions: Immutable.List([]),
    prices: Immutable.Map({}),
    pricingPending: false,
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

  recipeList = (recipeIds) => {
    const { recipesStore } = this.props

    return recipeIds.map((obj, id) => recipesStore.get(id)).filter(recipe => Boolean(recipe))
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

  render() {
    const {
      displayOptions,
      numPortions,
      pricingPending,
      prices,
      basketRecipes,
      okRecipeIds,
      view,
      orderId,
      date,
      clearSlot,
      basketNumPortionChange,
      portionSizeSelectedTracking,
      onRemove,
      menuFetchPending,
      orderSaveError,
      accessToken,
      promoCode,
      boxSummaryVisibilityChange,
      unavailableRecipeIds,
    } = this.props
    const okRecipeList = this.recipeList(okRecipeIds)
    const unavailableRecipeList = this.recipeList(unavailableRecipeIds)
    const numRecipes = basketSum(okRecipeIds)
    const ctaText = this.getCtaText(numRecipes)
    const displayCta = !displayOptions.contains('hideChooseRecipesCta') && ctaText

    return (
      <div className={css[`supercontainer${view}`]}>
        <div className={css[`container${view}`]}>
          <div className={css.content}>
            <div className={css.row}>
              <p className={css.title}>Box Summary</p>
            </div>
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
              displayOptions.contains('hidePortions')
                ? null
                : (<div className={css.row}>
                    <Portions
                      numPortions={numPortions}
                      onNumPortionChange={basketNumPortionChange}
                      trackNumPortionChange={portionSizeSelectedTracking}
                      orderId={orderId}
                    />
                   </div>
                )
            }
            <div className={css.row}>
              <p className={css.titleSection}>Recipe Box</p>
            </div>
            {
              displayOptions.contains('hideRecipeList')
                ? null
                : (<div className={css.recipeItems}>
                  {okRecipeList.map(recipe => (
                    <RecipeItem
                      key={recipe.get('id')}
                      media={recipe.get('media')}
                      title={recipe.get('title')}
                      numPortions={basketRecipes.get(recipe.get('id')) * numPortions}
                      onRemove={() => onRemove(recipe.get('id'), 'boxsummary')}
                      available
                      showLine
                    />
                  )).toArray()}
                  <span className={!menuFetchPending ? css.notAvailable : ''}>
                    {(unavailableRecipeList.size > 0 && !menuFetchPending) ? this.unavailableMessage(unavailableRecipeList.size > 1, orderSaveError) : null}
                    {unavailableRecipeList.map(recipe => (
                      <RecipeItem
                        key={recipe.get('id')}
                        media={recipe.get('media')}
                        title={recipe.get('title')}
                        numPortions={basketRecipes.get(recipe.get('id')) * numPortions}
                        onRemove={() => onRemove(recipe.get('id'), 'boxsummary')}
                        available={menuFetchPending}
                        showLine
                      />
                    )).toArray()}
                  </span>
                   </div>)
            }

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

              return !promoCode
                ? <p className={css.supportingText}>You can enter promo codes later.</p>
                : null
            })()}

            {displayCta ? (
              <Button
                onClick={() => { boxSummaryVisibilityChange(false) }}
                width="full"
              >
                {ctaText}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Details
