import React from 'react'
import { render, screen } from '@testing-library/react'
import Modal from 'react-modal'
import { canUseWindow } from 'utils/browserEnvironment'
import { isServer } from 'utils/serverEnvironment'

import Overlay from '../Overlay'

jest.mock('utils/browserEnvironment')
jest.mock('utils/serverEnvironment')

const setAppElementSpy = jest.spyOn(Modal, 'setAppElement')

const mockIsServer = isServer as jest.Mock
const mockCanUseWindow = canUseWindow as jest.Mock

type OverlayProps = {
  open: boolean
  className?: string
  contentClassName?: string
  from?: string
  onBackgroundClick?: () => void
  contentLabel?: string
  children?: React.ReactNode
}

const defaultProps = {
  open: true,
}

const renderOverlay = (props: OverlayProps = defaultProps) => {
  // eslint-disable-next-line
  render(<Overlay {...props}>Overlay text</Overlay>)
}

describe('Overlay', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('on server', () => {
    beforeEach(() => {
      mockIsServer.mockReturnValue(true)
    })

    test("doesn't render Overlay", () => {
      renderOverlay()

      const childText = screen.queryByText('Overlay text')

      expect(childText).not.toBeInTheDocument()
    })
  })

  describe('in browser', () => {
    beforeEach(() => {
      mockIsServer.mockReturnValue(false)
      mockCanUseWindow.mockReturnValue(true)
    })

    test('sets app element for Modal', () => {
      renderOverlay()

      expect(setAppElementSpy).toHaveBeenCalledWith('#react-root')
    })

    // Domain owner should add more tests here
  })
})
