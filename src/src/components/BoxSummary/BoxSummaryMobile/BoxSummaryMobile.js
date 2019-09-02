import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable' // eslint-disable no-caps

import config from 'config/basket'
import Overlay from 'Overlay'
import Title from 'BoxSummary/Title'
import { Tooltip } from 'goustouicomponents'
import BoxSummary from 'BoxSummary'
import BoxSummaryButton from 'BoxSummary/BoxSummaryButton'
import RecipeList from 'BoxSummary/RecipeList'
import { getBoundingClientRect } from 'utils/DOMhelper'
import boxSummaryButtonCss from 'BoxSummary/BoxSummaryButton/BoxSummaryButton.css'
import { ShortlistTutorial } from 'routes/Menu/ShortlistTutorial'
import css from './BoxSummaryMobile.css'
import BrowseCTA from '../BrowseCTA'
import BrowseCTAButton from '../BrowseCTAButton'

class BoxSummaryMobile extends React.PureComponent {
  static propTypes = {
    date: PropTypes.string,
    deliveryDays: PropTypes.instanceOf(Immutable.Map),
    menuRecipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
    numPortions: PropTypes.number.isRequired,
    recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
    showDetails: PropTypes.bool.isRequired,
    boxDetailsVisibilityChange: PropTypes.func.isRequired,
    basketRestorePreviousValues: PropTypes.func.isRequired,
    slotId: PropTypes.string,
    orderId: PropTypes.string,
    menuRecipes: PropTypes.instanceOf(Immutable.List).isRequired,
    stock: PropTypes.instanceOf(Immutable.Map).isRequired,
    boxSummaryCurrentView: PropTypes.string,
    basketCheckedOut: PropTypes.bool,
    disabled: PropTypes.bool.isRequired,
    hasUnavailableRecipes: PropTypes.bool,
    orderSaveError: PropTypes.string,
    boxSummaryNext: PropTypes.func.isRequired,
    displayOptions: PropTypes.instanceOf(Immutable.List),
    maxRecipesNum: PropTypes.number,
    shortlistTutorialStep2Show: PropTypes.bool,
    incrementTutorialViewed: PropTypes.func,
    tutorialTracking: PropTypes.func,
  }

  static defaultProps = {
    deliveryDays: Immutable.fromJS({}),
    displayOptions: Immutable.fromJS([]),
    maxRecipesNum: config.maxRecipesNum,
    basketCheckedOut: false,
    incrementTutorialViewed: () => { },
    tutorialTracking: () => { },
  }

  state = {
    hideTooltip: false,
  }

