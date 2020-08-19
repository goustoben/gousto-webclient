import React from 'react'
import { shallow } from 'enzyme'
import { DeliveryEducationBanner } from 'routes/Checkout/Components/Delivery/DeliveryDetails/DeliveryEducationBanner'

describe('DeliveryEducationBanner', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<DeliveryEducationBanner />)
  })

  test('should renders properly', () => {
    const expectedInsulatedPackaging = 'Insulated packaging keeps your ingredients fresh for up to 12 hours.'
    const expectedDeliverySlot = 'Delivery slot updates on the day via text and email.'

    expect(wrapper.hasClass('deliveryEducationBanner')).toBeTruthy()
    expect(wrapper.find('.deliverySection')).toHaveLength(2)
    expect(wrapper.find('.deliverySection p').at(0).text()).toEqual(expectedInsulatedPackaging)
    expect(wrapper.find('.deliverySection p').at(1).text()).toEqual(expectedDeliverySlot)
  })
})
