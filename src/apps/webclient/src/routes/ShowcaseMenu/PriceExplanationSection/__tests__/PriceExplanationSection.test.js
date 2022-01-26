import React from 'react'
import { shallow } from 'enzyme'
import { PriceExplanationSection, message } from '../PriceExplanationSection'

describe('PriceExplanationSection', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PriceExplanationSection />)
  })

  test('renders correctly', () => {
    expect(wrapper.prop('children')).toBe(message)
  })
})
