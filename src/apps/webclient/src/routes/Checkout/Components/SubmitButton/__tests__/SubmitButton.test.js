import React from 'react'

import { shallow } from 'enzyme'

import { SubmitButton } from '../SubmitButton'

describe('SubmitButton', () => {
  let wrapper
  const props = {
    onClick: jest.fn(),
    trackSubmitOrderEvent: jest.fn(),
    submitting: true,
  }

  beforeEach(() => {
    wrapper = shallow(<SubmitButton {...props} />)
  })

  test('should render by default', () => {
    expect(wrapper).toBeDefined()
  })

  describe('when SubmitButton renders', () => {
    test('should return div', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should not call onClick by default', () => {
      expect(props.onClick).not.toBeCalled()
    })

    test('should not call trackSubmitOrderEvent by default', () => {
      expect(props.trackSubmitOrderEvent).not.toBeCalled()
    })
  })

  describe('when handleClick is called', () => {
    beforeEach(() => {
      expect(props.onClick).not.toBeCalled()
      expect(props.trackSubmitOrderEvent).not.toBeCalled()
      wrapper.instance().handleClick()
    })

    test('should call onClick and trackSubmitOrderEvent', () => {
      expect(props.trackSubmitOrderEvent).toHaveBeenCalled()
      expect(props.onClick).toBeCalled()
    })
  })
})
