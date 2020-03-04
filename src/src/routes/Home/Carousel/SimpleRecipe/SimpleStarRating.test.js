import React from 'react'
import { shallow } from 'enzyme'
import { SimpleStarRating } from './SimpleStarRating'

describe('<SimpleStarRating />', () => {
  let count
  let average
  let wrapper
  describe('when the count of ratings is more than 0 ', () => {
    beforeEach(() => {
      count = 1
      average = 2
      wrapper = shallow(<SimpleStarRating count={count} average={average} />)
    })
    test('then it should have one span child with className of .ratingContainer', () => {
      expect(wrapper.find('.ratingContainer').length).toEqual(1)
    })
  })

  describe('when the ratings count is 0', () => {
    beforeEach(() => {
      count = 0
      average = 0
      wrapper = shallow(<SimpleStarRating count={count} average={average} />)
    })
    test('then it should return null', () => {
      expect(wrapper.type()).toBe(null)
    })
  })

  describe('when the average rating is between .5 and 1', () => {
    beforeEach(() => {
      count = 1
      average = 2.62
      wrapper = shallow(<SimpleStarRating count={count} average={average} />)
    })
    test('then it should have one .starHalf in the rating', () => {
      expect(wrapper.find('.starHalf').length).toEqual(1)
    })
  })

  describe('when the average rating is between 0 and .5', () => {
    beforeEach(() => {
      count = 1
      average = 2.32
      wrapper = shallow(<SimpleStarRating count={count} average={average} />)
    })
    test('then it should not have a .starHalf in the rating', () => {
      expect(wrapper.find('.starHalf').length).toEqual(0)
    })
  })
})
