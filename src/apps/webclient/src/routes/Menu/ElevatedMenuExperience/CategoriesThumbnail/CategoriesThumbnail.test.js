import React from 'react'
import { shallow } from 'enzyme'
import { CategoriesThumbnail} from './CategoriesThumbnail'

describe('CategoriesThumbnail', () => {
  let wrapper
  const props = {
    thumbnail: 'recipe-image-url',
  }

  describe('the appearance', () => {
    beforeEach(() => {
      wrapper = shallow(<CategoriesThumbnail {...props} />)
    })

    test('should render one thumbnail image', () => {
      expect(wrapper.find('.thumbnail').exists()).toBe(true)
    })
  })
})
