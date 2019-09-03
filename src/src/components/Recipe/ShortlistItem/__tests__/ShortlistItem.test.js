import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import Svg from 'Svg'
import { isAvailableRecipeList } from 'utils/recipe'
import ShortlistItem from '../ShortlistItem'

jest.mock('utils/recipe', () => ({
  isAvailableRecipeList: jest.fn()
}))

describe('ShortlistItem', () => {
  let wrapper

  describe('Render', () => {
    const shortlistIds = Immutable.Map({'123': 1})
    const recipesStore = Immutable.Map({'123': Immutable.Map({"id": "123"}), '1': Immutable.Map({"id": "1"})})

    test('should return one Item if shortlist has one recipe', () => {
      isAvailableRecipeList.mockReturnValue(Immutable.Map({'123': Immutable.Map({"id": "123", 'media': Immutable.Map({})})}))
      wrapper = shallow(<ShortlistItem shortlistIds={shortlistIds} recipesStore={recipesStore}/>)
      expect(wrapper.find('Item')).toHaveLength(1)
    })

    test('should return shortlist text if no recipes in shortlist', () => {
      isAvailableRecipeList.mockReturnValue(Immutable.Map({}))
      wrapper = shallow(<ShortlistItem shortlistIds={shortlistIds} recipesStore={recipesStore}/>)
      expect(wrapper.find('.educationHeader')).toHaveLength(1)
    })
  })
})
