import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { ToastPresentation } from '../Toast.presentation'
import { toastActions } from '../Toast.context'

const mockOnRender = jest.fn()
const mockOnDismiss = jest.fn()

const mockProps = {
  id: 'mock-id',
  variant: 'success',
  onRender: mockOnRender,
  onDismiss: mockOnDismiss,
  displayTime: 'short',
  title: 'Mock Title',
  body: 'Mock body text',
  canDismiss: true,
  anchor: {
    href: 'mock href',
    text: 'Mock anchor text',
  },
}

let wrapper

const mountWithProps = (props) => {
  act(() => {
    wrapper = mount(<ToastPresentation {...mockProps} {...props} />)
  })

  wrapper.update()
}

const mockDispatch = jest.fn()

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')

  return {
    ...ActualReact,
    useContext: () => ({ dispatch: mockDispatch }),
  }
})

jest.useFakeTimers()

describe('Given ToastPresentation is rendered', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mountWithProps()
  })

  test('Then title is rendered as expected', () => {
    expect(
      wrapper.find('[data-testing="toast-title"]').text(),
    ).toEqual(mockProps.title)
  })

  describe('And onRender is passed', () => {
    test('Then onRender is invoked', () => {
      expect.assertions(2)
      expect(mockOnRender).toHaveBeenCalledTimes(1)
      expect(mockOnRender).toHaveBeenCalledWith({ id: 'mock-id' })
    })
  })

  test('Then dispatch is invoked after a delay', () => {
    expect.assertions(2)

    expect(mockDispatch).not.toHaveBeenCalled()

    jest.runAllTimers()

    expect(mockDispatch).toHaveBeenCalledWith({
      type: toastActions.REMOVE_TOAST,
      id: 'mock-id',
    })
  })

  test('Then handleOnDismiss is invoked after a delay', () => {
    expect.assertions(2)

    expect(mockOnDismiss).not.toHaveBeenCalled()

    jest.runAllTimers()

    expect(mockOnDismiss).toHaveBeenCalled()
  })

  describe('And body prop is passed', () => {
    test('Then body is rendered as expected', () => {
      expect(
        wrapper.find('[data-testing="toast-body"]').text(),
      ).toEqual(mockProps.body)
    })
  })

  describe('And body prop is not passed', () => {
    beforeEach(() => {
      mountWithProps({ body: undefined })
    })

    test('Then body is not rendered', () => {
      expect(
        wrapper.find('[data-testing="toast-body"]').exists(),
      ).toBeFalsy()
    })
  })

  describe('And anchor prop is passed', () => {
    test('Then link is rendered as expected', () => {
      expect.assertions(2)

      expect(
        wrapper.find('[data-testing="toast-anchor"]').text(),
      ).toEqual(mockProps.anchor.text)

      expect(
        wrapper.find('[data-testing="toast-anchor"]').prop('href'),
      ).toEqual(mockProps.anchor.href)
    })
  })

  describe('And renderAnchor is passed', () => {
    beforeEach(() => {
      mountWithProps({ renderAnchor: () => <div data-testing="render-anchor-elem" /> })
    })

    test('Then the expected custom anchor is rendered', () => {
      expect(
        wrapper.find('[data-testing="render-anchor-elem"]').exists()
      ).toBeTruthy()
    })
  })

  describe('And anchor prop is not passed', () => {
    beforeEach(() => {
      mountWithProps({ anchor: undefined })
    })

    test('Then anchor is not rendered', () => {
      expect(
        wrapper.find('[data-testing="toast-anchor"]').exists(),
      ).toBeFalsy()
    })
  })

  describe('And canDismiss prop is true', () => {
    test('Then dismiss button is rendered as expected', () => {
      expect(
        wrapper.find('[data-testing="toast-dismiss-btn"]').exists(),
      ).toBeTruthy()
    })

    describe('And I click the dismiss button', () => {
      beforeEach(() => {
        wrapper
          .find('[data-testing="toast-dismiss-btn"]')
          .simulate('click')
      })

      test('Then onDismiss fn is invoked', () => {
        expect(mockOnDismiss).toHaveBeenCalledWith({ id: 'mock-id' })
      })

      test('Then dispatch is invoked', () => {
        expect(mockDispatch).toHaveBeenCalledWith({
          type: toastActions.REMOVE_TOAST,
          id: 'mock-id',
        })
      })
    })
  })

  describe('Given canDismiss prop is false', () => {
    beforeEach(() => {
      mountWithProps({ canDismiss: false })
    })

    test('Then canDismiss is not rendered', () => {
      expect(
        wrapper.find('[data-testing="toast-dismiss-btn"]').exists(),
      ).toBeFalsy()
    })
  })
})

