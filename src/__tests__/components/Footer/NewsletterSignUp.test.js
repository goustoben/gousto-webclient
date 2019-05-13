import React from 'react'
import { shallow } from 'enzyme'
import NewsletterSignUp from 'Footer/NewsletterSignUp/NewsletterSignUp'
import { Button, Segment } from 'goustouicomponents'
import Immutable from 'immutable'

let wrapper
let onSignup
let signup

describe('<NewsletterSignUp />', () => {
  beforeEach(() => {
    signup = Immutable.Map({})
    onSignup = function() {}
    wrapper = shallow(<NewsletterSignUp onSignup={onSignup} signup={signup} />)
  })

  test('should render a form', () => {
    expect(wrapper.type()).toEqual('form')
  })

  test('should render a button', () => {
    expect(wrapper.find(Button).length).toEqual(1)
  })

  test('should render an input field', () => {
    expect(wrapper.find('input').length).toEqual(1)
  })

  test('should render 2 message labels', () => {
    expect(wrapper.find('label').length).toEqual(2)
  })

  test('should cause a NewsletterSignUp action to be dispatched on button click', () => {
    let emailAddress
    let called

    onSignup = email => {
      emailAddress = email
      called = true
    }

    wrapper = shallow(<NewsletterSignUp onSignup={onSignup} signup={signup} />)
    wrapper
      .find('input')
      .simulate('change', { target: { value: 'someone@somewhere.com' } })
    wrapper
      .find(Button)
      .find(Segment)
      .simulate('click', { preventDefault: e => e })
    expect(called).toEqual(true)
    expect(emailAddress).toEqual('someone@somewhere.com')
  })

  describe('the default state', () => {
    beforeEach(() => {
      signup = Immutable.Map({})
      onSignup = function() {}
      wrapper = shallow(
        <NewsletterSignUp onSignup={onSignup} signup={signup} />,
      )
    })

    test('should not show a success message', () => {
      expect(
        wrapper
          .find('label')
          .at(0)
          .text(),
      ).toEqual('')
    })
    test('should not show an error message', () => {
      expect(
        wrapper
          .find('label')
          .at(1)
          .text(),
      ).toEqual('')
    })
    test('should not show a spinner', () => {
      expect(wrapper.find(Button).node.props.pending).toEqual(false)
    })
  })

  describe('the pending state', () => {
    beforeEach(() => {
      signup = Immutable.Map({ pending: true })
      onSignup = function() {}
      wrapper = shallow(
        <NewsletterSignUp onSignup={onSignup} signup={signup} />,
      )
    })

    test('should not show a success message', () => {
      expect(
        wrapper
          .find('label')
          .at(0)
          .text(),
      ).toEqual('')
    })
    test('should not show an error message', () => {
      expect(
        wrapper
          .find('label')
          .at(1)
          .text(),
      ).toEqual('')
    })
    test('should show a spinner', () => {
      expect(wrapper.find(Button).node.props.pending).toEqual(true)
    })
  })

  describe('the success state', () => {
    beforeEach(() => {
      signup = Immutable.Map({ success: true })
      onSignup = function() {}
      wrapper = shallow(
        <NewsletterSignUp onSignup={onSignup} signup={signup} />,
      )
    })

    test('should show a success message', () => {
      expect(
        wrapper
          .find('label')
          .at(0)
          .text(),
      ).toEqual('Thank you for signing up to the Gousto newsletter!')
    })
    test('should not show an error message', () => {
      expect(
        wrapper
          .find('label')
          .at(1)
          .text(),
      ).toEqual('')
    })
    test('should not show a spinner', () => {
      expect(wrapper.find(Button).node.props.pending).toEqual(false)
    })
  })

  describe('the error state', () => {
    beforeEach(() => {
      signup = Immutable.Map({ error: 'An Error Message' })
      onSignup = function() {}
      wrapper = shallow(
        <NewsletterSignUp onSignup={onSignup} signup={signup} />,
      )
    })

    test('should show a success message', () => {
      expect(
        wrapper
          .find('label')
          .at(0)
          .text(),
      ).toEqual('')
    })
    test('should show an error message', () => {
      expect(
        wrapper
          .find('label')
          .at(1)
          .text(),
      ).toEqual('An Error Message')
    })
    test('should not show a spinner', () => {
      expect(wrapper.find(Button).node.props.pending).toEqual(false)
    })
  })
})
