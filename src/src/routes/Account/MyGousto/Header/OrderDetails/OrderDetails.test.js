import React from 'react'
import { shallow } from 'enzyme'
import { OrderDetails } from './OrderDetails'

describe('the OrderDetails component', () => {
  let wrapper
  const HEADING = 'Test heading'
  const CONTENT = 'Most important message'

  beforeEach(() => {
    wrapper = shallow(
      <OrderDetails
        heading={HEADING}
      >
        {CONTENT}
      </OrderDetails>
    )
  })

  test('renders the heading', () => {
    expect(wrapper.html().includes(HEADING)).toBe(true)
  })

  test('renders the content', () => {
    expect(wrapper.html().includes(CONTENT)).toBe(true)
  })
})
