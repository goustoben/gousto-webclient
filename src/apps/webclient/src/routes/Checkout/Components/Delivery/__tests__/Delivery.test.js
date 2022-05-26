import React from 'react'

import { mount } from 'enzyme'
import Immutable from 'immutable'
import { FormSection } from 'redux-form'
import scrollIntoView from 'scroll-into-view'

import { canUseWindow } from 'utils/browserEnvironment'

import { Delivery } from '../Delivery'

jest.mock('scroll-into-view')
jest.mock('utils/browserEnvironment')
jest.mock('redux-form', () => ({
  Field: () => <div />,
  // eslint-disable-next-line
  FormSection: ({ children }) => <div>{children}</div>,
}))
jest.mock('../DeliveryAddress', () => ({
  DeliveryAddressContainer: () => <div />,
}))

let wrapper

// Yucky way of forcing componentDidUpdate
const forceComponentUpdate = () => {
  wrapper.setProps({
    formValues: {
      delivery: {
        confirmed: true,
      },
    },
  })
  wrapper.update()
}

describe('Delivery', () => {
  const props = {
    deliveryDays: Immutable.Map([]),
    slotId: '',
    date: '',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    canUseWindow.mockReturnValue(true)
    wrapper = mount(<Delivery {...props} />)
  })

  test('should render correctly', () => {
    expect(wrapper.find(FormSection)).toHaveLength(1)
    expect(wrapper.find('DeliveryCard')).toHaveLength(1)
  })

  describe('when window is available', () => {
    test('container is scrolled into view', () => {
      forceComponentUpdate()
      expect(scrollIntoView).toHaveBeenCalledTimes(1)
    })
  })

  describe('when window is not available', () => {
    beforeEach(() => {
      canUseWindow.mockReturnValue(false)
      wrapper = mount(<Delivery {...props} />)
      forceComponentUpdate()
    })

    test('container is not scrolled into view', () => {
      expect(scrollIntoView).not.toHaveBeenCalled()
    })
  })
})
