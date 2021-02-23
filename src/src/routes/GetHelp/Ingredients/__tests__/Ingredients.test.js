import React from 'react'
import { mount } from 'enzyme'
import { browserHistory } from 'react-router'
import { Ingredients } from 'routes/GetHelp/Ingredients/Ingredients.logic'

jest.mock('apis/getHelp')

describe('<Ingredients />', () => {
  const content = {
    title: 'test title',
    body: 'text...',
    button1Copy: 'Done',
  }
  const recipes = [
    { id: '1', title: 'test 1', ingredients: [{ uuid: '1', label: 'test' }] },
    {
      id: '2',
      title: 'test 2',
      ingredients: [{ uuid: '1111', label: 'test' }, { uuid: '2222', label: 'test2' }]
    },
    { id: '3', title: 'test 3', ingredients: [{ uuid: '3', label: 'test' }] },
    { id: '4', title: 'test 4', ingredients: [{ uuid: '4', label: 'test' }] },
  ]
  const user = {
    id: '777',
    accessToken: 'user-access-token',
  }
  const order = {
    id: '888',
  }
  let wrapper
  let getHelpLayout

  describe('rendering', () => {
    beforeAll(() => {
      wrapper = mount(
        <Ingredients
          order={order}
          user={user}
          recipes={recipes}
          content={content}
          isOrderValidationError={false}
          isValidateOrderLoading={false}
          storeSelectedIngredients={() => {}}
          trackUserCannotGetCompensation={() => {}}
          validateLatestOrder={() => {}}
          validateSelectedIngredients={() => {}}
        />
      )
      getHelpLayout = wrapper.find('GetHelpLayout')
    })

    test('layout is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomFixedContentWrapper')

      expect(getHelpLayout).toHaveLength(1)
      expect(BottomBar).toHaveLength(1)
      expect(BottomBar.find('Button')).toHaveLength(1)
    })

    test('header is rendering correctly', () => {
      expect(getHelpLayout.prop('title')).toBe(content.title)
    })

    test('body description is redering correctly', () => {
      expect(getHelpLayout.prop('body')).toBe(content.body)
    })

    test('bottom bar buttons is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomFixedContentWrapper')

      expect(BottomBar.find('Button').text()).toContain(content.button1Copy)
    })

    test('the Continue button is disable by default', () => {
      const BottomBar = getHelpLayout.find('BottomFixedContentWrapper')
      const ContinueButton = BottomBar.find('Button')

      expect(ContinueButton.prop('disabled')).toBe(true)
    })

    test('recipes are being displayed', () => {
      const items = getHelpLayout.find('Item')

      expect(items).toHaveLength(4)

      expect(items.at(0).text()).toBe('test 1')
      expect(items.at(1).text()).toBe('test 2')
      expect(items.at(2).text()).toBe('test 3')
      expect(items.at(3).text()).toBe('test 4')
    })

    test('recipe list is being rendered', () => {
      expect(getHelpLayout.find('RecipeList')).toHaveLength(1)
      expect(getHelpLayout.find('RecipeList').prop('recipes')).toBe(recipes)
    })
  })

  describe('behaviour', () => {
    let validateSelectedIngredients
    let storeSelectedIngredients
    let ContinueButton
    const validateLatestOrderSpy = jest.fn().mockResolvedValue(
      { data: { valid: true } }
    )

    beforeEach(() => {
      storeSelectedIngredients = jest.fn()
      validateSelectedIngredients = jest.fn()
      browserHistory.push = jest.fn()
      wrapper = mount(
        <Ingredients
          order={order}
          user={user}
          recipes={recipes}
          content={content}
          isOrderValidationError={false}
          isValidateOrderLoading={false}
          storeSelectedIngredients={storeSelectedIngredients}
          trackUserCannotGetCompensation={() => {}}
          validateLatestOrder={validateLatestOrderSpy}
          validateSelectedIngredients={validateSelectedIngredients}
        />
      )
      getHelpLayout = wrapper.find('GetHelpLayout')
      ContinueButton = wrapper.find('BottomFixedContentWrapper').find('Button')
    })

    describe('ingredients', () => {
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
    })

    describe('Continue button', () => {
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
        ContinueButton = wrapper.find('BottomFixedContentWrapper').find('Button')
        expect(ContinueButton.prop('disabled')).toBe(false)

        ingredientCheckbox.simulate('change')
        ContinueButton = wrapper.find('BottomFixedContentWrapper').find('Button')

        expect(ContinueButton.prop('disabled')).toBe(true)
      })

      test('validateIngredients is called with the selected ingredients when clicking the button', () => {
        selectIngredientAndGetCheckbox(wrapper)
        ContinueButton.prop('onClick')()

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
        await ContinueButton.prop('onClick')()

        expect(browserHistory.push).toHaveBeenCalledWith('/get-help/ingredient-issues')
      })

      test('redirection to the Contact Us page happens when validateIngredients errors', async () => {
        validateSelectedIngredients.mockImplementation(() => { throw new Error('error') })
        selectIngredientAndGetCheckbox(wrapper)
        await ContinueButton.prop('onClick')()

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
        await ContinueButton.prop('onClick')()

        expect(storeSelectedIngredients).toHaveBeenCalledWith([
          { ingredientUuid: '2222', recipeId: '2' }
        ])
      })
    })

    describe('when component mounts', () => {
      test('calls validate order endpoint when order ID is present', () => {
        expect(validateLatestOrderSpy).toHaveBeenCalledWith(
          { accessToken: 'user-access-token', costumerId: '777', orderId: '888' }
        )
      })

      describe('and order validation errors', () => {
        const trackUserCannotGetCompensation = jest.fn()

        beforeEach(() => {
          browserHistory.push = jest.fn()

          wrapper = mount(
            <Ingredients
              order={order}
              user={user}
              recipes={recipes}
              content={content}
              isOrderValidationError={false}
              isValidateOrderLoading={false}
              storeSelectedIngredients={storeSelectedIngredients}
              trackUserCannotGetCompensation={trackUserCannotGetCompensation}
              validateLatestOrder={validateLatestOrderSpy}
              validateSelectedIngredients={validateSelectedIngredients}
            />
          )
          wrapper.setProps({ isOrderValidationError: true })
        })

        test('redirects to /contact if order validation request fails', () => {
          expect(browserHistory.push).toHaveBeenCalledWith('/get-help/contact')
        })
      })

      describe('and order validation is pending', () => {
        beforeEach(() => {
          wrapper.setProps({ isValidateOrderLoading: true })
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
