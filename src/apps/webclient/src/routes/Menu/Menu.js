import React from 'react'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import { forceCheck as forceCheckLazyload } from 'react-lazyload'

import menu from 'config/menu'
import browserHelper from 'utils/browserHelper'

import MainLayout from 'layouts/MainLayout'
import ErrorPage from 'components/ErrorPage'
import { RecipesInBasketProgress } from './components/RecipesInBasketProgress'
import { BoxSummaryContainer } from './components/BoxSummary'
import { DetailRecipeMetaContainer } from './components/RecipeMeta'
import { menuPropTypes, defaultMenuPropTypes } from './menuPropTypes'

import css from './Menu.css'

class Menu extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isChrome: false,
    }
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
      menuCalculateTimeToUsable,
      fetchData,
      applyPromoCodeAndShowModal
    } = this.props

    const forceDataLoad = Boolean(query.reload)
    // TODO: Add back logic to check what needs to be reloaded

    if (query && query.num_portions) {
      basketNumPortionChange(query.num_portions)
    }

    await fetchData({ query, params }, forceDataLoad)

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

    const { orderId } = params
    if (!orderId) {
      promises.push(applyPromoCodeAndShowModal())
    }

    await Promise.all(promises)
    menuCalculateTimeToUsable()
  }

  componentDidUpdate(prevProps) {
    const { menuLoadBoxPrices, tariffId, params, query, isAuthenticated, fetchData, disabled, menuLoadingBoxPrices } = this.props
    const isAdminQuery = !!(query && query['preview[auth_user_id]'])

    if (!disabled && !menuLoadingBoxPrices && prevProps.tariffId !== tariffId) {
      menuLoadBoxPrices()
    }
    if (!isAdminQuery && prevProps.isAuthenticated !== isAuthenticated) {
      fetchData({ query, params }, false)
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
      children,
      isActionBarRedesignEnabled,
      params,
    } = this.props

    const { isChrome } = this.state
    const overlayShowCSS = (showOverlay && isChrome) ? css.blur : null

    const { orderId } = params

    if (!isAuthenticated && orderId) {
      return (
        <MainLayout>
          <ErrorPage />
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
          <DetailRecipeMetaContainer query={query} />
          <div className={classnames(css.container, overlayShowCSS)}>
            {children}
            <p className={css.legal}>{menu.legal}</p>
            {
              // overlay cannot be focused with keyboard, so it makes no sense
              // to add keyboard handling for it
            }
            {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
              className={showOverlay ? css.greyOverlayShow : css.greyOverlay}
              onClick={onOverlayClick}
            />
          </div>
          <BoxSummaryContainer />
          {isActionBarRedesignEnabled ? null : (
            <RecipesInBasketProgress isAuthenticated={isAuthenticated} />
          )}
        </div>
      </MainLayout>
    )
  }
}
Menu.propTypes = menuPropTypes
Menu.defaultProps = defaultMenuPropTypes

export default Menu
