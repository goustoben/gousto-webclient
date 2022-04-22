import React from 'react'
import { render, fireEvent, screen, RenderResult } from '@testing-library/react'
import { CheckoutCounter } from '../CheckoutCounter'

describe('CheckoutCounter', () => {
  describe('when rendered', () => {
    let rendered: RenderResult

    beforeEach(() => {
      rendered = render(
        <CheckoutCounter isDisabled={false} isButtonHovered={false} numRecipes={2} />,
      )
    })

    test('then it renders correctly', () => {
      const { getByText } = rendered
      expect(getByText('2')).toBeInTheDocument()
      expect(getByText('/')).toBeInTheDocument()
      expect(getByText('4')).toBeInTheDocument()
    })

    describe('when animation starts and ends', () => {
      test('then it should assign and clear animation classes properly', () => {
        expect(screen.getByTestId('CheckoutCounter_background')).toHaveClass(
          'scaleAndWiggleAnimation',
        )
        expect(screen.getByTestId('CheckoutCounter_content')).toHaveClass('wiggleAnimation')

        fireEvent.animationEnd(screen.getByTestId('CheckoutCounter_background'))

        expect(screen.getByTestId('CheckoutCounter_background')).not.toHaveClass(
          'scaleAndWiggleAnimation',
        )
        expect(screen.getByTestId('CheckoutCounter_content')).not.toHaveClass('wiggleAnimation')
      })
    })
  })
})
