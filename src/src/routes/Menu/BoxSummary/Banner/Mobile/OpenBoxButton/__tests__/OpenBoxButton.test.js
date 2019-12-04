import React from 'react'
import { shallow } from 'enzyme'
import { OpenBoxButton } from '../OpenBoxButton'

describe('OpenBoxButton', () => {
  describe('when arrowUp is true', () => {
    test('should render arrowUp icon', () => {
      const wrapper = shallow(<OpenBoxButton arrowUp />)
      expect(wrapper.find('.arrowUp')).toHaveLength(1)
    })
  })

  describe('when arrowUp is false', () => {
    test('should render arrowDown icon', () => {
      const wrapper = shallow(<OpenBoxButton arrowUp={false} />)
      expect(wrapper.find('.arrowDown')).toHaveLength(1)
    })
  })
})
