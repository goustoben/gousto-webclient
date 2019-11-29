import React from 'react'
import { mount } from 'enzyme'
import { OrderAddOnsHeader } from './OrderAddOnsHeader'

describe('the OrderAddOnsHeader component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <OrderAddOnsHeader
        numberOfProducts={10}
        onClickSkip={() => {}}
      />
    )
  })

  test('renders the primary heading', () => {
    expect(wrapper.find('Heading').at(0).text()).toBe('You may also like')
  })

  test('renders the number of products as a secondary heading', () => {
    expect(wrapper.find('Heading').at(1).text()).toBe('(10 products)')
  })

  test('renders a button to skip the add-ons page', () => {
    expect(wrapper.find('.skipButton').text()).toBe('Skip')
  })

  describe('when clicking the skip button', () => {
    const mockSkip = jest.fn()

    beforeEach(() => {
      wrapper = mount(
        <OrderAddOnsHeader
          numberOfProducts={10}
          onClickSkip={mockSkip}
        />
      )

      wrapper.find('.skipButton').simulate('click')
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('calls the onClickSkip function', () => {
      expect(mockSkip).toHaveBeenCalledTimes(1)
    })
  })
})

