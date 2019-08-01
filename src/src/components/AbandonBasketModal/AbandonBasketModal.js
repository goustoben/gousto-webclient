import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import moment from 'moment'
import { Button } from 'goustouicomponents'
import ModalPanel from 'Modal/ModalPanel'
import RecipeItem from 'Recipe/RecipeItem'
import userActions from 'actions/user'
import { menuLoadDays } from 'actions/menu'
import boxSummaryActions from 'actions/boxSummary'
import { loadRecipes } from 'actions/recipes'
import { getIsAuthenticated } from 'selectors/auth'
import { getRecipes, getBoxSummaryDeliveryDays } from 'selectors/root'
import css from './AbandonBasketModal.css'

class AbandonBasketModal extends PureComponent {
  static propTypes = {
    basketRecipes: PropTypes.instanceOf(Immutable.Map),
    orders: PropTypes.instanceOf(Immutable.Map),
    deliveryDays: PropTypes.instanceOf(Immutable.Map),
    recipes: PropTypes.instanceOf(Immutable.Map),
    orderDate: PropTypes.string,
    numPortions: PropTypes.number,
    isFeatureFlagEnabled: PropTypes.bool,
    isFirstViewOfSession: PropTypes.bool,
    trackAbandonBasketEligibility: PropTypes.func,
    redirect: PropTypes.func.isRequired,
    getAbandonBasketSessionState: PropTypes.func.isRequired,
    basketRecipesClear: PropTypes.func.isRequired
  }

  static defaultProps = {
    basketRecipes: Immutable.Map(),
    orders: Immutable.Map(),
    deliveryDays: Immutable.Map(),
    recipes: Immutable.Map(),
    orderDate: '',
    numPortions: 0,
    isFirstViewOfSession: false,
    isUserOrdersPending: true,
    isFeatureFlagEnabled: false,
    trackAbandonBasketEligibility: () => {}
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  state = {
    showModal: false
  }

  static fetchData = async ({ store }) => {
    const state = store.getState()
    const promises = []

    if (getIsAuthenticated(state)) {
      promises.push(store.dispatch(userActions.userLoadOrders()))

      if (!getBoxSummaryDeliveryDays(state).size) {
        await store.dispatch(menuLoadDays())
        await store.dispatch(boxSummaryActions.boxSummaryDeliveryDaysLoad())
      }

      if (!getRecipes(state).size) {
        promises.push(store.dispatch(loadRecipes()))
      }
    }

    return Promise.all(promises)
  }

  async componentDidMount() {
    const { getAbandonBasketSessionState } = this.props
    const { store } = this.context

    await AbandonBasketModal.fetchData({ store })
    getAbandonBasketSessionState()
    this.setState({ showModal: this.showModal() })
    window.sessionStorage.setItem('isFirstLoadOfSession', false)
  }

  getConfirmedOrdersOnDay = () => {
    const { orders, orderDate } = this.props

    return orders.filter(order => {
      const isDeliveryDateSame = moment(order.get('deliveryDate')).isSame(moment(orderDate), 'day')
      const hasRecipeItems = order.get('recipeItems').size > 0

      return isDeliveryDateSame && hasRecipeItems
    })
  }

  showModal = () => {
    const { isFirstViewOfSession, basketRecipes, orders, deliveryDays, orderDate, isFeatureFlagEnabled, trackAbandonBasketEligibility } = this.props

    const recipesInBasket = basketRecipes.size > 0
    const confirmedOrderOnDay = this.getConfirmedOrdersOnDay()
    const hasNoOrderOnDay = !!orders.size && confirmedOrderOnDay.size === 0
    const isValidDeliveryDay = deliveryDays.has(orderDate)
    const eligibleForAbandonBasket = isFirstViewOfSession && recipesInBasket && hasNoOrderOnDay && isValidDeliveryDay

    if (eligibleForAbandonBasket) trackAbandonBasketEligibility()

    return isFeatureFlagEnabled && eligibleForAbandonBasket
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
    const { orderDate, basketRecipesClear, numPortions, redirect } = this.props
    const { showModal } = this.state
    const recipeDetails = this.getBasketRecipeDetails()
    const isRecipeDetailAvailable = !!recipeDetails.length

    return showModal && isRecipeDetailAvailable ? (
      <ModalPanel closePortal={this.closeModal} className={css.modalPanel}>
        <div className={css.modalContentWrapper}>
          <h2>We&#8217;ve saved your choices</h2>
          <div className={css.modalContentSubTitle}>The recipes you chose are still available for delivery on the {moment(orderDate).format('Do MMMM')}:</div>
          <div className={css.modalContentRecipes}>
            {recipeDetails.map(recipeDetail => {
              return (
                <RecipeItem
                  key={recipeDetail.get('title')}
                  title={recipeDetail.get('title')}
                  media={recipeDetail.get('media')}
                  numPortions={numPortions}
                  available
                />
              )
            })}
          </div>
          <Button
            width="full"
            className={css.button}
            onClick={() => {
              redirect('/menu?reload=true')
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

export { AbandonBasketModal }
