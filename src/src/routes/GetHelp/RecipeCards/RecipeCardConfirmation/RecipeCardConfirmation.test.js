import React from 'react'
import { mount } from 'enzyme'
import { client as routes } from 'config/routes'
import { safeJestMock } from '_testing/mocks'
import * as windowUtils from 'utils/window'
import { RecipeCardConfirmation } from './RecipeCardConfirmation'

const SELECTED_ADDRESS = {
  id: '1',
  line1: 'Flat 6',
  line2: '8 Some Road',
  line3: '',
  name: 'New Home',
  postcode: 'W5 3PB',
  town: 'London',
}

const RECIPE_CARDS = [{
  id: '385',
  title: 'Indonesian-Style Lamb & Green Bean Curry With Rice',
  ingredients: [
    {
      uuid: '3c07d126-f655-437c-aa1d-c38dbbae0398',
      label: '8ml soy sauce',
      urls: [
        {
          url: 'ingredient-soy-image-url',
          width: 50,
        },
      ]
    },
  ],
  goustoReference: '354',
}]

describe('RecipeCardConfirmation', () => {
  let wrapper
  const trackPrintedRecipeCardClickDone = jest.fn()
  const trackPrintedRecipeCardClickCookbook = jest.fn()
  const trackPrintedRecipeCardClickRecipe = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <RecipeCardConfirmation
        selectedAddress={SELECTED_ADDRESS}
        recipeCardsDetails={RECIPE_CARDS}
        trackPrintedRecipeCardClickDone={trackPrintedRecipeCardClickDone}
        trackPrintedRecipeCardClickCookbook={trackPrintedRecipeCardClickCookbook}
        trackPrintedRecipeCardClickRecipe={trackPrintedRecipeCardClickRecipe}
      />
    )
  })

  test('renders the right page title', () => {
    expect(wrapper.find('GetHelpLayout2').prop('headingText'))
      .toBe('We’re so sorry about the issue with your recipe card')
  })

  test('renders the Card', () => {
    expect(wrapper.find('Card').exists()).toBe(true)
  })

  test('renderes the Alert with icon-cookbook', () => {
    expect(wrapper.find('.alertIconWrapper > Svg').prop('fileName')).toEqual('icon-cookbook')
  })

  test('renderes the Alert with confirmation copy', () => {
    expect(wrapper.find('.confirmationCopy').text()).toEqual('Recipe card confirmedDelivered in 5-7 working days')
  })

  test('renderes the confirmation address text', () => {
    expect(wrapper.find('.confirmationAddress').text()).toEqual('We are pleased to confirm that your printed recipe card will arrive in 5-7 working days, at New Home, Flat 6, 8 Some Road, London, W5 3PB')
  })

  test('renders the same number of links as recipe selected', () => {
    expect(wrapper.find('GoustoLink .recipeCookbookLink').length).toBe(RECIPE_CARDS.length)
  })

  test('renders the cookbook links for the selected recipes', () => {
    expect(wrapper.find('GoustoLink .recipeCookbookLink').prop('to')).toEqual(`/cookbook/recipe-by-id/${RECIPE_CARDS[0].id}`)
  })

  test('cookbook links dispatch a tracking action when clicked', () => {
    wrapper.find('GoustoLink .recipeCookbookLink').at(0).simulate('click')
    expect(trackPrintedRecipeCardClickRecipe).toHaveBeenCalled()
  })

  test('renders CTA buttons', () => {
    expect(wrapper.find('[testingSelector="doneCTA"]').exists()).toBe(true)
    expect(wrapper.find('[testingSelector="goToCookbookCTA"]').exists()).toBe(true)
  })

  describe('when Done CTA is clicked', () => {
    beforeEach(() => {
      delete window.location
      window.location = { assign: jest.fn() }

      wrapper.find('[testingSelector="doneCTA"]').simulate('click')
    })

    test('calls trackClickGetHelpWithThisBox with orderId', () => {
      expect(trackPrintedRecipeCardClickDone).toHaveBeenCalled()
    })

    test('redirects to My Gousto page', () => {
      expect(window.location.assign).toHaveBeenCalledWith(routes.myGousto)
    })
  })

  describe('when View Cookbook CTA is clicked', () => {
    const windowOpen = safeJestMock(windowUtils, 'windowOpen')

    beforeEach(() => {
      wrapper.find('[testingSelector="goToCookbookCTA"]').simulate('click')
    })

    test('calls trackPrintedRecipeCardClickCookbook with orderId', () => {
      expect(trackPrintedRecipeCardClickCookbook).toHaveBeenCalled()
    })

    test('opens the cookbook url', () => {
      expect(windowOpen).toHaveBeenCalledWith(routes.cookbook)
    })
  })
})
