import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import TextArea from 'routes/Account/Subscription/SubscriptionPause/TextArea/TextArea'
import { Button } from 'goustouicomponents'

describe('TextArea', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<TextArea />)
    })

    test('should render a <div>', () => {
      expect(wrapper.type()).toEqual('div')
    })

    test('should render 1 <textarea>', () => {
      expect(wrapper.find('textarea').length).toEqual(1)
    })

    test('should render 1 <Button> displaying "Submit"', () => {
      expect(wrapper.find(Button).length).toEqual(1)
      expect(wrapper.find(Button).prop('children')).toEqual('Submit')
    })

    test('should render 1 <small> displaying validation message when there is a validation message', () => {
      wrapper = shallow(<TextArea />)
      expect(wrapper.find('small').length).toEqual(0)
      wrapper.instance().setState({
        validationMessage: 'Sample message',
      })
      wrapper.update()

      expect(wrapper.find('small').length).toEqual(1)
      expect(wrapper.find('small').text()).toEqual('Sample message')
    })
  })

  describe('handleChange', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<TextArea maxLength={10} />)
    })

    test('should be called on textarea change', () => {
      sinon.spy(wrapper.instance(), 'handleChange')

      wrapper.instance().forceUpdate()
      wrapper.update()

      expect(wrapper.instance().handleChange.callCount).toEqual(0)
      wrapper
        .find('textarea')
        .simulate('change', { target: { value: 'test value' } })
      expect(wrapper.instance().handleChange.callCount).toEqual(1)
    })

    test('should set state currentText to target value if target value max length has not yet been reached', () => {
      expect(wrapper.state('currentText')).toEqual('')
      wrapper.instance().handleChange({ target: { value: 'ab' } })
      wrapper.update()

      expect(wrapper.state('currentText')).toEqual('ab')
    })

    test('should reset state validationMessage if target value max length has not been reached', () => {
      expect(wrapper.state('currentText')).toEqual('')
      wrapper.instance().handleChange({ target: { value: 'ab' } })
      wrapper.update()

      expect(wrapper.state('currentText')).toEqual('ab')
    })

    test('should set state currentText to target value cut off at max allowed length if target value max length has been reached', () => {
      expect(wrapper.state('currentText')).toEqual('')
      wrapper
        .instance()
        .handleChange({ target: { value: '1 2 3 4 5 6 7 8 9' } })
      wrapper.update()

      expect(wrapper.state('currentText')).toEqual('1 2 3 4 5 ')
    })

    test('should set state validationMessage to "Maximum length of <x> characters reached" if value max length has been reached', () => {
      expect(wrapper.state('currentText')).toEqual('')
      wrapper
        .instance()
        .handleChange({ target: { value: '1 2 3 4 5 6 7 8 9' } })
      wrapper.update()

      expect(wrapper.state('validationMessage')).toEqual(
        'Maximum length of 10 characters reached',
      )
    })
  })

  describe('handleSubmit', () => {
    let wrapper
    let onSubmit

    beforeEach(() => {
      onSubmit = sinon.spy()
      wrapper = shallow(
        <TextArea
          chosenReasonId="r1"
          minLength={5}
          minLengthValidationMessage="Min length not reached"
          onSubmit={onSubmit}
        />,
      )
    })

    test('should be called on Button click', () => {
      sinon.spy(wrapper.instance(), 'handleSubmit')

      wrapper.instance().forceUpdate()
      wrapper.update()

      expect(wrapper.instance().handleSubmit.callCount).toEqual(0)
      wrapper.find(Button).simulate('click', { preventDefault: () => {} })
      expect(wrapper.instance().handleSubmit.callCount).toEqual(1)
    })

    test('should call event preventDefault method', () => {
      const preventDefault = sinon.spy()
      expect(preventDefault.callCount).toEqual(0)
      wrapper.instance().handleSubmit({ preventDefault })
      expect(preventDefault.callCount).toEqual(1)
    })

    test('should set state validationMessage to prop minLengthValidationMessage if currentText min length has not been reached', () => {
      wrapper.find('textarea').simulate('change', { target: { value: '123' } })
      wrapper.instance().handleSubmit({ preventDefault: () => {} })
      wrapper.update()

      expect(wrapper.state('validationMessage')).toEqual(
        'Min length not reached',
      )
    })

    test('should call prop onSubmit and pass chosenReasonId & currentText as arguments if min length has been reached', () => {
      wrapper
        .find('textarea')
        .simulate('change', { target: { value: 'test value' } })

      expect(onSubmit.callCount).toEqual(0)
      wrapper.find(Button).simulate('click', { preventDefault: () => {} })
      expect(onSubmit.callCount).toEqual(1)

      expect(onSubmit.getCall(0).args[0]).toEqual('test value')
    })
  })
})
