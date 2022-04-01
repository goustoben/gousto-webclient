import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { RecipeList } from './RecipeList'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('<RecipeList />', () => {
  let wrapper
  const defaultProps = {
    view: 'desktop',
    recipes: Immutable.fromJS({
      4: 1,
      2726: 2,
    }),
    maxRecipesNum: 4,
    menuRecipesStore: Immutable.Map({}),
    invisible: false,
    detailVisibilityChange: () => {},
    boxDetailsVisibilityChange: () => {},
    boxSummaryVisible: false,
    browser: 'desktop',
  }

  beforeEach(() => {
    useSelector.mockReturnValue(true)
    useDispatch.mockReturnValue(() => {})
  })

  describe('RecipeList renders with 3 recipes already selected', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })
    beforeEach(() => {
      wrapper = shallow(<RecipeList {...defaultProps} />)
    })

    test('should return 3 filled recipe slots', () => {
      const filledSlots = wrapper.findWhere(n => n.name() === 'RecipeHolder' && !n.prop('data-testing'))
      expect(filledSlots).toHaveLength(3)
    })

    test('should return 1 non-filled recipe slots', () => {
      const emptyHolder = wrapper.findWhere(n => n.name() === 'RecipeHolder' && n.prop('data-testing') === 'empty')
      expect(emptyHolder).toHaveLength(1)
    })
  })
})
