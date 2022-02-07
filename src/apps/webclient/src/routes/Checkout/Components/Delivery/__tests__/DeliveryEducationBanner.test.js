import React from 'react'
import { shallow } from 'enzyme'
import { DeliveryEducationBanner } from '../DeliveryEducationBanner'

describe('DeliveryEducationBanner', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<DeliveryEducationBanner />)
  })

  test('should renders properly', () => {
    // console.log(wrapper.debug())
    const expectedInsulatedPackaging =
      'Insulated packaging keeps your ingredients fresh for up to 12 hours.'
    const expectedDeliverySlot = 'Delivery slot updates on the day via text and email.'

    expect(wrapper.find('[data-testing="delivery-education-banner"]')).toBeTruthy()
    // expect(wrapper.find('.deliverySection')).toHaveLength(2)
    expect(wrapper.find('[data-testing="delivery-education-banner"]').children()).toHaveLength(3)

    expect(wrapper.find('[data-testing="delivery-education-info"]').at(0).text()).toEqual(
      expectedInsulatedPackaging
    )
    expect(wrapper.find('[data-testing="delivery-education-info"]').at(1).text()).toEqual(
      expectedDeliverySlot
    )
  })
})
