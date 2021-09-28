import React from 'react'
import { mount } from 'enzyme'
import { browserHistory } from 'react-router'
import { Ingredients } from 'routes/GetHelp/Ingredients/Ingredients.logic'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fromJS } from 'immutable'

jest.mock('apis/getHelp')

describe('<Ingredients />', () => {
  const MASS_ISSUE_INELIGIBLE_INGREDIENT_UUIDS = ['4e949ce8-d92c-43fa-8c0d-110d903d6e60', '90ea17bd-204c-4ded-9dac-12df03f265d6']
  const recipes = [
    { id: '1', title: 'Fish Curry', ingredients: [{ uuid: '1', label: 'fish' }] },
    {
      id: '2',
      title: 'Pasta Bake',
      ingredients: [{ uuid: '1111', label: 'test' }, { uuid: '2222', label: 'pasta' }]
    },
    { id: '3', title: 'Cottage Pie', ingredients: [{ uuid: '3', label: 'potato' }] },
    { id: '4', title: 'Chicken Fajitas', ingredients: [{ uuid: '4', label: 'chicken' }] },
  ]
  const user = {
    id: '777',
    accessToken: 'user-access-token',
  }
  const order = {
    id: '888',
  }

  let continueButton
  let getHelpLayout
  let store
  let wrapper
  const initialState = {
    getHelp: fromJS({
      otherIssueIneligibleIngredientUuids: []
    })}

  const storeSelectedIngredients = jest.fn()
  const trackDeselectIngredient = jest.fn()
  const trackSelectIngredient = jest.fn()
  const validateSelectedIngredients = jest.fn()
  const validateLatestOrder = jest.fn().mockResolvedValue(
    { data: { valid: true } }
  )
  const originalBrowserHistory = browserHistory
  const mockStore = configureStore([thunk])

  const PROPS = {
    massIssueIneligibleIngredientUuids: MASS_ISSUE_INELIGIBLE_INGREDIENT_UUIDS,
    isMultiComplaintLimitReachedLastFourWeeks: false,
    isOrderValidationError: false,
    isValidateOrderLoading: false,
    order,
    recipes,
    user,
    storeSelectedIngredients,
    trackDeselectIngredient,
    trackSelectIngredient,
    validateLatestOrder,
    validateSelectedIngredients,
  }

  beforeEach(() => {
    browserHistory.push = jest.fn()
    store = mockStore(initialState)
  })

  afterEach(() => {
    jest.clearAllMocks()
    browserHistory.push = originalBrowserHistory.push
  })

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <Ingredients {...PROPS} />
        </Provider>
      )
      continueButton = wrapper.find('BottomFixedContentWrapper').find('Button')
      getHelpLayout = wrapper.find('GetHelpLayout2')
    })

    test('layout is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomFixedContentWrapper')

      expect(getHelpLayout).toHaveLength(1)
      expect(BottomBar).toHaveLength(1)
      expect(BottomBar.find('Button')).toHaveLength(1)
    })

    test('header is rendering correctly', () => {
      expect(getHelpLayout.prop('headingText')).toBe('Get help with your box')
    })

    test('body description is redering correctly', () => {
      expect(getHelpLayout.find('.copy').text())
        .toBe('Which ingredient(s) had an issue? Select meal to see ingredients.')
    })

    test('bottom bar buttons is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomFixedContentWrapper')

      expect(BottomBar.find('Button').text()).toContain('Continue')
    })

    test('the Continue button is disable by default', () => {
      const BottomBar = getHelpLayout.find('BottomFixedContentWrapper')
      continueButton = BottomBar.find('Button')

      expect(continueButton.prop('disabled')).toBe(true)
    })

    test('recipes are being displayed', () => {
      const items = getHelpLayout.find('Item')

      expect(items).toHaveLength(4)

      expect(items.at(0).text()).toBe('Fish Curry')
      expect(items.at(1).text()).toBe('Pasta Bake')
      expect(items.at(2).text()).toBe('Cottage Pie')
      expect(items.at(3).text()).toBe('Chicken Fajitas')
    })

    test('recipe list is being rendered', () => {
      expect(getHelpLayout.find('RecipeList')).toHaveLength(1)
      expect(getHelpLayout.find('RecipeList').prop('recipes')).toBe(recipes)
    })

    test('RecipeIngredients are rendered with the mass issue ineligible ingredient uuids', () => {
      expect(wrapper.find('RecipeList').prop('children').props.massIssueIneligibleIngredientUuids)
        .toBe(MASS_ISSUE_INELIGIBLE_INGREDIENT_UUIDS)
    })
  })

  describe('behaviour', () => {
    describe('ingredients', () => {
      beforeEach(() => {
        wrapper = mount(
          <Provider store={store}>
            <Ingredients {...PROPS} />
          </Provider>
        )
        continueButton = wrapper.find('BottomFixedContentWrapper').find('Button')
        getHelpLayout = wrapper.find('GetHelpLayout2')
      })

      test('ingredients are unselected by default', () => {
        const secondRecipe = getHelpLayout.find('ItemExpandable').at(1)
        secondRecipe.find('Item').simulate('click')
        const ingredientsCheckboxes = wrapper.find('input[type="checkbox"]')

        expect(ingredientsCheckboxes).toHaveLength(2)
        expect(ingredientsCheckboxes.at(0).prop('checked')).toBeFalsy()
        expect(ingredientsCheckboxes.at(1).prop('checked')).toBeFalsy()
      })

      test('ingredients retain the selection state when thy are collapsed and then expanded', () => {
        const secondRecipe = wrapper.find('ItemExpandable').at(1)
        secondRecipe.find('Item').simulate('click')
        let ingredientsCheckboxes = wrapper.find('input[type="checkbox"]')
        ingredientsCheckboxes.at(1).simulate('change')
        ingredientsCheckboxes = wrapper.find('input[type="checkbox"]')

        expect(ingredientsCheckboxes.at(1).prop('checked')).toBeTruthy()

        secondRecipe.find('Item').simulate('click')
        secondRecipe.find('Item').simulate('click')
        ingredientsCheckboxes = wrapper.find('input[type="checkbox"]')

        expect(ingredientsCheckboxes.at(1).prop('checked')).toBeTruthy()
      })

      test('when ingredient checkbox is selected, a trackSelectIngredient is called with correct data', () => {
        const secondRecipe = wrapper.find('ItemExpandable').at(1)
        secondRecipe.find('Item').simulate('click')
        const ingredientsCheckboxes = wrapper.find('input[type="checkbox"]')
        ingredientsCheckboxes.at(1).simulate('change')

        expect(trackSelectIngredient).toHaveBeenCalledWith('pasta')
      })

      test('when ingredient checkbox changes from selected to unselected, a trackDeselectIngredient is called with correct data', () => {
        const secondRecipe = wrapper.find('ItemExpandable').at(1)
        secondRecipe.find('Item').simulate('click')
        const ingredientsCheckboxes = wrapper.find('input[type="checkbox"]')
        ingredientsCheckboxes.at(1).simulate('change')
        ingredientsCheckboxes.at(1).simulate('change')

        expect(trackDeselectIngredient).toHaveBeenCalledWith('pasta')
      })
    })

    describe('Continue button', () => {
      beforeEach(() => {
        wrapper = mount(
          <Provider store={store}>
            <Ingredients {...PROPS} />
          </Provider>
        )
        continueButton = wrapper.find('BottomFixedContentWrapper').find('Button')
        getHelpLayout = wrapper.find('GetHelpLayout')
      })

      const selectIngredientAndGetCheckbox = (ingredientsWrapper) => {
        const recipe = ingredientsWrapper.find('ItemExpandable').at(1)
        recipe.find('Item').simulate('click')
        let ingredientCheckbox = ingredientsWrapper.find('ItemExpandable').at(1)
          .find('input[type="checkbox"]').at(1)
        ingredientCheckbox.simulate('change')
        ingredientCheckbox = ingredientsWrapper.find('ItemExpandable').at(1)
          .find('input[type="checkbox"]').at(1)

        return ingredientCheckbox
      }

      test('the button is enabled only when one or more ingredients are selected', () => {
        const ingredientCheckbox = selectIngredientAndGetCheckbox(wrapper)
        continueButton = wrapper.find('BottomFixedContentWrapper').find('Button')
        expect(continueButton.prop('disabled')).toBe(false)

        ingredientCheckbox.simulate('change')
        continueButton = wrapper.find('BottomFixedContentWrapper').find('Button')

        expect(continueButton.prop('disabled')).toBe(true)
      })

      test('validateIngredients is called with the selected ingredients when clicking the button', () => {
        selectIngredientAndGetCheckbox(wrapper)
        continueButton.prop('onClick')()

        expect(validateSelectedIngredients).toHaveBeenCalledTimes(1)
        expect(validateSelectedIngredients).toHaveBeenCalledWith({
          accessToken: 'user-access-token',
          costumerId: '777',
          ingredientUuids: ['2222'],
          orderId: '888',
        })
      })

      test('redirection to the Ingredient issues page happens when validateIngredients returns a valid response', async () => {
        validateSelectedIngredients.mockResolvedValue({
          status: 'ok',
          data: {
            valid: true,
          }
        })
        selectIngredientAndGetCheckbox(wrapper)
        await continueButton.prop('onClick')()

        expect(browserHistory.push).toHaveBeenCalledWith('/get-help/ingredient-issues')
      })

      test('redirection to the Contact Us page happens when validateIngredients errors', async () => {
        validateSelectedIngredients.mockImplementation(() => { throw new Error('error') })
        selectIngredientAndGetCheckbox(wrapper)
        await continueButton.prop('onClick')()

        expect(browserHistory.push).toHaveBeenCalledWith('/get-help/contact')
      })

      test('when validated it calls store ingredient ids action', async () => {
        validateSelectedIngredients.mockResolvedValue({
          status: 'ok',
          data: {
            valid: true,
          }
        })

        selectIngredientAndGetCheckbox(wrapper)
        await continueButton.prop('onClick')()

        expect(storeSelectedIngredients).toHaveBeenCalledWith([
          { ingredientUuid: '2222', label: 'pasta', recipeId: '2' }
        ])
      })
    })

    describe('when component mounts', () => {
      describe('and order ID is present', () => {
        beforeEach(() => {
          wrapper = mount(
            <Provider store={store}>
              <Ingredients {...PROPS} />
            </Provider>
          )
        })

        test('calls validate order endpoint', () => {
          expect(validateLatestOrder).toHaveBeenCalledWith(
            { accessToken: 'user-access-token', costumerId: '777', orderId: '888' }
          )
        })
      })

      describe('and order validation errors', () => {
        beforeEach(() => {
          wrapper = mount(
            <Ingredients
              {...PROPS}
            />
          )
          wrapper.setProps({ isOrderValidationError: true })
        })

        test('redirects to /contact', () => {
          expect(browserHistory.push).toHaveBeenCalledWith('/get-help/contact')
        })
      })

      describe('and order validation errors is multiComplaintLimitReachedLastFourWeeks', () => {
        beforeEach(() => {
          wrapper = mount(
            <Ingredients
              {...PROPS}
            />
          )
          wrapper.setProps({ isMultiComplaintLimitReachedLastFourWeeks: true })
        })

        test('redirects to /multiple-ingredients-issues', () => {
          expect(browserHistory.push).toHaveBeenCalledWith('/get-help/multiple-ingredients-issues')
        })
      })

      describe('and order validation is pending', () => {
        beforeEach(() => {
          wrapper = mount(
            <Provider store={store}>
              <Ingredients {...PROPS} isValidateOrderLoading />
            </Provider>
          )
        })

        test('the <IngredientsPresentation /> is not rendered', () => {
          expect(wrapper.find('IngredientsPresentation').length).toBe(0)
        })

        test('the <Loading /> is being rendered', () => {
          expect(wrapper.find('Loading').length).toBe(1)
        })
      })
    })
  })
})
