import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import shallowCompare from 'react-addons-shallow-compare'
import { forceCheck } from 'react-lazyload'

import menu from 'config/menu'
import { redirect } from 'utils/window'
import browserHelper from 'utils/browserHelper'

import BoxSummaryMobile from 'BoxSummary/BoxSummaryMobile'
import BoxSummaryDesktop from 'BoxSummary/BoxSummaryDesktop'
import { RecipeMeta } from './RecipeMeta'
import { FoodBrandPage } from './FoodBrandPage'
import { ThematicsPage } from './ThematicsPage'
import { MenuRecipes } from './MenuRecipes'
import { RecipesInBasketProgress } from './RecipesInBasketProgress'
import { JustForYouTutorial } from './JustForYouTutorial'

import fetchData from './fetchData'
import css from './Menu.css'

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
    basketProducts: PropTypes.oneOfType([
      PropTypes.instanceOf(Immutable.Map),
      PropTypes.instanceOf(Immutable.Iterable),
    ]),
    productsLoadProducts: PropTypes.func.isRequired,
    productsLoadStock: PropTypes.func.isRequired,
    orderCheckoutAction: PropTypes.func.isRequired,
    recipes: PropTypes.arrayOf(PropTypes.string).isRequired,
    promoCode: PropTypes.string,
    postcode: PropTypes.string,
    slotId: PropTypes.string.isRequired,
    deliveryDayId: PropTypes.string,
    addressId: PropTypes.string,
    userOrders: PropTypes.instanceOf(Immutable.Map).isRequired,
    recipeGroupingSelected: PropTypes.oneOfType([
      null,
      PropTypes.shape({
        slug: PropTypes.string,
        name: PropTypes.string,
        borderColor: PropTypes.string,
      })
    ]),
    foodBrandDetails: PropTypes.shape({
      slug: PropTypes.string,
      name: PropTypes.string,
      borderColor: PropTypes.string,
    }),
    filterRecipeGrouping: PropTypes.func,
    toggleGridView: PropTypes.func,
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
    recipeGroupingSelected: null,
    query: {}
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
      productsLoadProducts,
      productsLoadStock
    } = this.props

    const { store } = this.context

    // if server rendered
    if (params.orderId && params.orderId === storeOrderId) {
      basketOrderLoaded(params.orderId)
    }
    const forceDataLoad = (storeOrderId && storeOrderId !== params.orderId) || query.reload
    // TODO: Add back logic to check what needs to be reloaded

    if (hasRecommendations) {
      triggerMenuLoad()
    }

    if (query && query.num_portions) {
      basketNumPortionChange(query.num_portions)
    }

    this.checkQueryParam()

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

    window.addEventListener(
      'orderUpdateProductsRequest',
      this.handleOrderUpdateProductsRequest
    )

    window.addEventListener(
      'orderDoesContainProductsRequest',
      this.handleOrderDoesContainProductsRequest
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
      selectCurrentCollection,
      menuCurrentCollectionId
    } = this.props

    forceCheck()

    if (prevProps.menuCurrentCollectionId !== menuCurrentCollectionId) {
      selectCurrentCollection(menuCurrentCollectionId)
    }

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

    window.removeEventListener(
      'orderDoesContainProductsRequest',
      this.handleOrderDoesContainProductsRequest
    )
    window.removeEventListener(
      'orderUpdateProductsRequest',
      this.handleOrderUpdateProductsRequest
    )
  }

  masonryContainer = null

  handleOrderDoesContainProductsRequest = () => {
    const { orderId, orderHasAnyProducts } = this.props
    orderHasAnyProducts(orderId)
  }

  handleOrderUpdateProductsRequest = async (event) => {
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

    const {
      basketProducts,
      orderCheckoutAction,
      orderId,
      numPortions,
      orderUpdateProducts,
    } = this.props

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

  checkQueryParam = () => {
    const {
      query,
      recipeGroupingSelected,
      foodBrandDetails,
      filterRecipeGrouping
    } = this.props
    const isFoodBrandSelected = recipeGroupingSelected !== null

    if (query.foodBrand) {
      const foodBrandUrlDifferent = isFoodBrandSelected && query.foodBrand !== recipeGroupingSelected.slug

      if (!isFoodBrandSelected || foodBrandUrlDifferent) {
        filterRecipeGrouping(foodBrandDetails, 'foodBrand')
      }
    } else if (isFoodBrandSelected && recipeGroupingSelected.location === 'foodBrand') {
      filterRecipeGrouping(null, 'foodBrand')
    }

    if(query.thematic) {
      if(!isFoodBrandSelected){
        filterRecipeGrouping(query.thematic, 'thematic')
      }
    } else if (isFoodBrandSelected && recipeGroupingSelected.location === 'thematic') {
      filterRecipeGrouping(null, 'thematic')
    }
  }

  render() {
    const {
      boxSummaryShow,
      clearAllFilters,
      features,
      filteredRecipesNumber,
      recipeGroupingSelected,
      forceLoad,
      hasRecommendations,
      isLoading,
      jfyTutorialFlag,
      menuBrowseCTAShow,
      menuCurrentCollectionId,
      menuRecipeDetailShow,
      orderId,
      query,
      recipes,
      filterRecipeGrouping,
    } = this.props
    const { mobileGridView, isChrome, isClient } = this.state
    const overlayShow = boxSummaryShow || menuBrowseCTAShow
    const showLoading = isLoading && !overlayShow || forceLoad
    const showSelectedPage = recipeGroupingSelected !== null && (!!query.foodBrand || !!query.thematic)

    let fadeCss = null
    if (showLoading && hasRecommendations) {
      fadeCss = css['fade--recommendations']
    } else if (showLoading) {
      fadeCss = css.fadeOut
    } else {
      fadeCss = css.willFade
    }

    let overlayShowCSS = null
    if (isChrome) {
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

          {(showSelectedPage && recipeGroupingSelected.location === 'foodBrand') ?
          <FoodBrandPage
            showDetailRecipe={this.showDetailRecipe}
            mobileGridView={mobileGridView}
            isClient={isClient}
          /> : ((showSelectedPage && recipeGroupingSelected.location === 'thematic')?
            <ThematicsPage 
              showDetailRecipe={this.showDetailRecipe}
              mobileGridView={mobileGridView}
              isClient={isClient}
            />
            :
            <MenuRecipes
              isClient={isClient}
              fadeCss={fadeCss}
              showLoading={showLoading}
              features={features}
              filteredRecipesNumber={filteredRecipesNumber}
              mobileGridView={mobileGridView}
              menuCurrentCollectionId={menuCurrentCollectionId}
              menuRecipeDetailShow={menuRecipeDetailShow}
              clearAllFilters={clearAllFilters}
              showDetailRecipe={this.showDetailRecipe}
              hasRecommendations={hasRecommendations}
              orderId={orderId}
              setThematic={filterRecipeGrouping}
              toggleGridView={this.toggleGridView}
            />
          )}
            />}
          <div className={overlayShow ? css.greyOverlayShow : css.greyOverlay} onClick={this.handleOverlayClick}></div>
        </div>
        <BoxSummaryMobile />
        <BoxSummaryDesktop />
        <RecipesInBasketProgress selectedRecipesCount={recipes.length} />
      </div>
    )
  }
}

export default Menu
