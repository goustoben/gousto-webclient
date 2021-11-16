import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import { isElementHidden } from 'Tutorial/helpers'
import { Tutorial } from 'Tutorial'
import { Step } from '../Step'

jest.mock('Tutorial/Step', () => ({
  /* eslint-disable-next-line react/prop-types */
  Step: ({ next, onClose, children }) => (
    <div>
      {children}
      <button type="button" onClick={next}>
        Next button
      </button>
      <button type="button" onClick={onClose}>
        Close button
      </button>
    </div>
  ),
}))

jest.mock('Tutorial/helpers', () => ({
  isElementHidden: jest.fn(),
}))

const generateSteps = (length) =>
  [...Array(length)].map((val, index) => (
    <Step key={`test-step-${index}`} selector=".test">{`Step number ${index}`}</Step>
  ))

let mockOnClose = jest.fn()
let mockTrackStepViewed = jest.fn()

function renderTutorial(props = {}, mockSteps = generateSteps(3)) {
  render(
    <Tutorial onClose={mockOnClose} trackStepViewed={mockTrackStepViewed} {...props}>
      {mockSteps}
    </Tutorial>
  )
}

describe('Tutorial', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    isElementHidden.mockReturnValue(false)
  })

  describe('element hidden state', () => {
    test('should not render children when isElementHidden is true', () => {
      isElementHidden.mockReturnValue(true)
      renderTutorial()

      const step = screen.queryByText(/Step number/i)

      expect(step).not.toBeInTheDocument()
    })

    test('should render children when isElementHidden is false', () => {
      renderTutorial()

      const step = screen.queryByText(/Step number/i)

      expect(step).toBeInTheDocument()
    })
  })

  describe('rendering', () => {
    test('should display first child step by default', () => {
      renderTutorial()

      screen.getByText(/Step number 0/i)
    })

    test('should invoke trackStepViewed for initially rendered step', () => {
      renderTutorial()

      expect(mockTrackStepViewed).toHaveBeenCalledTimes(1)
      expect(mockTrackStepViewed).toHaveBeenCalledWith(0)
    })
  })

  describe('next step handler', () => {
    test('should return the next valid step', () => {
      renderTutorial()
      const nextButton = screen.getByText(/Next button/i)
      fireEvent.click(nextButton)

      screen.getByText(/Step number 1/i)
    })

    test('should close if the current step is the last', () => {
      renderTutorial({}, generateSteps(1))

      const nextButton = screen.getByText(/Next button/i)
      fireEvent.click(nextButton)

      expect(screen.queryByText(/Step number/i)).not.toBeInTheDocument()
    })

    test('invokes trackStepViewed with correct step', () => {
      renderTutorial()

      const nextButton = screen.getByText(/Next button/i)
      fireEvent.click(nextButton)

      expect(mockTrackStepViewed).toHaveBeenCalledWith(1)
    })
  })

  describe('close handler', () => {
    test('should hide steps', () => {
      renderTutorial()

      const closeButton = screen.getByText(/Close button/i)
      fireEvent.click(closeButton)

      expect(screen.queryByText(/Step number/i)).not.toBeInTheDocument()
    })

    test('should invoke onClose prop', () => {
      renderTutorial()

      const closeButton = screen.getByText(/Close button/i)
      fireEvent.click(closeButton)

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })
})
