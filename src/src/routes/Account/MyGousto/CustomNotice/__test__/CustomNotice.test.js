import React from 'react'
import { mount } from 'enzyme'
import { CustomNotice } from '../CustomNotice'

describe('given CustomNotice is rendered', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<CustomNotice />)
  })

  test('a <Alert /> is added correctly', () => {
    expect(wrapper.find('Alert').prop('type')).toBe('info')
  })

  test('a <Heading /> is added correctly', () => {
    expect(wrapper.find('Heading').prop('type')).toBe('h3')
  })

  test('the title is correct', () => {
    expect(wrapper.find('Heading').text()).toBe("We're having a small technical issue displaying your pending order")
  })

  test('the copy is correct', () => {
    expect(wrapper.find('Alert p').text()).toBe(
      "Don't worry, we're working hard to get this fixed and everything will be up and running as soon as possible. Please check back tomorrow to choose your recipes as normal."
    )
  })
})
