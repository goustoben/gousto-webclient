import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { isAvailableRecipeList } from 'utils/recipe'

import { RecipeList } from '../../Details/RecipeList'

jest.mock('goustouicomponents', () => ({
  LayoutContentWrapper: () => <div />,
}))

jest.mock('../../Details/UnavailableMessage', () => ({
  UnavailableMessage: () => <div />,
}))

jest.mock('Item', () => <div />)

jest.mock('utils/recipe', () => ({
  isAvailableRecipeList: jest.fn(),
}))

describe('RecipeList', () => {
  let wrapper
  const defaultProps = {
    basketRecipes: Immutable.Map(),
    menuFetchPending: false,
    numPortions: 2,
    okRecipeIds: Immutable.Map(),
    onRemove: () => {},
    orderSaveError: '',
    recipesStore: Immutable.Map(),
    showRecipeDetailsOnClick: () => {},
    unavailableRecipeIds: Immutable.Map({}),
    basketRestorePreviousDate: () => {},
    clearSlot: () => {},
    trackingUnavailableRecipeList: () => {},
  }
  beforeEach(() => {
    isAvailableRecipeList.mockReturnValue(Immutable.fromJS({}))
    wrapper = shallow(<RecipeList {...defaultProps} />)
  })
  test('should render LayoutContentWrapper', () => {
    expect(wrapper.find('LayoutContentWrapper')).toHaveLength(1)
  })

  test('should render UnavailableMessage', () => {
    expect(wrapper.find('UnavailableMessage')).toHaveLength(1)
  })

  describe('when has unavailableRecipeList and not menuFetchPending', () => {
    const trackingUnavailableRecipeListSpy = jest.fn()
    beforeEach(() => {
      isAvailableRecipeList.mockImplementation((param) => param)
      wrapper = shallow(
        <RecipeList
          {...defaultProps}
          menuFetchPending={false}
          unavailableRecipeIds={Immutable.fromJS({
            '123dss': {
              id: '123dss',
              media: {},
            },
          })}
          trackingUnavailableRecipeList={trackingUnavailableRecipeListSpy}
        />,
      )
    })
    test('should call trackingUnavailableRecipeList', () => {
      expect(trackingUnavailableRecipeListSpy).toHaveBeenCalledTimes(1)
    })
  })
})
