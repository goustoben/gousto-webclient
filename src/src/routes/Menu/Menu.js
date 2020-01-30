import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import { forceCheck as forceCheckLazyload } from 'react-lazyload'

import menu from 'config/menu'
import browserHelper from 'utils/browserHelper'

import { getMenuService } from 'selectors/features'
import MainLayout from 'layouts/MainLayout'
import { BoxSummaryContainer } from './BoxSummary'
import { RecipeMeta } from './RecipeMeta'
import { RecipesInBasketProgress } from './RecipesInBasketProgress'
import { JustForYouTutorial } from './JustForYouTutorial'
import { menuPropTypes, defaultMenuPropTypes } from './menuPropTypes'

import fetchData from './fetchData'
import css from './Menu.css'

class Menu extends React.PureComponent {
  static propTypes = menuPropTypes

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static defaultProps = defaultMenuPropTypes

  static fetchData(args, force) {
    return fetchData(args, force)
  }

  state = {
    isChrome: false,
  }

  async componentDidMount() {
    this.setState({ // eslint-disable-line react/no-did-mount-set-state
      isChrome: browserHelper.isChrome(),
    })

    const {
      params,
      query,
      basketNumPortionChange,
      boxSummaryDeliveryDays,
      disabled,
      menuLoadDays,
      boxSummaryDeliveryDaysLoad,
      menuLoadingBoxPrices,
      menuLoadBoxPrices,
      shouldJfyTutorialBeVisible,
    } = this.props

    const { store } = this.context

    const useMenuService = getMenuService()

    const forceDataLoad = Boolean(query.reload)
    // TODO: Add back logic to check what needs to be reloaded

    if (query && query.num_portions) {
      basketNumPortionChange(query.num_portions)
    }

    if (useMenuService) {
      await Menu.fetchData({ store, query, params }, forceDataLoad)
    } else {
      Menu.fetchData({ store, query, params }, forceDataLoad)
    }

    if (boxSummaryDeliveryDays.size === 0 && !disabled) {
      menuLoadDays().then(() => {
        boxSummaryDeliveryDaysLoad()
      })
    }

    if (!disabled && !menuLoadingBoxPrices) {
      menuLoadBoxPrices()
    }

    shouldJfyTutorialBeVisible()
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, menuLoadBoxPrices, menuVariation, tariffId } = this.props

    // user login
    const justLoggedIn = !isAuthenticated && nextProps.isAuthenticated
    const variationChanged = menuVariation !== nextProps.menuVariation
    if (justLoggedIn || variationChanged) {
      const { store } = this.context
      const query = nextProps.query || {}
      const params = nextProps.params || {}
      Menu.fetchData({ store, query, params }, true)
    }

    if (!nextProps.disabled && !nextProps.menuLoadingBoxPrices && tariffId !== nextProps.tariffId) {
      menuLoadBoxPrices()
    }
  }

  async componentDidUpdate() {
    forceCheckLazyload()
  }

  componentWillUnmount() {
    const { loginVisibilityChange } = this.props
    loginVisibilityChange(false)
  }

  render() {
    const {
      onOverlayClick,
      showOverlay,
      isAuthenticated,
      query,
      recipesCount,
      children
    } = this.props
    const { isChrome } = this.state

    const overlayShowCSS = (showOverlay && isChrome) ? css.blur : null

    return (
      <MainLayout route={{ withRecipeBar: true }}>
        <div data-testing="menuContainer">
          <Helmet
            title={menu.helmet.title}
            meta={menu.helmet.meta}
            style={menu.helmet.style}
          />
          <RecipeMeta query={query} />
          <JustForYouTutorial />
          <div className={classnames(css.container, overlayShowCSS)}>
            {children}
            <div className={showOverlay ? css.greyOverlayShow : css.greyOverlay} onClick={onOverlayClick} />
          </div>
          <BoxSummaryContainer />
          <RecipesInBasketProgress
            isAuthenticated={isAuthenticated}
            selectedRecipesCount={recipesCount}
          />
        </div>
      </MainLayout>
    )
  }
}

export default Menu
