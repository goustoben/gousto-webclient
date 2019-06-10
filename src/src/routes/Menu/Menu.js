import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import moment from 'moment'
import shallowCompare from 'react-addons-shallow-compare'
import { forceCheck } from 'react-lazyload'

import menu from 'config/menu'
import { redirect } from 'utils/window'

import BoxSummaryMobile from 'BoxSummary/BoxSummaryMobile'
import BoxSummaryDesktop from 'BoxSummary/BoxSummaryDesktop'
import browserHelper from 'utils/browserHelper'
import { RecipeMeta } from './RecipeMeta'
import MenuNoResults from './MenuNoResults'

import SubHeader from './SubHeader'
import Loading from './Loading'
import FilterTagsNav from './FilterTagsNav/FilterTagsNavContainer'
import css from './Menu.css'

import DetailOverlay from './DetailOverlay'
import CollectionsNav from './CollectionsNav'

import RecipeList from './RecipeList'
import { Banner } from './Banner'

import fetchData from './fetchData'
import { JustForYouTutorial } from './JustForYouTutorial'

const orderDoesContainProductsRequest = (orderId, orderHasAnyProducts) => {
  const handleOrderDoesContainProductsRequest = () => {
    orderHasAnyProducts(orderId)
  }

  window.addEventListener(
    'orderDoesContainProductsRequest',
    handleOrderDoesContainProductsRequest
  )
}

