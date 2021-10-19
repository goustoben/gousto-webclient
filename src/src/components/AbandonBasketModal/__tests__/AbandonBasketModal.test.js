import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import configureMockStore from 'redux-mock-store'
import { Button } from 'goustouicomponents'
import ModalPanel from 'Modal/ModalPanel'
import RecipeItem from 'routes/Menu/Recipe/RecipeItem'
import { menuLoadDays } from 'actions/menu'
import * as boxSummaryActions from 'actions/boxSummary'
import { loadRecipes } from 'actions/recipes'
import userActions from 'actions/user'
import { loadMenuServiceDataIfDeepLinked } from '../../../routes/Menu/fetchData/menuService'
import { AbandonBasketModal } from '../AbandonBasketModal'

jest.mock('actions/menu', () => ({
  menuLoadDays: jest.fn()
}))

jest.mock('actions/recipes', () => ({
  loadRecipes: jest.fn()
}))

jest.mock('actions/boxSummary', () => ({
  boxSummaryDeliveryDaysLoad: jest.fn()
}))

jest.mock('actions/user', () => ({
  userLoadOrders: jest.fn()
}))

jest.mock('../../../routes/Menu/fetchData/menuService')

const recipes = Immutable.fromJS({
  1: {
    title: 'Recipe 1'
  },
  2: {
    title: 'Recipe 2'
  },
  3: {
    title: 'Recipe 3'
  }
})

const basketRecipes = Immutable.fromJS({
  1: 1,
  2: 1,
  3: 1
})
const orders = Immutable.fromJS([
  {
    deliveryDate: '05/05/05',
    recipeItems: [{}, {}]
  },
  {
    deliveryDate: '06/06/06',
    recipeItems: [{}, {}]
  },
  {
    deliveryDate: '07/07/07',
    recipeItems: [{}, {}]
  },
  {
    deliveryDate: '08/08/08',
    recipeItems: [] // projected order
  }
])

const deliveryDays = Immutable.fromJS({ '01/01/2019': {} })
const trackAbandonBasketEligibilitySpy = jest.fn()

let wrapper
const initialState = {
  auth: Immutable.fromJS({
    isAuthenticated: true
  }),
  boxSummaryDeliveryDays: Immutable.Map(),
  recipes: Immutable.Map()
}

const mockStore = configureMockStore()
const store = mockStore(initialState)

store.subscribe = jest.fn().mockReturnValue(Promise.resolve())
store.dispatch = jest.fn().mockReturnValue(Promise.resolve())

// We add legacy context to access the store to test the AbandonBasketModal
// component. This is cause enzyme only supports legacy context
AbandonBasketModal.contextTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.any,
}

