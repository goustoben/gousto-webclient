import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import { basketSum, okRecipes } from 'utils/basket'
import { EscapeKeyPressed } from 'utils/DOMEvents'
import { CheckoutErrorModal } from './CheckooutErrorModal/CheckoutErrorModal'
import css from './BoxSummary.css'
import { BoxSummaryOverlayContainer } from './BoxSummaryOverlay/BoxSummaryOverlayContainer'
import { BoxSummaryBanner } from './Banner/BoxSummaryBanner'

class BoxSummary extends React.PureComponent {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
    numPortions: PropTypes.number.isRequired,
    recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
    showDetails: PropTypes.bool.isRequired,
    boxDetailsVisibilityChange: PropTypes.func.isRequired,
    basketRestorePreviousValues: PropTypes.func.isRequired,
    menuRecipes: PropTypes.instanceOf(Immutable.List).isRequired,
    stock: PropTypes.instanceOf(Immutable.Map).isRequired,
    menuFetchPending: PropTypes.bool,
    hasUnavailableRecipes: PropTypes.bool,
    orderSaveError: PropTypes.string,
    pricingPending: PropTypes.bool,
    shouldShowBoxSummary: PropTypes.bool,
    shouldMenuBrowseCTAShow: PropTypes.bool,
  }

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    shouldShowBoxSummary: false,
    menuFetchPending: false,
    hasUnavailableRecipes: false,
    orderSaveError: null,
    pricingPending: false,
    shouldMenuBrowseCTAShow: false,
  }

  // eslint-disable-next-line react/state-in-constructor
  state = {
    hideTooltip: false,
  }

  componentDidMount() {
    const {
      hasUnavailableRecipes,
      orderSaveError,
      boxDetailsVisibilityChange,
      shouldShowBoxSummary,
    } = this.props

    window.document.addEventListener('click', this.handleClick, false)

    if ((hasUnavailableRecipes && orderSaveError === 'no-stock') || shouldShowBoxSummary) {
      boxDetailsVisibilityChange(true)
    }

    if (this.handleError().showTooltip) {
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
  }

  handleClick = (e) => {
    const { showDetails } = this.props
    if (showDetails && EscapeKeyPressed(e)) {
      this.close()
    }
  }

  /**
   * Show tooltip if there is orderSaveError, and it is 'basket-expired', display error modal popup otherwise.
   * @returns {{tooltipErrorText: string, showErrorModalPopup: boolean, showTooltip: boolean}}
   */
  handleError() {
    const { orderSaveError } = this.props
    const { hideTooltip } = this.state
    const hadOrderSaveError = Boolean(orderSaveError) && orderSaveError !== 'no-stock'
    const basketExpiredError = orderSaveError === 'basket-expired'
    const showTooltip = hadOrderSaveError && !hideTooltip && basketExpiredError
    const tooltipErrorText = basketExpiredError
      ? 'Sorry, your box has expired. Please re-add your recipe choices to continue'
      : undefined
    const showErrorModalPopup = hadOrderSaveError && tooltipErrorText === undefined

    return {
      showTooltip,
      tooltipErrorText,
      showErrorModalPopup,
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
    const { recipes, menuFetchPending, showDetails, isMobile, shouldMenuBrowseCTAShow } = this.props
    const numRecipes = this.numRecipes()
    const { tooltipErrorText, showErrorModalPopup } = this.handleError()

    return (
      <div className={css.boxSummary} data-testing="boxSummary">
        <CheckoutErrorModal shouldShow={showErrorModalPopup} />

        <BoxSummaryBanner
          numRecipes={numRecipes}
          expandWarning={!menuFetchPending && numRecipes !== basketSum(recipes)}
          onExpandClick={this.toggle}
          showBrowseCTA={shouldMenuBrowseCTAShow}
          errorText={tooltipErrorText}
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
