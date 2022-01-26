import React from 'react'
import { shallow } from 'enzyme'
import { YourBoxDetails } from '../YourBoxDetails'

describe('YourBoxDetails', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<YourBoxDetails />)
  })

  test('should render title without numPortions', () => {
    expect(wrapper.find('h3').text()).toBe('Your box')
  })

  test('should render Number of people properly', () => {
    expect(wrapper.find('h4').first().text()).toBe('Number of people')
    expect(wrapper.find('p').first().text()).toBe('0 people')
    wrapper.setProps({
      numPortions: 2,
    })
    expect(wrapper.find('p').first().text()).toBe('2 people')
  })

  test('should render Number of recipes properly', () => {
    expect(wrapper.find('h4').last().text()).toBe('Number of recipes')
    expect(wrapper.find('p').last().text()).toBe('0 recipes')
    wrapper.setProps({
      numRecipes: 3,
    })
    expect(wrapper.find('p').last().text()).toBe('3 recipes')
  })
})