  componentDidMount() {
    if (getBoundingClientRect(this.ref).width > 0 && this.props.hasUnavailableRecipes && this.props.orderSaveError === 'no-stock') {
      this.props.boxDetailsVisibilityChange(true, 'mobile')
    }
    if (this.tooltipError()) {
      this.hideTooltipDelay = setTimeout(() => {
        if (!this.state.hideTooltip) {
          this.setState({
            hideTooltip: true,
          })
        }
      }, 15000)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showDetails && !this.props.showDetails) {
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
    const showTooltip = Boolean(this.props.orderSaveError) && this.props.orderSaveError !== 'no-stock'

    if (!showTooltip) {
      return false
    }

    if (this.state.hideTooltip) {
      return false
    }

    switch (this.props.orderSaveError) {
    case 'basket-expired':
      return 'Sorry, your box has expired. Please re-add your recipe choices to continue.'
    default:
      return 'Sorry, there has been an issue saving your order. Please try again or contact customer care.'
    }
  }

  openMobile = () => {
    this.props.boxDetailsVisibilityChange(true, 'mobile')
  }

  closeMobile = () => {
    this.props.basketRestorePreviousValues()
    this.props.boxDetailsVisibilityChange(false, 'mobile')
  }

  closeTutorialStep2 = () => {
    const { incrementTutorialViewed, tutorialTracking } = this.props
    const tutorialName = 'shortlistStep2'
    incrementTutorialViewed(tutorialName)
    tutorialTracking(tutorialName, 1, true)
  }

  handleMobileClick = (e) => {
    const { shortlistTutorialStep2Show } = this.props
    if (e.target && e.target.className.indexOf(boxSummaryButtonCss.submitButton) === -1) {
      this.openMobile()
      if (shortlistTutorialStep2Show) {
        this.closeTutorialStep2()
      }
    }
  }

  renderErrorTooltip(children, key) {
    const tootlError = this.tooltipError()

    return (
      <Tooltip
        key={key}
        message={tootlError}
        visible={Boolean(tootlError)}
        style="button"
        overlayClassName={css.errorTooltipMobile}
        className={css.errorMessage}
      >
        {children}
      </Tooltip>
    )
  }

  renderBrowseCTA = () => (
    [
      this.renderErrorTooltip(
        <BrowseCTAButton view="mobile" fullWidth={this.props.displayOptions.includes('hideRecipeList')} key={0} />, 3
      ),
      <BrowseCTA view="mobile" key={1} />,
    ]
  )

  renderButton = () => (
    this.renderErrorTooltip(
      <BoxSummaryButton
        view="mobile"
        fullWidth={this.props.displayOptions.includes('hideRecipeList')}
        recipes={this.props.recipes}
        showDetails={this.props.showDetails}
        open={this.openMobile}
        boxSummaryCurrentView={this.props.boxSummaryCurrentView}
        checkoutPending={this.props.basketCheckedOut}
        menuRecipes={this.props.menuRecipes}
        stock={this.props.stock}
        numPortions={this.props.numPortions}
        boxSummaryNext={this.props.boxSummaryNext}
      />, 4
    )
  )

  renderBanner = () => {
    const { date, disabled, displayOptions, maxRecipesNum, menuRecipesStore, recipes, showDetails, shortlistTutorialStep2Show } = this.props
    const iconClass = showDetails ? css.arrowDown : css.arrowUp

    return (
      <div className={css.barmobile} ref={(element) => { this.ref = element }}>
        <div onClick={this.handleMobileClick}>
          <div className={css.iconMobile}>
            <span className={iconClass} data-slug="box-summary-mobile" />{shortlistTutorialStep2Show && <ShortlistTutorial />}
          </div>
          <Title view="mobile" date={date} finalisedSlot={this.props.slotId !== ''} />
        </div>
        <div className={css.summaryMobile}>
          {!displayOptions.includes('hideRecipeList') && <RecipeList view="mobile" recipes={recipes} menuRecipesStore={menuRecipesStore} maxRecipesNum={maxRecipesNum} />}
          {((date === '' || disabled) && !showDetails) ? this.renderBrowseCTA() : this.renderButton()}
        </div>
      </div>
    )
  }

  renderOverlay = () => (
    <Overlay open={this.props.showDetails} className={css.mobileOverlay} contentClassName={css.mobileModalContent} from="bottom">
      <div className={css.supercontainermobile}>
        <div className={css.detailContainermobile} data-testing="boxSummaryMobile">
          <div className={css.closeBtn} onClick={this.closeMobile}></div>
          <BoxSummary
            displayOptions={this.props.displayOptions}
            recipes={this.props.recipes}
            date={this.props.date}
            showDetails={this.props.showDetails}
            boxDetailsVisibilityChange={visible => this.props.boxDetailsVisibilityChange(visible, 'mobile')}
            view="mobile"
            menuRecipes={this.props.menuRecipes}
            stock={this.props.stock}
            numPortions={this.props.numPortions}
            shouldShowDetailsOnClick
          />
        </div>
      </div>
    </Overlay>
  )

  render() {
    return (
      <div className={css.mobile}>
        {this.renderBanner()}
        {this.renderOverlay()}
      </div>
    )
  }
}

export default BoxSummaryMobile