describe('Abandon Basket Modal', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('render', () => {
    beforeEach(() => {
      wrapper = shallow(<AbandonBasketModal
        redirect={jest.fn()}
        getAbandonBasketSessionState={jest.fn()}
        basketRecipesClear={jest.fn()}
        basketRecipes={basketRecipes}
        recipes={recipes}
      />, { context: { store }})
    })

    test('should render a modal if showModal state is true and basket recipes exist in recipes object', () => {
      wrapper.setState({ showModal: true })
      expect(wrapper.find(ModalPanel).length).toEqual(1)
    })

    test('should render a list of recipe items equal to the recipes in the basket', () => {
      wrapper = shallow(
        <AbandonBasketModal
          recipes={recipes}
          basketRecipes={basketRecipes}
          redirect={jest.fn()}
          getAbandonBasketSessionState={jest.fn()}
          basketRecipesClear={jest.fn()}
          store={store}
        />, { context: { store }}
      )
      wrapper.setState({ showModal: true })
      expect(wrapper.find(RecipeItem).length).toEqual(basketRecipes.size)
    })

    test('should render two buttons', () => {
      wrapper.setState({ showModal: true })
      expect(wrapper.find(Button).length).toEqual(2)
    })

    test('should not render a modal if showModal state is false', () => {
      wrapper.setState({ showModal: false })
      expect(wrapper.find(ModalPanel).length).toEqual(0)
    })

    test('should not render if the basket recipes exist in recipes object', () => {
      wrapper = shallow(
        <AbandonBasketModal
          redirect={jest.fn()}
          getAbandonBasketSessionState={jest.fn()}
          basketRecipesClear={jest.fn()}
          basketRecipes={basketRecipes}
          store={store}
        />,
        { context: { store } })

      wrapper.setState({ showModal: true })

      expect(wrapper.find(ModalPanel).length).toEqual(0)
    })
  })

  describe('component did mount', () => {
    beforeEach(async () => {
      wrapper = shallow(
        <AbandonBasketModal
          redirect={jest.fn()}
          getAbandonBasketSessionState={jest.fn()}
          basketRecipesClear={jest.fn()}
          basketRecipes={basketRecipes}
          orders={orders}
          orderDate="01/01/2019"
          deliveryDays={deliveryDays}
          trackAbandonBasketEligibility={trackAbandonBasketEligibilitySpy}
          store={store}
        />,
        { context: { store } },
      )

      await wrapper.instance().componentDidMount()
    })

    test('should set show modal state', () => {
      expect(wrapper.state().showModal).toEqual(true)
    })
    test('should set isNotFirstViewedSession to TRUE', () => {
      expect(window.sessionStorage.getItem('isNotFirstLoadOfSession')).toBe('true')
    })
  })

  describe('fetch data', () => {
    beforeEach(() => {
      wrapper = shallow(<AbandonBasketModal
        redirect={jest.fn()}
        getAbandonBasketSessionState={jest.fn()}
        basketRecipesClear={jest.fn()}
        store={store}
      />, { context: { store } })
    })

    test('should call userLoadOrders if authenticated', async () => {
      await AbandonBasketModal.fetchData({ store })

      expect(userActions.userLoadOrders).toHaveBeenCalled()
    })

    test('should call loadMenuServiceDataIfDeepLinked if authenticated and no deliveryDays', async () => {
      await AbandonBasketModal.fetchData({ store })

      expect(loadMenuServiceDataIfDeepLinked).toHaveBeenCalled()
    })

    test('should call menuLoadDays if authenticated and no deliveryDays', async () => {
      await AbandonBasketModal.fetchData({ store })

      expect(menuLoadDays).toHaveBeenCalled()
    })

    test('should call boxSummaryDeliveryDaysLoad if authenticated and no deliveryDays', async () => {
      await AbandonBasketModal.fetchData({ store })

      expect(boxSummaryActions.boxSummaryDeliveryDaysLoad).toHaveBeenCalled()
    })

    test('should call loadRecipes if authenticated and no recipes', async () => {
      await AbandonBasketModal.fetchData({ store })

      expect(loadRecipes).toHaveBeenCalled()
    })

    test('should not call anything if not authenticated', async () => {
      const notAuthenticatedStore = mockStore({
        auth: Immutable.fromJS({
          isAuthenticated: false
        }),
        boxSummaryDeliveryDays: Immutable.Map(),
        recipes: Immutable.Map()
      })
      jest.clearAllMocks()

      await AbandonBasketModal.fetchData({ store: notAuthenticatedStore })

      expect(userActions.userLoadOrders).not.toHaveBeenCalled()
      expect(menuLoadDays).not.toHaveBeenCalled()
      expect(boxSummaryActions.boxSummaryDeliveryDaysLoad).not.toHaveBeenCalled()
      expect(loadRecipes).not.toHaveBeenCalled()
    })
  })

  describe('get confirmed orders on day', () => {
    beforeEach(() => {
      wrapper = shallow(
        <AbandonBasketModal
          redirect={jest.fn()}
          getAbandonBasketSessionState={jest.fn()}
          basketRecipesClear={jest.fn()}
          orders={orders}
          store={store}
        />, { context: { store } })
    })
    test('should return a list of users orders on the same day as the abandoned order', () => {
      wrapper.setProps({ orderDate: '07/07/07' })

      const result = wrapper.instance().getConfirmedOrdersOnDay()

      expect(result.size).toEqual(1)
    })

    test('should return an empty list if there is no order on the same day as the abandoned order', () => {
      wrapper.setProps({ orderDate: '01/01/2019' })

      const result = wrapper.instance().getConfirmedOrdersOnDay()

      expect(result.size).toEqual(0)
    })

    test('should return an empty list if there is a PROJECTED order on the same day as the abandoned order', () => {
      wrapper.setProps({ orderDate: '08/08/08' })

      const result = wrapper.instance().getConfirmedOrdersOnDay()

      expect(result.size).toEqual(0)
    })
  })

  describe('show modal', () => {
    beforeEach(() => {
      wrapper = shallow(
        <AbandonBasketModal
          redirect={jest.fn()}
          getAbandonBasketSessionState={jest.fn()}
          basketRecipesClear={jest.fn()}
          basketRecipes={basketRecipes}
          orders={orders}
          orderDate="01/01/2019"
          deliveryDays={deliveryDays}
          trackAbandonBasketEligibility={trackAbandonBasketEligibilitySpy}
        />
      )
    })
    describe('should return TRUE', () => {
      test('recipes in basket, no existing order on day & day is valid', () => {
        const result = wrapper.instance().showModal()

        expect(result).toEqual(true)
      })
    })
    describe('should return FALSE', () => {
      describe('if missing props', () => {
        test('basket recipes', () => {
          wrapper.setProps({ basketRecipes: Immutable.Map() })

          const result = wrapper.instance().showModal()

          expect(result).toEqual(false)
        })

        test('orders', () => {
          wrapper.setProps({ orders: Immutable.Map() })

          const result = wrapper.instance().showModal()

          expect(result).toEqual(false)
        })

        test('delivery days', () => {
          wrapper.setProps({ deliveryDays: Immutable.Map() })

          const result = wrapper.instance().showModal()

          expect(result).toEqual(false)
        })

        test('order date', () => {
          wrapper.setProps({ orderDate: '' })

          const result = wrapper.instance().showModal()

          expect(result).toEqual(false)
        })
      })

      test('if there is a confirmed order on the abandoned order date', () => {
        wrapper.setProps({ orderDate: '05/05/05' })

        const result = wrapper.instance().showModal()

        expect(result).toEqual(false)
      })

      test('if the delivery day is not if not in boxSummaryDeliveryDays', () => {
        wrapper.setProps({ orderDate: 'invalid date' })

        const result = wrapper.instance().showModal()

        expect(result).toEqual(false)
      })
    })

    test('should call trackAbandonBasketEligibility', () => {
      wrapper.instance().showModal()
      expect(trackAbandonBasketEligibilitySpy).toHaveBeenCalled()
    })
  })

  describe('close modal', () => {
    test('should set showModal state to false', () => {
      wrapper = shallow(
        <AbandonBasketModal
          redirect={jest.fn()}
          getAbandonBasketSessionState={jest.fn()}
          basketRecipesClear={jest.fn()}
          basketRecipes={basketRecipes}
          orders={orders}
          orderDate="01/01/2019"
          deliveryDays={deliveryDays}
          trackAbandonBasketEligibility={trackAbandonBasketEligibilitySpy}
        />
      )
      wrapper.setState({ showModal: true })
      wrapper.instance().closeModal()
      expect(wrapper.state().showModal).toEqual(false)
    })
  })
})
