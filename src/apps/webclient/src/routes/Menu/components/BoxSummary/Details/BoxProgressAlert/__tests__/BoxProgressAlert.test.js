import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { useSelector, useDispatch } from 'react-redux'
import { BoxProgressAlert } from '../BoxProgressAlert'

jest.mock('components/PricePerServingMessage', () => ({
  PricePerServingMessage: () => <div>PricePerServingMessage</div>,
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

const maxRecipesNum = 4
const minRecipesNum = 2

jest.mock('routes/Menu/domains/basket/internal/useSupportedBoxTypes', () => ({
  useSupportedBoxTypes: () => ({
    maxRecipesForPortion: jest.fn().mockImplementation(() => maxRecipesNum),
    minRecipesForPortion: jest.fn().mockImplementation(() => minRecipesNum),
  }),
}))

describe('<BoxProgressAlert', () => {
  beforeEach(() => {
    useSelector.mockReturnValue(true)
    useDispatch.mockReturnValue(() => {})
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BoxProgressAlert numRecipes={0} />, div)
  })

  describe('when mounted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(<BoxProgressAlert numRecipes={0} />)
    })

    test('renders a progress message', () => {
      expect(wrapper.find('BoxProgressMessage')).toHaveLength(1)
    })

    test('wraps an Alert within a data-testing container', () => {
      expect(wrapper.find('Alert').parent().prop('data-testing')).toBe('boxProgressAlert')
    })

    describe('and fewer than the maximum number of recipes are selected', () => {
      test('renders an info alert', () => {
        expect(wrapper.find('Alert').prop('type')).toBe('info')
      })
    })

    describe('and the maximum number of recipes are selected', () => {
      beforeEach(() => {
        wrapper.setProps({ numRecipes: maxRecipesNum })
      })

      test('renders a success alert', () => {
        expect(wrapper.find('Alert').prop('type')).toBe('success')
      })
    })
  })
})
