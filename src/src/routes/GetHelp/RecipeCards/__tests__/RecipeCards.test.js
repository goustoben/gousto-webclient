import React from 'react'
import { mount } from 'enzyme'
import routes from 'config/routes'
import { RecipeCards } from '../RecipeCards.logic'

jest.mock('../RecipeLinks', () => ({
  RecipeLinksContainer: () => <div />
}))

describe('<RecipeCards />', () => {
  const USER_ID = '1111',
  const ORDER_ID = '1234'
  const TEST_RECIPES = [
    {
      id: '1',
      title: 'test 1',
      ingredients: [{ uuid: '1', label: 'test' }],
      url: 'https://test-1.com'
    },
    {
      id: '2',
      title: 'test 2',
      ingredients: [{ uuid: '2', label: 'test' }, { uuid: '2222', label: 'test2' }],
      url: 'https://test-2.com',
    },
    {
      id: '3',
      title: 'test 3',
      ingredients: [{ uuid: '3', label: 'test' }],
      url: 'https://test-3.com'
    },
    {
      id: '4',
      title: 'test 4',
      ingredients: [{ uuid: '4', label: 'test' }],
      url: 'https://test-4.com'
    },
  ]

  let wrapper
  const trackClickChoosePrintedRecipeCards = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <RecipeCards
        orderId={ORDER_ID}
        recipes={TEST_RECIPES}
        trackClickChoosePrintedRecipeCards={trackClickChoosePrintedRecipeCards}
        userId={USER_ID}
      />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders the right page title', () => {
    expect(wrapper.find('GetHelpLayout2').prop('headingText'))
      .toBe('What recipe card was affected?')
  })

  test('renders a paragraph with the right copy', () => {
    expect(wrapper.find('GetHelpLayout2').find('p').at(0).text())
      .toBe('You will be taken to the recipe steps in the Cookbook')
  })

  test('passes the recipes, userId and orderId to RecipeLinksContainer component', () => {
    const recipeLinks = wrapper.find('RecipeLinksContainer')
    expect(recipeLinks.prop('recipes')).toEqual(TEST_RECIPES)
    expect(recipeLinks.prop('userId')).toEqual(USER_ID)
    expect(recipeLinks.prop('orderId')).toEqual(ORDER_ID)
  })

  describe('in a second card', () => {
    let card

    beforeEach(() => {
      card = wrapper.find('Card').at(1)
    })

    test('renders the right heading', () => {
      expect(card.find('h2').text()).toBe('Do you want printed recipe cards?')
    })

    test('renders the right copy', () => {
      expect(card.find('p').text())
        .toEqual('We can send printed recipe cards but please allow\u00a05-7 working days\u00a0for the cards to arrive.')
    })

    test('renders a CTA with the right text pointing to /recipe-cards/select', () => {
      const link = card.find('GoustoLink')
      expect(link.prop('to'))
        .toBe(routes.client.getHelp.recipeCardsSelect({ userId: USER_ID, orderId: ORDER_ID }))
      expect(link.find('CTA').text()).toBe('Choose printed recipe cards')
    })
  })

  describe('when the Choose Printed CTA is clicked', () => {
    beforeEach(() => {
      wrapper.find('Card').at(1).find('CTA').simulate('click')
    })

    test('trackClickChoosePrintedRecipeCards is called', () => {
      expect(trackClickChoosePrintedRecipeCards).toHaveBeenCalledTimes(1)
    })
  })
})
