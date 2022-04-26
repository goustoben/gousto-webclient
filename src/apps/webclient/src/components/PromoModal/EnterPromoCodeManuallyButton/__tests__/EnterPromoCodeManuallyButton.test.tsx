import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import { EnterPromoCodeManuallyButton } from '../EnterPromoCodeManuallyButton'

const TEXT = 'I have a discount code to enter'

describe('EnterPromoCodeManuallyButton', () => {
  let rendered: RenderResult

  const onClick = jest.fn()

  describe('when isGoustoOnDemandEnabled is off', () => {
    beforeEach(() => {
      rendered = render(
        <EnterPromoCodeManuallyButton onClick={onClick} isGoustoOnDemandEnabled={false} />,
      )
    })

    test('renders correctly', () => {
      const { getByText } = rendered
      expect(getByText(TEXT)).toBeDefined()
    })

    describe('when clicked', () => {
      beforeEach(() => {
        const { getByText } = rendered
        fireEvent.click(getByText(TEXT))
      })

      test('then it should invoke the event', () => {
        expect(onClick).toHaveBeenCalled()
      })
    })
  })

  describe('when isGoustoOnDemandEnabled is on', () => {
    beforeEach(() => {
      rendered = render(<EnterPromoCodeManuallyButton onClick={onClick} isGoustoOnDemandEnabled />)
    })

    test('then it should not render', () => {
      const { queryByText } = rendered
      expect(queryByText(TEXT)).toBeNull()
    })
  })
})
