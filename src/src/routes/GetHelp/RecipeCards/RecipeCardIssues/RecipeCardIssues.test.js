import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { RecipeCardIssues } from './RecipeCardIssues'

describe('RecipeCardIssues', () => {
  let wrapper

  const ORDER_ID = '123456'
  const USER_ID = '7891011'
  const PARAMS = {
    userId: USER_ID,
    orderId: ORDER_ID
  }
  const SELECTED_RECIPES = [{
    id: '1',
    title: 'test 1',
    imageUrl: 'imageurl-for-test-1',
    ingredients: [{ uuid: '1', label: 'test' }],
    url: 'https://test-1.com'
  },
  {
    id: '2',
    title: 'test 2',
    imageUrl: 'imageurl-for-test-1',
    ingredients: [{ uuid: '2', label: 'test' }, { uuid: '2222', label: 'test2' }],
    url: 'https://test-2.com',
  }]
  const setRecipeCardRequestWithIssueReasons = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <RecipeCardIssues
        params={PARAMS}
        selectedRecipeCardsDetails={SELECTED_RECIPES}
        setRecipeCardRequestWithIssueReasons={setRecipeCardRequestWithIssueReasons}
        didRequestError={false}
        cleanErrorForRecipeCards={jest.fn()}
      />
    )
  })

  test('renders heading text', () => {
    expect(wrapper.find('GetHelpLayout2').prop('headingText')).toBe('What was the issue with the recipe cards?')
  })

  test('renders hasBackButton is true in the layout', () => {
    expect(wrapper.find('GetHelpLayout2').prop('hasBackButton')).toBe(true)
  })

  test('renders the right number of recipes', () => {
    expect(wrapper.find('.recipeRadioButtonGroup').length).toBe(2)
  })

  test('renders the image and recipe titles for the first recipe', () => {
    expect(wrapper.find('.recipeImage').at(0).prop('src')).toBe(SELECTED_RECIPES[0].imageUrl)
    expect(wrapper.find('.recipeTitle').at(0).text()).toBe(SELECTED_RECIPES[0].title)
  })

  test('renders first and second radio button with correct ids', () => {
    expect(wrapper.find('InputRadio').at(0).prop('id')).toBe(`${SELECTED_RECIPES[0].id}-missing`)
    expect(wrapper.find('InputRadio').at(1).prop('id')).toBe(`${SELECTED_RECIPES[0].id}-wrong`)
  })

  test('renders radio buttons with the correct text', () => {
    expect(wrapper.find('InputRadio').at(0).text()).toBe('Missing')
    expect(wrapper.find('InputRadio').at(1).text()).toBe('Wrong')
  })

  test('bottom bar button is rendering correctly', () => {
    expect(wrapper.find('CTA').text()).toBe('Confirm')
  })

  test('bottom bar button is disabled', () => {
    expect(wrapper.find('CTA').prop('isDisabled')).toBe(true)
  })

  describe('When one issue is selected', () => {
    beforeEach(() => {
      act(() => {
        wrapper.find('InputRadio').at(0).prop('onChange')({ target: { value: '1' } })
      })
      wrapper.update()
    })

    test('the issue is selected', () => {
      expect(wrapper.find('InputRadio').at(0).prop('isChecked')).toBe(true)
    })

    test('the CTA is disabled', () => {
      expect(wrapper.find('CTA').prop('isDisabled')).toBe(true)
    })
  })

  describe('When all recipes have the issue selected', () => {
    beforeEach(() => {
      act(() => {
        wrapper.find('InputRadio').at(0).prop('onChange')({ target: { value: '1' } })
      })
      wrapper.update()

      act(() => {
        wrapper.find('InputRadio').at(2).prop('onChange')({ target: { value: '1' } })
      })
      wrapper.update()
    })

    test('the issues are selected', () => {
      expect(wrapper.find('InputRadio').at(0).prop('isChecked')).toBe(true)
      expect(wrapper.find('InputRadio').at(2).prop('isChecked')).toBe(true)
    })

    test('the CTA is enabled', () => {
      expect(wrapper.find('CTA').prop('isDisabled')).toBe(false)
    })
  })

  describe('When recipe cards request errors', () => {
    beforeEach(() => {
      wrapper.setProps({ didRequestError: true })
    })

    test('renders Error component', () => {
      expect(wrapper.find('Error').exists()).toBe(true)
    })

    test('does not render RecipeCardIssues GetHelpLayout2 component', () => {
      expect(wrapper.find('GetHelpLayout2').exists()).toBe(false)
    })
  })
})
