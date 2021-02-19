import React from 'react'
import { shallow } from 'enzyme'
import { CategoriesHeader } from './CategoriesHeader'

describe('CategoriesHeader', () => {
  let wrapper
  const props = {
    categoryTitle: 'Vegetarian',
  }

  describe('the appearance', () => {
    beforeEach(() => {
      wrapper = shallow(<CategoriesHeader {...props} />)
    })

    test('renders back button', () => {
      expect(wrapper.find('CTABack').prop('label')).toBe('Back')
      expect(wrapper.find('CTABack').prop('url')).toBe(null)
    })

    test('renders one category title', () => {
      expect(wrapper.find('.title')).toHaveLength(1)
    })

    test('renders one category title', () => {
      expect(wrapper.find('.title').text()).toEqual('Vegetarian')
    })

    describe('when no categoryTitle', () => {
      beforeEach(() => {
        wrapper = shallow(<CategoriesHeader />)
      })

      test('should return null', () => {
        expect(wrapper.type()).toEqual(null)
      })
    })
  })
})
