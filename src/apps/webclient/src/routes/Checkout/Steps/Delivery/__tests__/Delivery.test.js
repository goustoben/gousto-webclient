import React from 'react'

import { shallow } from 'enzyme'

import { DeliveryStep } from '../Delivery'

describe('DeliveryStep', () => {
  let wrapper
  const trackUTMAndPromoCode = jest.fn()
  const submit = jest.fn()
  const props = {
    trackUTMAndPromoCode,
    submit,
    stepName: '',
    formValues: {
      delivery: {
        confirmed: true,
      },
    },
  }

  beforeEach(() => {
    wrapper = shallow(<DeliveryStep {...props} />)
  })

  test('should render by default', () => {
    expect(wrapper).toBeDefined()
  })
})
