import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable' // eslint-disable no-caps

import config from 'config/basket'
import { basketSum, okRecipes } from 'utils/basket'

import css from './BoxSummary.css'
import { BoxSummaryOverlayContainer } from './BoxSummaryOverlay/BoxSummaryOverlayContainer'
import { BoxSummaryBanner } from './Banner/BoxSummaryBanner'

class BoxSummary extends React.PureComponent {
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
    disabled: PropTypes.bool.isRequired,
    menuFetchPending: PropTypes.bool,
    hasUnavailableRecipes: PropTypes.bool,
    orderSaveError: PropTypes.string,
    maxRecipesNum: PropTypes.number,
    pricingPending: PropTypes.bool,
    shouldShowTutorialStep2: PropTypes.bool,
    incrementTutorialViewed: PropTypes.func,
    tutorialTracking: PropTypes.func,
    deliveryDays: PropTypes.instanceOf(Immutable.Map),
    slotId: PropTypes.string,
  }

  static defaultProps = {
    deliveryDays: Immutable.fromJS([]),
    displayOptions: Immutable.fromJS([]),
    maxRecipesNum: config.maxRecipesNum,
    basketCheckedOut: false,
  }

  state = {
    hideTooltip: false,
  }

  componentDidMount() {
    const { hasUnavailableRecipes, orderSaveError, boxDetailsVisibilityChange } = this.props

    if (hasUnavailableRecipes && orderSaveError === 'no-stock') {
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

  componentWillReceiveProps(nextProps) {
    const { showDetails } = this.props

    if (nextProps.showDetails && !showDetails) {
      window.document.addEventListener('click', this.handleClick, false)
    } else if (!nextProps.showDetails) {
      window.document.removeEventListener('click', this.handleClick, false)
    }
  }

  componentWillUnmount() {
    if (this.hideTooltipDelay) {
      clearTimeout(this.hideTooltipDelay)
    }
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

  handleClick = (e) => {
    const { showDetails } = this.props
    if (showDetails && e.type === 'keyup' && e.keyCode && e.keyCode === 27) {
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

  render() {
    const {
      date,
      disabled,
      maxRecipesNum,
      menuRecipesStore,
      recipes,
      menuFetchPending,
      incrementTutorialViewed,
      tutorialTracking,
      shouldShowTutorialStep2,
      deliveryDays,
      slotId,
      showDetails,
      isMobile
    } = this.props
    const showBrowseCTA = (date === '' || disabled)
    const numRecipes = this.numRecipes()

    return (
      <div className={css.boxSummary} data-testing="boxSummary">
        <BoxSummaryBanner
          isMobile={isMobile}
          numRecipes={numRecipes}
          expandWarning={!menuFetchPending && numRecipes !== basketSum(recipes)}
          onExpandClick={this.toggle}
          incrementTutorialViewed={incrementTutorialViewed}
          tutorialTracking={tutorialTracking}
          shouldShowTutorialStep2={shouldShowTutorialStep2}
          date={date}
          deliveryDays={deliveryDays}
          slotId={slotId}
          showBrowseCTA={showBrowseCTA}
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

export default BoxSummary
