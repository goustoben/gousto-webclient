import React, { PureComponent } from 'react'

import ModalPanel from 'Modal/ModalPanel'
import { Button } from 'goustouicomponents'
import Immutable from 'immutable'
import moment from 'moment'
import PropTypes from 'prop-types'
import { ReactReduxContext } from 'react-redux'

import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'
import { menuLoadDays } from 'actions/menu'
import { loadRecipes } from 'actions/recipes'
import userActions from 'actions/user'
import { Item } from 'components/Item'
import { loadMenuServiceDataIfDeepLinked } from 'routes/Menu/fetchData/menuService'
import { getIsAuthenticated } from 'selectors/auth'
import { getRecipes, getBoxSummaryDeliveryDays } from 'selectors/root'

import css from './AbandonBasketModal.css'

const propTypes = {
  basketRecipes: PropTypes.instanceOf(Immutable.Map),
  orders: PropTypes.instanceOf(Immutable.Map),
  deliveryDays: PropTypes.instanceOf(Immutable.Map),
  recipes: PropTypes.instanceOf(Immutable.Map),
  orderDate: PropTypes.string,
  numPortions: PropTypes.number,
  trackAbandonBasketEligibility: PropTypes.func,
  trackAbandonBasketContinueToMenu: PropTypes.func,
  redirect: PropTypes.func.isRequired,
  getAbandonBasketSessionState: PropTypes.func.isRequired,
  basketRecipesClear: PropTypes.func.isRequired,
  addRecipeToBasket: PropTypes.func.isRequired,
}

const defaultProps = {
  basketRecipes: Immutable.Map(),
  orders: Immutable.Map(),
  deliveryDays: Immutable.Map(),
  recipes: Immutable.Map(),
  orderDate: '',
  numPortions: 0,
  trackAbandonBasketEligibility: () => {},
  trackAbandonBasketContinueToMenu: () => {},
}

const contextType = ReactReduxContext

class AbandonBasketModal extends PureComponent {
  static fetchData = async ({ store, addRecipeToBasket }) => {
    const state = store.getState()
    const promises = []

    if (getIsAuthenticated(state)) {
      promises.push(store.dispatch(userActions.userLoadOrders()))

      if (!getBoxSummaryDeliveryDays(state).size) {
        // defensive code to ensure menu load days works below for deeplinks
        await store.dispatch(loadMenuServiceDataIfDeepLinked(false, addRecipeToBasket))

        await store.dispatch(menuLoadDays())
        await store.dispatch(boxSummaryDeliveryDaysLoad())
      }

      if (!getRecipes(state).size) {
        promises.push(store.dispatch(loadRecipes()))
      }
    }

    return Promise.all(promises)
  }

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
  }

  async componentDidMount() {
    const { getAbandonBasketSessionState, addRecipeToBasket } = this.props
    const { store } = this.context

    await AbandonBasketModal.fetchData({ store, addRecipeToBasket })
    getAbandonBasketSessionState()
    this.setState({ showModal: this.showModal() })
    window.sessionStorage.setItem('isNotFirstLoadOfSession', true)
  }

  getConfirmedOrdersOnDay = () => {
    const { orders, orderDate } = this.props

    return orders.filter((order) => {
      const isDeliveryDateSame = moment(order.get('deliveryDate')).isSame(moment(orderDate), 'day')
      const hasRecipeItems = order.get('recipeItems').size > 0

      return isDeliveryDateSame && hasRecipeItems
    })
  }

  showModal = () => {
    const { basketRecipes, orders, deliveryDays, orderDate, trackAbandonBasketEligibility } =
      this.props

    const recipesInBasket = basketRecipes.size > 0
    const confirmedOrderOnDay = this.getConfirmedOrdersOnDay()
    const hasNoOrderOnDay = !!orders.size && confirmedOrderOnDay.size === 0
    const isValidDeliveryDay = deliveryDays.has(orderDate)
    const eligibleForAbandonBasket = recipesInBasket && hasNoOrderOnDay && isValidDeliveryDay

    if (eligibleForAbandonBasket) trackAbandonBasketEligibility()

    return eligibleForAbandonBasket
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  getBasketRecipeDetails = () => {
    const { basketRecipes, recipes } = this.props
    const basketRecipeIds = Object.keys(basketRecipes.toJS())

    return basketRecipeIds.reduce((acc, curr) => {
      const recipe = recipes && recipes.get(curr)

      if (recipe) acc.push(recipe)

      return acc
    }, [])
  }

  render() {
    const {
      orderDate,
      basketRecipesClear,
      numPortions,
      redirect,
      trackAbandonBasketContinueToMenu,
    } = this.props
    const { showModal } = this.state
    const recipeDetails = this.getBasketRecipeDetails()
    const isRecipeDetailAvailable = !!recipeDetails.length

    return showModal && isRecipeDetailAvailable ? (
      <ModalPanel closePortal={this.closeModal} className={css.modalPanel}>
        <div className={css.modalContentWrapper}>
          <h2>We&#8217;ve saved your choices</h2>
          <div className={css.modalContentSubTitle}>
            The recipes you chose are still available for delivery on the
            {moment(orderDate).format('Do MMMM')}:
          </div>
          <div className={css.modalContentRecipes}>
            {recipeDetails.map((recipeDetail) => (
              <Item
                key={recipeDetail.get('title')}
                type="recipe"
                available
                media={recipeDetail.getIn(['media', 'images', 0, 'urls'], Immutable.List([]))}
                onImageClick={false}
                quantity={numPortions}
                title={recipeDetail.get('title')}
              />
            ))}
          </div>
          <Button
            width="full"
            className={css.button}
            onClick={() => {
              redirect('/menu?reload=true')
              trackAbandonBasketContinueToMenu()
              this.closeModal()
            }}
          >
            Carry on with my order
          </Button>
          <Button
            width="full"
            color="secondary"
            className={css.button}
            onClick={() => {
              basketRecipesClear()
              this.closeModal()
            }}
          >
            Scrap these and start again
          </Button>
        </div>
      </ModalPanel>
    ) : null
  }
}

AbandonBasketModal.propTypes = propTypes
AbandonBasketModal.defaultProps = defaultProps
AbandonBasketModal.contextType = contextType

export { AbandonBasketModal }
