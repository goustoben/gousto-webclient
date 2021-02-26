import React from 'react'
import { shallow } from 'enzyme'

import { CookingTimeIcon } from './CookingTimeIcon'

describe('CookingTimeIcon', () => {
  describe('when given null cookingTime', () => {
    test('should return null', () => {
      const wrapper = shallow(<CookingTimeIcon cookingTime={null} />)

      expect(wrapper.getElement()).toBe(null)
    })
  })

  describe('when given zero cooking time', () => {
    test('should return null', () => {
      const wrapper = shallow(<CookingTimeIcon cookingTime={0} />)

      expect(wrapper.getElement()).toBe(null)
    })
  })

  describe('when given 30 cooking time', () => {
    test('should find cooking time icon', () => {
      const wrapper = shallow(<CookingTimeIcon cookingTime={30} />)

      expect(wrapper.find('div').first().prop('className')).toEqual('cookingTimeIcon')
    })
  })

  describe('when pushUp is true', () => {
    test('should have class pushUp', () => {
      const wrapper = shallow(<CookingTimeIcon cookingTime={30} pushUp />)

      expect(wrapper.find('div').first().prop('className')).toEqual('cookingTimeIcon pushUp')
    })
  })

  describe('when pushUp is false', () => {
    test('should not have class pushUp', () => {
      const wrapper = shallow(<CookingTimeIcon cookingTime={30} pushUp={false} />)

      expect(wrapper.find('div').first().prop('className')).toEqual('cookingTimeIcon')
    })
  })
})
