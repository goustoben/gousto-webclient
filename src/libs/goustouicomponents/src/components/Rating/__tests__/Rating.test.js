import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { Rating } from '../index'

describe('<Rating />', () => {
  let wrapper
  const props = {
    size: 'Medium',
    average: 4,
    amountOfReviews: 30,
  }

  beforeEach(() => {
    wrapper = mount(<Rating {...props} />)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Rating {...props} />, div)
  })

  describe('when average is integer', () => {
    test('should have 4 full stars and 1 empty', () => {
      expect(wrapper.find('.starFull')).toHaveLength(4)
      expect(wrapper.find('.starEmpty')).toHaveLength(1)
    })
  })

  describe('when average is floating', () => {
    describe('and has a value from interval [3, 3.4]', () => {
      beforeEach(() => {
        wrapper.setProps({ average: 3.3 })
      })

      test('then should render 3 full stars and 2 empty', () => {
        expect(wrapper.find('.starFull')).toHaveLength(3)
        expect(wrapper.find('.starEmpty')).toHaveLength(2)
      })
    })

    describe('and has a value from interval [4.5, 4.9]', () => {
      beforeEach(() => {
        wrapper.setProps({ average: 4.6 })
      })

      test('then should render 3 full stars and 1 half', () => {
        expect(wrapper.find('.starFull')).toHaveLength(4)
        expect(wrapper.find('.starHalf')).toHaveLength(1)
      })
    })
  })

  describe('when negative values are passed for average and amountOfReviews props', () => {
    beforeEach(() => {
      wrapper.setProps({
        amountOfReviews: -400,
        average: -5,
      })
    })

    test('then .review should have "0 reviews" and 5 empty stars', () => {
      expect(wrapper.find('.reviews').text()).toBe('0 reviews')
      expect(wrapper.find('.starEmpty')).toHaveLength(5)
    })
  })

  describe('when average is greater than 5', () => {
    beforeEach(() => {
      wrapper.setProps({ average: 10 })
    })

    test('then should have 5 full stars', () => {
      expect(wrapper.find('.starFull')).toHaveLength(5)
    })
  })
})
