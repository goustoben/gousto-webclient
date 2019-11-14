import React from 'react'
import { shallow } from 'enzyme'
import { OrderDetails } from './OrderDetails'

describe('the OrderDetails component', () => {
  let wrapper
  const HEADING = 'Test heading'
  const PRIMARY_MESSAGE = 'Most important message'
  const SECONDARY_MESSAGE = 'Less important message'
  const FALLBACK_MESSAGE = 'The fallback message'

  beforeEach(() => {
    wrapper = shallow(
      <OrderDetails
        heading={HEADING}
        messagePrimary={PRIMARY_MESSAGE}
        messageSecondary={SECONDARY_MESSAGE}
        fallbackMessage={FALLBACK_MESSAGE}
      />
    )
  })

  test('renders the heading', () => {
    expect(wrapper.html().includes(HEADING)).toBe(true)
  })

  describe('when both message props are passed', () => {
    test('renders the primary message', () => {
      expect(wrapper.html().includes(PRIMARY_MESSAGE)).toBe(true)
    })

    test('renders the secondary message', () => {
      expect(wrapper.html().includes(SECONDARY_MESSAGE)).toBe(true)
    })
  })

  describe('when there is no secondary message', () => {
    beforeEach(() => {
      wrapper.setProps({ messageSecondary: '' })
    })

    test('does not render the secondary message paragraph', () => {
      expect(wrapper.find('.messageSecondary').exists()).toBe(false)
    })
  })
})