class Menu extends React.Component {
  static propTypes = {
    basketOrderLoaded: PropTypes.func.isRequired,
    cutOffDate: PropTypes.string.isRequired,
    menuLoadBoxPrices: PropTypes.func.isRequired,
    menuRecipeDetailShow: PropTypes.string,
    detailVisibilityChange: PropTypes.func,
    boxSummaryShow: PropTypes.bool,
    boxDetailsVisibilityChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    boxSummaryDeliveryDaysLoad: PropTypes.func,
    boxSummaryDeliveryDays: PropTypes.instanceOf(Immutable.Map),
    hasRecommendations: PropTypes.bool,
    forceLoad: PropTypes.bool,
    menuLoadDays: PropTypes.func,
    menuBrowseCTAShow: PropTypes.bool,
    menuBrowseCTAVisibilityChange: PropTypes.func,
    loginVisibilityChange: PropTypes.func,
    menuMobileGridViewSet: PropTypes.func.isRequired,
    basketRestorePreviousValues: PropTypes.func.isRequired,
    features: PropTypes.instanceOf(Immutable.Map),
    menuCurrentCollectionId: PropTypes.string,
    menuVariation: PropTypes.string,
    params: PropTypes.object,
    query: PropTypes.object,
    orderId: PropTypes.string,
    storeOrderId: PropTypes.string,
    isLoading: PropTypes.bool,
    isAuthenticated: PropTypes.bool.isRequired,
    tariffId: PropTypes.number,
    menuLoadingBoxPrices: PropTypes.bool,
    jfyTutorialFlag: PropTypes.bool,
    filteredRecipesNumber: PropTypes.number,
    clearAllFilters: PropTypes.func,
    triggerMenuLoad: PropTypes.func,
    shouldJfyTutorialBeVisible: PropTypes.func,
    basketNumPortionChange: PropTypes.func.isRequired,
    portionSizeSelectedTracking: PropTypes.func,
    numPortions: PropTypes.number,
    orderHasAnyProducts: PropTypes.func.isRequired,
    orderUpdateProducts: PropTypes.func.isRequired,
    basketProducts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      quantity: PropTypes.number,
    })),
    productsLoadProducts: PropTypes.func.isRequired,
    productsLoadStock: PropTypes.func.isRequired,
    orderCheckoutAction: PropTypes.func.isRequired,
    recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
    promoCode: PropTypes.string,
    postcode: PropTypes.string,
    slotId: PropTypes.string.isRequired,
    deliveryDayId: PropTypes.string,
    addressId: PropTypes.string,
    userOrders: PropTypes.instanceOf(Immutable.Map).isRequired,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static defaultProps = {
    isAuthenticated: false,
    disabled: false,
    forceLoad: false,
    isLoading: false,
    numPortions: 2,
    menuMobileGridViewSet: () => {},
    basketRestorePreviousValues: () => {},
    shouldJfyTutorialBeVisible: () => {},
    basketProducts: [],
    portionSizeSelectedTracking: () => {},
    orderCheckout: {
      orderId: '',
      url: ''
    },
    addressId: '',
    promoCode: '',
    postcode: '',
    deliveryDayId: '',
  }

  static fetchData(args, force) {
    return fetchData(args, force)
  }

  state = {
    mobileGridView: false,
    isClient: false,
    isChrome: false,
  }

  async componentDidMount() {
    this.setState({ // eslint-disable-line react/no-did-mount-set-state
      isClient: true,
      isChrome: browserHelper.isChrome(),
    })

    const {
      basketProducts,
      cutOffDate,
      params,
      storeOrderId,
      basketOrderLoaded,
      query,
      triggerMenuLoad,
      hasRecommendations,
      basketNumPortionChange,
      boxSummaryDeliveryDays,
      disabled,
      menuLoadDays,
      boxSummaryDeliveryDaysLoad,
      menuLoadingBoxPrices,
      menuLoadBoxPrices,
      shouldJfyTutorialBeVisible,
      portionSizeSelectedTracking,
      numPortions,
      orderId,
      orderHasAnyProducts,
      orderUpdateProducts,
      productsLoadProducts,
      productsLoadStock,
      orderCheckoutAction,
    } = this.props
    const { store } = this.context
    // if server rendered
    if (params.orderId && params.orderId === storeOrderId) {
      basketOrderLoaded(params.orderId)
    }

    const forceDataLoad = (storeOrderId && storeOrderId !== params.orderId)
    // TODO: Add back logic to check what needs to be reloaded

    if (hasRecommendations) {
      triggerMenuLoad()
    }

    if (query && query.num_portions) {
      basketNumPortionChange(query.num_portions)
    }

    Menu.fetchData({ store, query, params }, forceDataLoad)

    if (boxSummaryDeliveryDays.size === 0 && !disabled) {
      menuLoadDays().then(() => {
        boxSummaryDeliveryDaysLoad()
      })
    }

    if (!disabled && !menuLoadingBoxPrices) {
      menuLoadBoxPrices()
    }

    shouldJfyTutorialBeVisible()

    if (params.orderId) {
      portionSizeSelectedTracking(numPortions, params.orderId)
    }

    const handleOrderUpdateProductsRequest = async (event) => {
      const addExistingProducts = (itemChoices, products) => {
        const newItemChoices = [...itemChoices]
        products.forEach(product => {
          newItemChoices.push({
            id: product.id,
            quantity: product.quantity,
            type: "Product"
          })
        })

        return newItemChoices
      }

      let { itemChoices } = event.detail
      itemChoices = addExistingProducts(itemChoices, basketProducts)

      const {
        addressId,
        postcode,
        promoCode,
        deliveryDayId,
        slotId,
        recipes,
      } = this.props

      if (!orderId) {
        const checkoutResponse = await orderCheckoutAction({
          addressId,
          postcode,
          numPortions,
          promoCode,
          orderId: '',
          deliveryDayId,
          slotId,
          orderAction: this.getOrderAction(),
          disallowRedirectToSummary: true,
          recipes
        })

        if (checkoutResponse && checkoutResponse.orderId && checkoutResponse.url) {
          await orderUpdateProducts(checkoutResponse.orderId, itemChoices)

          return redirect(checkoutResponse.url)
        }
      }

      orderUpdateProducts(orderId, itemChoices)
    }

    window.addEventListener(
      'orderUpdateProductsRequest',
      handleOrderUpdateProductsRequest
    )

    orderDoesContainProductsRequest(
      orderId,
      orderHasAnyProducts
    )

    if (cutOffDate) {
      try {
        await productsLoadStock()
        await productsLoadProducts(cutOffDate)
      } catch (err) {
        throw err
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, orderId, menuRecipeDetailShow, menuLoadBoxPrices, menuVariation, tariffId } = this.props

    if (nextProps.menuRecipeDetailShow && !menuRecipeDetailShow) {
      window.document.addEventListener('keyup', this.handleKeyup, false)
    } else if (!nextProps.menuRecipeDetailShow) {
      window.document.removeEventListener('keyup', this.handleKeyup, false)
    }

    // /menu-> /menu/:orderId
    const editingOrder = (nextProps.orderId || orderId) && nextProps.orderId !== orderId
    // user login
    const justLoggedIn = !isAuthenticated && nextProps.isAuthenticated
    const variationChanged = menuVariation !== nextProps.menuVariation
    if (editingOrder || justLoggedIn || variationChanged) {
      const { store } = this.context
      const query = nextProps.query || {}
      const params = nextProps.params || {}
      Menu.fetchData({ store, query, params }, true)
    }

    if (!nextProps.disabled && !nextProps.menuLoadingBoxPrices && tariffId !== nextProps.tariffId) {
      menuLoadBoxPrices()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  async componentDidUpdate(prevProps) {
    const {
      shouldJfyTutorialBeVisible,
      isLoading,
      cutOffDate,
      productsLoadStock,
      productsLoadProducts,
    } = this.props

    forceCheck()

    if (cutOffDate && cutOffDate !== prevProps.cutOffDate) {
      try {
        await productsLoadStock()
        await productsLoadProducts(cutOffDate)
      } catch (err) {
        throw err
      }
    }

    if (!isLoading && prevProps.isLoading !== isLoading) {
      shouldJfyTutorialBeVisible()
    }
  }

  componentWillUnmount() {
    this.props.loginVisibilityChange(false)

    window.removeEventListener('orderDoesContainProductsRequest')
    window.removeEventListener('orderUpdateProductsRequest')
  }

  masonryContainer = null

  getOrderAction = () => {
    const { userOrders, orderId } = this.props

    const userOrder = userOrders.filter(
      (order) => {
        return order.get('id') === orderId
      }
    ).first()
    const recipeAction = (
      userOrder && userOrder.get('recipeItems').size > 0
    ) ? 'update' : 'choice'
    const orderAction = (orderId)
      ? `recipe-${recipeAction}`
      : 'transaction'

    return orderAction
  }

  handleKeyup = (e) => {
    if (e.type === 'keyup' && e.keyCode && e.keyCode === 27) {
      this.props.detailVisibilityChange(false)
    }
  }

  toggleGridView = () => {
    this.props.menuMobileGridViewSet(this.state.mobileGridView, !this.state.mobileGridView)
    if (this.state.mobileGridView) {
      this.setState({ mobileGridView: false })
    } else {
      this.setState({ mobileGridView: true })
    }
  }

  showDetailRecipe = (recipeId) => {
    if (!this.props.boxSummaryShow) {
      this.props.detailVisibilityChange(recipeId)
    }
  }

  handleOverlayClick = () => {
    if (this.props.boxSummaryShow) {
      this.props.boxDetailsVisibilityChange(false, '')
      this.props.basketRestorePreviousValues()
    } else if (this.props.menuBrowseCTAShow) {
      this.props.menuBrowseCTAVisibilityChange(false)
    }
  }

  renderBanner = (switchoverDate) => {
    const now = moment()
    const switchoverTime = moment(switchoverDate)

    return (now.isSameOrAfter(switchoverTime, 'hour')) ? (
      <Banner type={'summer-bbq'}/>
    ) :
      (<Banner type={'taste-of-italy'}/>)
  }

  render() {
    const { hasRecommendations, forceLoad, jfyTutorialFlag, query } = this.props
    const { mobileGridView } = this.state
    const overlayShow = this.props.boxSummaryShow || this.props.menuBrowseCTAShow
    const collectionsNavEnabled = this.props.features.getIn(['forceCollections', 'value']) || (this.props.features.getIn(['collections', 'value']) && (this.props.features.getIn(['collectionsNav', 'value']) !== false))
    const showLoading = this.props.isLoading && !overlayShow || forceLoad
    const menuFilterExperiment = this.props.features.getIn(['filterMenu', 'value'])

    let fadeCss = null
    if (showLoading && hasRecommendations) {
      fadeCss = css['fade--recommendations']
    } else if (showLoading) {
      fadeCss = css.fadeOut
    } else {
      fadeCss = css.willFade
    }

    let overlayShowCSS = null
    if (this.state.isChrome) {
      overlayShowCSS = overlayShow ? css.blur : null
    }

    return (
      <div data-testing="menuContainer">
        <Helmet
          title={menu.helmet.title}
          meta={menu.helmet.meta}
          style={menu.helmet.style}
        />
        <RecipeMeta query={query} />
        {jfyTutorialFlag ? <JustForYouTutorial /> : ''}
        <div className={classnames(css.container, overlayShowCSS)}>
          {this.renderBanner(menu.summerBbq.switchoverDate)}
          <SubHeader
            viewIcon={(mobileGridView) ? 'iconSingleColumn' : 'iconDoubleColumn'}
            onToggleGridView={this.toggleGridView}
            orderId={this.props.orderId}
          />
          <Loading loading={showLoading} hasRecommendations={hasRecommendations} />
          <div className={fadeCss} data-testing="menuRecipes">
            {!showLoading && collectionsNavEnabled &&
              <CollectionsNav masonryContainer={this.masonryContainer} menuCurrentCollectionId={this.props.menuCurrentCollectionId} />}
              {!showLoading && <FilterTagsNav />}
            {this.props.filteredRecipesNumber ?
              <div
                ref={ref => { this.masonryContainer = ref }}
                className={classnames({
                  [css.masonryContainerMenu]: !menuFilterExperiment,
                  [css.masonryContainer]: menuFilterExperiment,
                })}
                data-testing="menuRecipesList"
              >
                <RecipeList
                  mobileGridView={mobileGridView}
                  showDetailRecipe={this.showDetailRecipe}
                  menuCurrentCollectionId={this.props.menuCurrentCollectionId}
                />
                <p className={css.legal}>{menu.legal}</p>
                <DetailOverlay
                  showOverlay={this.state.isClient}
                  menuRecipeDetailShow={this.props.menuRecipeDetailShow}
                />
              </div>
              :
              <MenuNoResults clearAllFilters={() => this.props.clearAllFilters()} />
            }
          </div>
          <div className={overlayShow ? css.greyOverlayShow : css.greyOverlay} onClick={this.handleOverlayClick}></div>
        </div>
        <BoxSummaryMobile />
        <BoxSummaryDesktop />
      </div>
    )
  }
}

export default Menu
