import React from 'react'
import { mount } from 'enzyme'

import { FormAlert } from 'routes/ResetPassword/FormAlert'

const ERRORS = [
  {
    error: 'validation.one_uppercase_character.password',
    message: 'Your password must contain at least one uppercase character',
  },
  {
    error: 'validation.one_symbol_or_number.password',
    message: 'Your password must contain at least one symbol or number',
  },
  {
    error: 'validation.password_policy.password',
    message: 'validation_messages.password_policy',
  },
]

const TOKEN_ERROR = {
  error: 'password_token-invalid',
  message: 'Your token was not found or has expired.',
}

describe('<FormAlert />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<FormAlert errorResetPassword={[]} />)
  })

  test('does not display anything', () => {
    expect(wrapper.html()).toBe(null)
  })

  describe('when the errorResetPassword prop is an empty array', () => {
    beforeEach(() => {
      wrapper.setProps({ errorResetPassword: [] })
    })

    test('does not display anything', () => {
      expect(wrapper.html()).toBe(null)
    })
  })

  describe('when the errorResetPassword prop contains a list of errors', () => {
    beforeEach(() => {
      wrapper.setProps({ errorResetPassword: ERRORS })
    })

    test('displays an Alert component', () => {
      expect(wrapper.find('Alert').exists()).toBeTruthy()
    })

    test('lists all the errors', () => {
      const errorItems = wrapper.find('li')

      expect(errorItems.length).toEqual(ERRORS.length)

      errorItems.forEach((item, index) => {
        expect(item.text()).toBe(ERRORS[index].message)
      })
    })

    describe('and the errors are not correctly formatted', () => {
      beforeEach(() => {
        wrapper.setProps({ errorResetPassword: [...ERRORS, { error: 'abc' }, { message: '' }, {} ] })
      })

      test('does not display the wrong formatted errors', () => {
        expect(wrapper.find('li').length).toBe(ERRORS.length)
      })
    })

    describe('and one of those errors is about the token being invalid', () => {
      beforeEach(() => {
        wrapper.setProps({ errorResetPassword: [...ERRORS, TOKEN_ERROR] })
      })

      test('displays a custom message for the token invalid rule', () => {
        const errorItem = wrapper.find('li').last().text()
        expect(errorItem).toContain(TOKEN_ERROR.message)
        expect(errorItem).toContain('to reset your password!')
      })
    })
  })
})
