import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import config from 'config/basket'
import { basketSum, okRecipes } from 'utils/basket'

import Overlay from 'Overlay'
import css from './BoxSummary.css'
import { BoxSummaryOverlayContainer } from './BoxSummaryOverlay/BoxSummaryOverlayContainer'
import { BoxSummaryBanner } from './Banner/BoxSummaryBanner'
import { EscapeKeyPressed } from '../../../utils/DOMEvents'

class BoxSummary extends React.PureComponent {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
    date: PropTypes.string,
    numPortions: PropTypes.number.isRequired,
    recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
    menuRecipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
    showDetails: PropTypes.bool.isRequired,
    boxDetailsVisibilityChange: PropTypes.func.isRequired,
    basketRestorePreviousValues: PropTypes.func.isRequired,
    menuRecipes: PropTypes.instanceOf(Immutable.List).isRequired,
    stock: PropTypes.instanceOf(Immutable.Map).isRequired,
    menuFetchPending: PropTypes.bool,
    hasUnavailableRecipes: PropTypes.bool,
    orderSaveError: PropTypes.string,
    maxRecipesNum: PropTypes.number,
    pricingPending: PropTypes.bool,
    deliveryDays: PropTypes.instanceOf(Immutable.Map),
    slotId: PropTypes.string,
    shouldShowBoxSummary: PropTypes.bool,
    shouldMenuBrowseCTAShow: PropTypes.bool
  }

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    deliveryDays: Immutable.Map(),
    maxRecipesNum: config.maxRecipesNum,
    shouldShowBoxSummary: false,
    date: null,
    menuFetchPending: false,
    hasUnavailableRecipes: false,
    orderSaveError: null,
    pricingPending: false,
    slotId: null,
    shouldMenuBrowseCTAShow: false
  }

  // eslint-disable-next-line react/state-in-constructor
  state = {
    hideTooltip: false,
  }

  componentDidMount() {
    const { hasUnavailableRecipes, orderSaveError, boxDetailsVisibilityChange, shouldShowBoxSummary } = this.props

    window.document.addEventListener('click', this.handleClick, false)

    if ((hasUnavailableRecipes && orderSaveError === 'no-stock') || shouldShowBoxSummary) {
      boxDetailsVisibilityChange(true)
    }

    if (this.tooltipError()) {
      this.hideTooltipDelay = setTimeout(() => {
        const { hideTooltip } = this.state

        if (hideTooltip) {
          return
        }

        this.setState({
          hideTooltip: true,
        })
      }, 15000)
    }
  }

  componentWillUnmount() {
    const { boxDetailsVisibilityChange } = this.props

    window.document.removeEventListener('click', this.handleClick, false)

    if (this.hideTooltipDelay) {
      clearTimeout(this.hideTooltipDelay)
    }

    boxDetailsVisibilityChange(false)
    Overlay.forceCloseAll()
  }

  handleClick = (e) => {
    const { showDetails } = this.props
    if (showDetails && EscapeKeyPressed(e)) {
      this.close()
    }
  }

  open = () => {
    const { boxDetailsVisibilityChange } = this.props
    boxDetailsVisibilityChange(true)
  }

  close = () => {
    const { boxDetailsVisibilityChange, basketRestorePreviousValues } = this.props
    boxDetailsVisibilityChange(false)
    basketRestorePreviousValues()
  }

  toggle = () => {
    const { showDetails, pricingPending } = this.props
    const show = !showDetails && !pricingPending

    if (show) {
      this.open()
    } else {
      this.close()
    }
  }

  numRecipes = () => {
    const { recipes, menuRecipes, stock, numPortions } = this.props

    return basketSum(okRecipes(recipes, menuRecipes, stock, numPortions))
  }

  tooltipError() {
    const { orderSaveError } = this.props
    const showTooltip = Boolean(orderSaveError) && orderSaveError !== 'no-stock'

    if (!showTooltip) {
      return false
    }

    const { hideTooltip } = this.state

    if (hideTooltip) {
      return false
    }

    if (orderSaveError === 'basket-expired') {
      return 'Sorry, your box has expired. Please re-add your recipe choices to continue.'
    }

    return 'Sorry, there has been an issue saving your order. Please try again or contact customer care.'
  }

  render() {
    const {
      date,
      maxRecipesNum,
      menuRecipesStore,
      recipes,
      menuFetchPending,
      deliveryDays,
      slotId,
      showDetails,
      isMobile,
      shouldMenuBrowseCTAShow
    } = this.props
    const numRecipes = this.numRecipes()

    return (
      <div className={css.boxSummary} data-testing="boxSummary">
        <BoxSummaryBanner
          numRecipes={numRecipes}
          expandWarning={!menuFetchPending && numRecipes !== basketSum(recipes)}
          onExpandClick={this.toggle}
          date={date}
          deliveryDays={deliveryDays}
          slotId={slotId}
          showBrowseCTA={shouldMenuBrowseCTAShow}
          maxRecipesNum={maxRecipesNum}
          menuRecipesStore={menuRecipesStore}
          recipes={recipes}
          errorText={this.tooltipError()}
          openDetails={this.open}
        />
        <BoxSummaryOverlayContainer
          isMobile={isMobile}
          onCloseClick={this.close}
          onToggleVisibility={this.toggle}
          showDetails={showDetails}
        />
      </div>
    )
  }
}

// eslint-disable-next-line import/no-default-export
export default BoxSummary
