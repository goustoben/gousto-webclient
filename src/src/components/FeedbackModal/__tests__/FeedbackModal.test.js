import React from 'react'
import { mount } from 'enzyme'
import { FeedbackModal } from '../FeedbackModal'

describe('FeedbackModal', () => {
  let wrapper
  const props = {
    shortlistFeedbackSubmit: jest.fn(),
    shortlistFeedbackDismissTracking: jest.fn(),
    closeModal: jest.fn(),
    shortlistFeedbackViewed: jest.fn(),
  }
  beforeEach(() => {
    wrapper = mount(<FeedbackModal {...props} />)
  })

  test('should disable submit button if feedback empty', () => {
    expect(wrapper.find('.submitButton').prop('disabled')).toBe(true)
  })

  describe('when has feedback in state', () => {
    beforeEach(() => {
      wrapper.find('.modalTextarea').simulate('change', { target: { value: 'feedback' } })
    })
    test('should have state feedback text', () => {
      expect(wrapper.state().feedback).toEqual('feedback')
    })

    test('should submit the feedback from state', () => {
      wrapper.find('.submitButton').simulate('click')
      expect(props.shortlistFeedbackSubmit).toHaveBeenCalledWith('feedback')
    })
  })

  describe('when click on No Thanks button ', () => {
    test('should call shortlistFeedbackDismissTracking and closeModal', () => {
      wrapper.find('.dismissButton').simulate('click')

      expect(props.shortlistFeedbackDismissTracking).toHaveBeenCalled()
      expect(props.closeModal).toHaveBeenCalled()
    })
  })

  describe('when click on close button', () => {
    test('should call shortlistFeedbackDismissTracking and closeModal', () => {
      wrapper.find('CloseButton').simulate('click')

      expect(props.shortlistFeedbackDismissTracking).toHaveBeenCalled()
      expect(props.closeModal).toHaveBeenCalled()
    })
  })
})
