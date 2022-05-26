import React from 'react'

import { render, screen } from '@testing-library/react'

import { useDoubleDeckerNav } from '../../../../hooks/useDoubleDeckerNav'
import { MenuDateRange } from './MenuDateRange'

jest.mock('../../../../hooks/useDoubleDeckerNav', () => ({
  useDoubleDeckerNav: jest.fn(),
}))

const mockUseDoubleDeckerNav = useDoubleDeckerNav

describe('Given we are rendering MenuDateRange', () => {
  const text = 'Menu for Sep 19 - Sep 25'

  describe('when double decker experiment is OFF', () => {
    beforeEach(() => mockUseDoubleDeckerNav.mockReturnValue(false))

    it('should return menu date range', () => {
      render(<MenuDateRange text={text} variant="desktop" />)
      expect(screen.queryByText(text)).toBeTruthy()
    })

    describe('when variant is desktop', () => {
      it('should not have MOBILE specific class name', () => {
        render(<MenuDateRange text={text} variant="desktop" />)
        expect(screen.getByRole('heading')).not.toHaveClass('mobile')
      })
    })

    describe('when variant is mobile', () => {
      it('should have MOBILE specific class name', () => {
        render(<MenuDateRange text={text} variant="mobile" />)
        expect(screen.getByRole('heading')).toHaveClass('mobile')
      })
    })
  })

  describe('when double decker experiment is ON', () => {
    beforeEach(() => mockUseDoubleDeckerNav.mockReturnValue(true))

    it('should not render a component', () => {
      render(<MenuDateRange text={text} variant="desktop" />)
      expect(screen.queryByText(text)).toBeFalsy()
    })
  })
})
