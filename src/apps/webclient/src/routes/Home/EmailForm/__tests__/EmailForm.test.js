import React from 'react'

import Form from 'Form'
import TextInput from 'Form/Input'
import { P } from 'Page/Elements'
import { shallow } from 'enzyme'
import { CTA } from 'goustouicomponents'

import { newsletterSubscribe } from 'apis/customers'
import { EmailForm } from 'routes/Home/EmailForm'

let wrapper

jest.mock('apis/customers', () => ({
  newsletterSubscribe: jest.fn().mockReturnValue(
    new Promise((resolve) => {
      resolve()
    }),
  ),
}))

describe('EmailForm', () => {
  const emailAddress = 'test@test.com'

  beforeEach(() => {
    wrapper = shallow(<EmailForm />)
  })

  test('should render properly', () => {
    expect(wrapper.find(Form).length).toEqual(1)
    expect(wrapper.find(CTA).length).toEqual(1)
    expect(wrapper.find(TextInput).length).toEqual(1)
  })

  test('should cause a newsletterSubscribe action to be dispatched on button click if email valid', async () => {
    wrapper.find(TextInput).simulate('change', emailAddress)
    await wrapper.find(CTA).simulate('click', { preventDefault: (e) => e })
    expect(wrapper.state().emailValid).toBeTruthy()
    expect(wrapper.state().email).toEqual(emailAddress)
    expect(newsletterSubscribe).toHaveBeenCalledWith(emailAddress)
  })

  test('should display successful message for newsletter subscription', () => {
    wrapper.setState({ emailSubmitted: true })
    expect(wrapper.find(P).first().find('span').text()).toEqual(
      'Hooray! We’ll let you know as soon as you can place your order.',
    )
  })

  test('should show an error message if email not valid', () => {
    wrapper.find(TextInput).simulate('change', 'testtest.com')
    wrapper.find(CTA).simulate('click', { preventDefault: (e) => e })
    expect(wrapper.state().emailValid).toEqual(false)
    expect(wrapper.state().emailSubmitted).toEqual(false)
    expect(wrapper.state().email).toEqual('testtest.com')
    expect(wrapper.find('p').text()).toEqual('Please provide a valid email address.')
  })

  test('should display login anchor', () => {
    expect(wrapper.find(P).last().find('span').text()).toEqual(
      'Already a Gousto subscriber?  Log in',
    )
  })

  test.skip('should catch server error', () => {
    /*
     // TODO: Skipping this test until we segregate the client/server test code.
     // Suggest moving the server tests out into a
     */
    newsletterSubscribe.mockImplementation(() =>
      // eslint-disable-next-line prefer-promise-reject-errors
      Promise.reject({
        code: 'validation.unique.email',
      }),
    )
    wrapper.find(TextInput).simulate('change', emailAddress)
    wrapper.find(CTA).simulate('click', { preventDefault: (e) => e })
    setImmediate(() => {
      expect(wrapper.state()).toStrictEqual({
        emailSubmitted: true,
        emailValid: true,
        errorMessage: '',
        email: emailAddress,
      })
    })
  })
})
