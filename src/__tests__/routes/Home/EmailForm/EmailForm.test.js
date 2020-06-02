import React from 'react'
import { shallow } from 'enzyme'
import { EmailForm } from 'routes/Home/EmailForm'
import Form from 'Form'
import TextInput from 'Form/Input'
import { Button } from 'goustouicomponents'
import { P } from 'Page/Elements'
import { newsletterSubscribe } from 'apis/customers'

let wrapper

jest.mock('apis/customers', () => ({
  newsletterSubscribe: jest.fn().mockReturnValue(
    new Promise(resolve => {
      resolve()
    })
  ),
}))

describe('EmailForm', () => {
  beforeEach(() => {
    wrapper = shallow(<EmailForm />)
  })

  test('should render a form', () => {
    expect(wrapper.find(Form).length).toEqual(1)
  })

  test('should render a button', () => {
    expect(wrapper.find(Button).length).toEqual(1)
  })

  test('should render an input field', () => {
    expect(wrapper.find(TextInput).length).toEqual(1)
  })

  test('should cause a newsletterSubscribe action to be dispatched on button click if email valid', async () => {
    wrapper
      .find(TextInput)
      .simulate('change', 'test@test.com')
    await wrapper
      .find(Button)
      .simulate('click', { preventDefault: e => e })
    expect(wrapper.state().emailValid).toEqual(true)
    expect(wrapper.state().email).toEqual('test@test.com')
    expect(newsletterSubscribe).toHaveBeenCalled()
  })

  test('should display successful message for newsletter subscription', () => {
    wrapper.setState({ emailSubmitted: true })
    expect(wrapper.find(P).at(0).find('span').text()).toEqual('Thank you, you\'re in the queue. We\'ll let you know as soon as you can place your order')
  })

  test('should show an error message if email not valid', () => {
    wrapper
      .find(TextInput)
      .simulate('change', 'testtest.com')
    wrapper
      .find(Button)
      .simulate('click', { preventDefault: e => e })
    expect(wrapper.state().emailValid).toEqual(false)
    expect(wrapper.state().emailSubmitted).toEqual(false)
    expect(wrapper.state().email).toEqual('testtest.com')
    expect(wrapper.find('p').text()).toEqual('Please provide a valid email address')
  })
})
