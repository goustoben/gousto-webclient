import React from 'react'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import { forceCheck as forceCheckLazyload } from 'react-lazyload'

import menu from 'config/menu'
import browserHelper from 'utils/browserHelper'

import MainLayout from 'layouts/MainLayout'
import { ShowcaseMenuContainer } from 'routes/ShowcaseMenu'
import { RecipesInBasketProgress } from './components/RecipesInBasketProgress'
import { BoxSummaryContainer } from './BoxSummary'
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

    promises.push(applyPromoCodeAndShowModal())

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
      isPaymentBeforeChoosingEnabled,
    } = this.props

    if (isPaymentBeforeChoosingEnabled && !isAuthenticated) {
      return <ShowcaseMenuContainer />
    }

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
          <DetailRecipeMetaContainer query={query} />
          <div className={classnames(css.container, overlayShowCSS)}>
            {children}
            <p className={css.legal}>{menu.legal}</p>
            <div
              className={showOverlay ? css.greyOverlayShow : css.greyOverlay}
              onClick={onOverlayClick}
            />
          </div>
          <BoxSummaryContainer />
          <RecipesInBasketProgress isAuthenticated={isAuthenticated} />
        </div>
      </MainLayout>
    )
  }
}
Menu.propTypes = menuPropTypes
Menu.defaultProps = defaultMenuPropTypes

export default Menu
