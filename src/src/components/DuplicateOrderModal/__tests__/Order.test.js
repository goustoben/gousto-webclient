import React from 'react'
import { shallow } from 'enzyme'

import Order from 'DuplicateOrderModal/Order'

describe('DuplicateOrderModal/Order', () => {
  let wrapper
  let date
  let numPeople
  let numRecipes

  beforeEach(() => {
    date = 'some time in the near future'
    numPeople = '12'
    numRecipes = '90'
    wrapper = shallow(
      <Order date={date} numPeople={numPeople} numRecipes={numRecipes} />,
    )
  })

  test('should return a <div>', () => {
    expect(wrapper.type()).toEqual('div')
  })

  test('should contain the given date', () => {
    expect(wrapper.html().indexOf('some time in the near future')).not.toBe(
      -1,
    )
  })

  test('should contain the appropriate numPeople and numRecipes copy', () => {
    expect(wrapper.html().indexOf('90 Recipes for 12 People')).not.toBe(-1)
  })
})
