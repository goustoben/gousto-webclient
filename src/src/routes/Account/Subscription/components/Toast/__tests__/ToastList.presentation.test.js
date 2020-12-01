import React, { useContext } from 'react'
import { mount } from 'enzyme'
import { createPortal } from 'react-dom'

import { canUseDom } from 'utils/browserHelper'
import { ToastList } from '../ToastList.presentation'

const mockState = [{
  id: 'mock-id',
  title: 'Mock title',
}, {
  id: 'mock-id-2',
  title: 'Mock title 2',
}]

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')

  return {
    ...ActualReact,
    useContext: jest.fn(),
  }
})

jest.mock('react-dom', () => {
  const ActualReactDom = jest.requireActual('react-dom')

  return {
    ...ActualReactDom,
    createPortal: jest.fn(),
  }
})

jest.mock('utils/browserHelper', () => ({
  canUseDom: jest.fn(),
}))

let wrapper

const mountWithProps = (props) => {
  wrapper = mount(<ToastList {...props} />)
}

describe('ToastList', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useContext.mockImplementation(() => ({
      state: mockState,
    }))
  })

  describe('Given ToastList is rendered on the server', () => {
    beforeEach(() => {
      canUseDom.mockReturnValue(false)

      mountWithProps()
    })

    test('Then ToastList is not rendered into a portal', () => {
      expect(createPortal).not.toHaveBeenCalled()
    })
  })

  describe('Given ToastList is rendered in the browser', () => {
    beforeEach(() => {
      canUseDom.mockReturnValue(true)
      createPortal.mockImplementation((tree) => tree)

      mountWithProps()
    })

    test('Then ToastList is rendered into a portal', () => {
      expect(createPortal).toHaveBeenCalled()
    })

    test('Then container element is passed to createPortal', () => {
      const [, containerElement] = createPortal.mock.calls[0]
      const body = document.getElementsByTagName('body')[0]

      expect(containerElement).toEqual(body)
    })

    describe('And the context is populated', () => {
      beforeEach(() => {
        useContext.mockImplementation(() => ({ state: mockState }))

        mountWithProps()
      })

      test('Then Toasts should be rendered', () => {
        expect(
          wrapper.find('ToastPresentation'),
        ).toHaveLength(mockState.length)
      })
    })

    describe('And the context is not populated', () => {
      beforeEach(() => {
        useContext.mockImplementation(() => ({ state: [] }))

        mountWithProps()
      })

      test('Then no Toasts should be rendered', () => {
        expect(
          wrapper.find('ToastPresentation'),
        ).toHaveLength(0)
      })
    })
  })
})

