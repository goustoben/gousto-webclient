import React from 'react'
import { shallow } from 'enzyme'

import ExpiredBillingModal from 'ExpiredBillingModal/ExpiredBillingModal'
import css from 'ExpiredBillingModal/ExpiredBillingModal.css'

describe('CancelOrderModal', () => {
  let wrapper

  const closeExpiredBillingModal = jest.fn()

  const store = {
    dispatch: jest.fn(),
    getState: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<ExpiredBillingModal closeExpiredBillingModal={closeExpiredBillingModal} />, {
      context: {
        store
      }
    })
  })

  test('should return an Overlay', () => {
    expect(wrapper.text()).toEqual('<Overlay />')
  })

  test('should return a <ModalPanel>', () => {
    expect(wrapper.find('ModalPanel').length).toEqual(1)
  })

  test('should return the correct title and body text', () => {
    const className = `.${css.modalTitle.split(' ').join('.')}`
    expect(wrapper.find(className)).toHaveLength(1)
    expect(wrapper.find(className).text()).toEqual('Your account is on hold')
    const classNameBody = `.${css.modalBodyText.split(' ').join('.')}`
    expect(wrapper.find(classNameBody)).toHaveLength(1)
    expect(wrapper.find(classNameBody).text()).toEqual(
      'Your card has expired. Update your payment info now to order more recipes',
    )
  })
})
