import React from 'react'

import { render, screen } from '@testing-library/react'

import { HighlightChoice } from '../HighlightChoice'

jest.mock('containers/OptimizelyRollouts', () => ({
  useIsOptimizelyFeatureEnabled: jest
    .fn()
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => false),
}))

describe('Given: <HighlightChoice/>', () => {
  beforeEach(() => {
    render(<HighlightChoice />)
  })

  describe('When experiment is on', () => {
    test('Component should be rendered', () => {
      expect(screen.getByTestId('HighlightChoiceContainer')).toBeDefined()
      expect(document.querySelector('.slick-slider')).toBeDefined()
    })
  })

  describe('When experiment is off', () => {
    test('Component should not be rendered', () => {
      expect(document.querySelector('[data-testid="HighlightChoiceContainer"]')).toBeNull()
    })
  })
})
