import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import { forceCheck } from 'react-lazyload'

import menu from 'config/menu'
import { redirect } from 'utils/window'
import browserHelper from 'utils/browserHelper'

import { getMenuService } from 'selectors/features'
import { BoxSummaryContainer } from './BoxSummary'
import { RecipeMeta } from './RecipeMeta'
import { FoodBrandPage } from './FoodBrandPage'
import { ThematicsPage } from './ThematicsPage'
import { MenuRecipes } from './MenuRecipes'
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
      productsLoadStock,
    } = this.props

    const { store } = this.context

    const useMenuService = getMenuService()
    // if server rendered
    if (params.orderId && params.orderId === storeOrderId) {
      basketOrderLoaded(params.orderId)
    }

    const forceDataLoad = (storeOrderId && storeOrderId !== params.orderId) || query.reload
    // TODO: Add back logic to check what needs to be reloaded

    if (query && query.num_portions) {
      basketNumPortionChange(query.num_portions)
    }

    this.checkQueryParam()

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
    const { isAuthenticated, orderId, menuLoadBoxPrices, menuVariation, tariffId } = this.props

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
    const { loginVisibilityChange } = this.props
    loginVisibilityChange(false)

    window.removeEventListener(
      'orderDoesContainProductsRequest',
      this.handleOrderDoesContainProductsRequest
    )
    window.removeEventListener(
      'orderUpdateProductsRequest',
      this.handleOrderUpdateProductsRequest
    )
  }

  handleOrderDoesContainProductsRequest = () => {
    const { orderId, orderHasAnyProducts } = this.props
    orderHasAnyProducts(orderId)
  }

  handleOrderUpdateProductsRequest = async (event) => {
    const addExistingProducts = (itemChoices, products) => {
      const newItemChoices = [...itemChoices]
      products.forEach(product => {
        newItemChoices.push({
          id: product.id || product.get('id'),
          quantity: product.quantity || product.get('quantity'),
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

  handleOverlayClick = () => {
    const { boxSummaryShow, boxDetailsVisibilityChange, basketRestorePreviousValues, menuBrowseCTAShow, menuBrowseCTAVisibilityChange } = this.props
    if (boxSummaryShow) {
      boxDetailsVisibilityChange(false, '')
      basketRestorePreviousValues()
    } else if (menuBrowseCTAShow) {
      menuBrowseCTAVisibilityChange(false)
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

    if (query.thematic) {
      if (!isFoodBrandSelected) {
        filterRecipeGrouping(query.thematic, 'thematic')
      }
    } else if (isFoodBrandSelected && recipeGroupingSelected.location === 'thematic') {
      filterRecipeGrouping(null, 'thematic')
    }
  }

  render() {
    const {
      boxSummaryShow,
      forceLoad,
      isAuthenticated,
      isLoading,
      menuBrowseCTAShow,
      orderId,
      query,
      recipeGroupingSelected,
      recipes,
    } = this.props
    const { isChrome, isClient } = this.state
    const overlayShow = boxSummaryShow || menuBrowseCTAShow
    const showLoading = isLoading && !overlayShow || forceLoad
    const showSelectedPage = recipeGroupingSelected !== null && (!!query.foodBrand || !!query.thematic)

    let fadeCss = null
    if (showLoading) {
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
        <JustForYouTutorial />
        <div className={classnames(css.container, overlayShowCSS)}>

          {(showSelectedPage && recipeGroupingSelected.location === 'foodBrand')
            ? (
              <FoodBrandPage
                isClient={isClient}
              />
            ) : ((showSelectedPage && recipeGroupingSelected.location === 'thematic')
              ? (
                <ThematicsPage
                  isClient={isClient}
                />
              )
              : (
                <MenuRecipes
                  isClient={isClient}
                  fadeCss={fadeCss}
                  showLoading={showLoading}
                  orderId={orderId}
                  query={query}
                />
              )
            )}
          <div className={overlayShow ? css.greyOverlayShow : css.greyOverlay} onClick={this.handleOverlayClick} />
        </div>
        <BoxSummaryContainer />
        <RecipesInBasketProgress
          isAuthenticated={isAuthenticated}
          selectedRecipesCount={recipes.length}
        />
      </div>
    )
  }
}

export default Menu
