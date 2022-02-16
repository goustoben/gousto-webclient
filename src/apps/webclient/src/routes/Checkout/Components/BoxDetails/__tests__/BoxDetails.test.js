import { render } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'
import { BoxDetails } from 'routes/Checkout/Components/BoxDetails/BoxDetails'

jest.mock('routes/Checkout/Components/RecipeSummary', () => ({
  RecipeSummary: () => {
    const MockRecipeSummary = 'mock-recipe-summary'

    return <MockRecipeSummary />
  },
}))

describe('BoxDetails', () => {
  let wrapper

  beforeEach(() => {
    const deliveryDays = Immutable.fromJS({
      '2016-06-26': {
        slots: [
          {
            id: 'slot1',
            deliveryStartTime: '08:00:00',
            deliveryEndTime: '12:00:00',
          },
        ],
      },
    })
    wrapper = render(
      <BoxDetails numPortions={2} date="2016-06-26" deliveryDays={deliveryDays} slotId="slot1" />
    )
  })

  test('should have 1 RecipeSummary', () => {
    expect(wrapper.find('mock-recipe-summary').length).toEqual(1)
  })

  test('should render the correct "Your box" header', () => {
    expect(wrapper.find('h6').length).toEqual(2)
    expect(wrapper.find('h6').first().text()).toEqual('Your box (2 people)')
  })

  test('should render a "Delivery date" header', () => {
    expect(wrapper.find('h6').last().text()).toEqual('Delivery date')
  })

  test('should render a link to edit order', () => {
    expect(wrapper.find('a').length).toEqual(1)
    expect(wrapper.find('a').text()).toEqual('Edit order')
    expect(wrapper.find('a').prop('href')).toEqual('/menu')
  })

  test('should render the correctly formatted delivery date', () => {
    expect(wrapper.text().includes('Sunday 26th June')).toBe(true)
  })

  test('should render the correctly formatted delivery time', () => {
    expect(wrapper.text().includes('8am - 12pm')).toBe(true)
  })
})
