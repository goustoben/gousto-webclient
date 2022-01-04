import React from 'react'
import { mount, shallow } from 'enzyme'
import { browserHistory } from 'react-router'
import { RecipeCardsSelect } from './RecipeCardsSelect'

jest.mock('goustouicomponents', () => ({
  BottomFixedContent: ({children}) => children,
  Card: ({children}) => children,
  CTA: ({children}) => children,
  // mock implementation for InputCheck to be able to test logic from onChange
  // eslint-disable-next-line react/prop-types
  InputCheck: ({ onChange, id, defaultValue, label }) => {
    const onInputChange = () => onChange(id, !defaultValue)

    return (
      <div>
        {label}
        <input id={id} type="checkbox" onChange={onInputChange} />
      </div>
    )
  },
  Heading: () => <div />,
  LayoutPageWrapper: ({children}) => children,
}))

jest.mock('react-router', () => ({
  browserHistory: {
    push: jest.fn()
  },
}))

jest.mock('./AddressSection', () => ({
  AddressSectionContainer: () => <div />
}))

describe('RecipeCardsSelect', () => {
  let wrapper
  const USER_ID = '2344'
  const ORDER_ID = '5667'
  const URL_PARAMS = {
    userId: USER_ID,
    orderId: ORDER_ID,
  }
  const RECIPES = [{
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

  beforeEach(() => {
    wrapper = mount(
      <RecipeCardsSelect
        params={URL_PARAMS}
        recipes={RECIPES}
        selectedRecipeCards={[]}
        location={{ query: {} }}
        setSelectedRecipeCards={jest.fn()}
        trackContinueToRecipeCardsIssues={jest.fn()}
      />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders the right page title', () => {
    expect(wrapper.find('GetHelpLayout2').prop('headingText')).toBe('Choose printed recipe cards')
  })
  test('renders the right page sub title', () => {
    expect(wrapper.find('.subTitle').text()).toBe('Printed recipe cards will arrive in 5-7 working days.')
  })

  test('renders the right number of recipes', () => {
    expect(wrapper.find('.recipeCardsList').prop('children').length).toBe(2)
  })

  test('renders the image and recipe titles for the first recipe', () => {
    expect(wrapper.find('.recipeImage').at(0).prop('src')).toBe(RECIPES[0].imageUrl)
    expect(wrapper.find('.recipeTitle').at(0).text()).toBe(RECIPES[0].title)
  })

  test('renders the AddressSectionContainer component', () => {
    expect(wrapper.find('AddressSectionContainer').exists()).toBe(true)
  })

  describe('when no recipe cards selected', () => {
    const setSelectedRecipeCardsMock = jest.fn()
    beforeEach(() => {
      wrapper = mount(
        <RecipeCardsSelect
          params={URL_PARAMS}
          recipes={RECIPES}
          selectedRecipeCards={[]}
          location={{ query: {} }}
          setSelectedRecipeCards={setSelectedRecipeCardsMock}
          trackContinueToRecipeCardsIssues={jest.fn()}
        />)
      wrapper.find('InputCheck input').at(0).simulate('change')
    })

    test('CTA is disabled', () => {
      expect( wrapper.find('CTA').prop('isDisabled')).toBe(true)
    })

    test('and click on first recipe, setSelectedRecipeCardsMock is called with array of selected recipe id', () => {
      expect(setSelectedRecipeCardsMock).toHaveBeenCalledWith(['1'])
    })
  })

  describe('when one recipe cards selected', () => {
    const setSelectedRecipeCardsMock = jest.fn()
    beforeEach(() => {
      wrapper = mount(
        <RecipeCardsSelect
          params={URL_PARAMS}
          recipes={RECIPES}
          selectedRecipeCards={['1']}
          location={{ query: {} }}
          setSelectedRecipeCards={setSelectedRecipeCardsMock}
          trackContinueToRecipeCardsIssues={jest.fn()}
        />)
      wrapper.find('InputCheck input').at(0).simulate('change')
    })

    test('CTA is enabled', () => {
      expect( wrapper.find('CTA').prop('isDisabled')).toBe(false)
    })

    test('and click on the selected recipe, setSelectedRecipeCardsMock is called with empty array', () => {
      expect(setSelectedRecipeCardsMock).toHaveBeenCalledWith([])
    })
  })
  describe('when click on CTA', () => {
    const trackContinueToRecipeCardsIssuesMock = jest.fn()
    beforeEach(() => {
      wrapper = shallow(
        <RecipeCardsSelect
          params={URL_PARAMS}
          recipes={RECIPES}
          selectedRecipeCards={[]}
          location={{ query: {} }}
          setSelectedRecipeCards={jest.fn()}
          trackContinueToRecipeCardsIssues={trackContinueToRecipeCardsIssuesMock}
        />)

      wrapper.find('CTA').simulate('click')
    })

    test('should call browser push with recipe-cards/issues link', () => {
      expect(trackContinueToRecipeCardsIssuesMock).toHaveBeenCalledTimes(1)
    })

    test('should call browser push with recipe-cards/issues link', () => {
      expect(browserHistory.push).toHaveBeenCalledTimes(1)
      expect(browserHistory.push).toHaveBeenCalledWith('/get-help/user/2344/order/5667/recipe-cards/issues')
    })
  })

  describe('when location has query param recipeId', () => {
    const setSelectedRecipeCardsMock = jest.fn()
    beforeEach(() => {
      wrapper = mount(
        <RecipeCardsSelect
          params={URL_PARAMS}
          recipes={RECIPES}
          selectedRecipeCards={[]}
          location={{ query: { recipeId: '1'} }}
          setSelectedRecipeCards={setSelectedRecipeCardsMock}
          trackContinueToRecipeCardsIssues={jest.fn()}
        />)
      wrapper.find('InputCheck input').at(0).simulate('change')
    })

    test('setSelectedRecipeCardsMock is called with the recipeId', () => {
      expect(setSelectedRecipeCardsMock).toHaveBeenCalledWith(['1'])
    })
  })
})
