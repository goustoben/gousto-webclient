import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import { forceCheck as forceCheckLazyload } from 'react-lazyload'

import menu from 'config/menu'
import browserHelper from 'utils/browserHelper'

import MainLayout from 'layouts/MainLayout'
import { CapacityInfo } from './components/CapacityInfo'
import { BoxSummaryContainer } from './BoxSummary'
import { RecipeMeta } from './RecipeMeta'
import { RecipesInBasketProgress } from './RecipesInBasketProgress'
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
    this.setState({
      // eslint-disable-line react/no-did-mount-set-state
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
      menuCalculateTimeToUsable,
    } = this.props

    const { store } = this.context

    const forceDataLoad = Boolean(query.reload)
    // TODO: Add back logic to check what needs to be reloaded

    if (query && query.num_portions) {
      basketNumPortionChange(query.num_portions)
    }

    await Menu.fetchData({ store, query, params }, forceDataLoad)

    const promises = []

    if (boxSummaryDeliveryDays.size === 0 && !disabled) {
      promises.push(
        menuLoadDays().then(() => {
          boxSummaryDeliveryDaysLoad()
        })
      )
    }

    if (!disabled && !menuLoadingBoxPrices) {
      promises.push(menuLoadBoxPrices())
    }

    promises.push(shouldJfyTutorialBeVisible())
    await Promise.all(promises)
    menuCalculateTimeToUsable()
  }

  componentWillReceiveProps(nextProps) {
    const { menuLoadBoxPrices, tariffId } = this.props

    if (!nextProps.disabled && !nextProps.menuLoadingBoxPrices && tariffId !== nextProps.tariffId) {
      menuLoadBoxPrices()
    }
  }

  componentDidUpdate(prevProps) {
    const { params, query, isAuthenticated } = this.props
    const { store } = this.context
    const isAdminQuery = !!(query && query['preview[auth_user_id]'])
    if (!isAdminQuery && prevProps.isAuthenticated !== isAuthenticated) {
      Menu.fetchData({ store, query, params }, false)
    }
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
      children,
      userHasAvailableSlots,
      userId,
      userOrderLoadingState,
    } = this.props
    const { isChrome } = this.state

    const overlayShowCSS = (showOverlay && isChrome) ? css.blur : null
    if (userHasAvailableSlots === false && (userOrderLoadingState === false || isAuthenticated === false)) {
      return (
        <MainLayout>
          <div data-testing="menuContainer">
            <Helmet
              title={menu.helmet.title}
              meta={menu.helmet.meta}
              style={menu.helmet.style}
            />
            <CapacityInfo userId={userId} />
          </div>
        </MainLayout>
      )
    }

    return (
      <MainLayout route={{ withRecipeBar: true }}>
        <div data-testing="menuContainer">
          <Helmet
            title={menu.helmet.title}
            meta={menu.helmet.meta}
            style={menu.helmet.style}
          />
          <RecipeMeta query={query} />
          <div className={classnames(css.container, overlayShowCSS)}>
            {children}
            <p className={css.legal}>{menu.legal}</p>
            <div
              className={showOverlay ? css.greyOverlayShow : css.greyOverlay}
              onClick={onOverlayClick}
            />
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
