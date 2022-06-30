import React from 'react'

import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'

import * as clientMetrics from 'routes/Menu/apis/clientMetrics'

import { JestSpyInstance } from '../../../types/jest'
import * as FiveRecipeHooks from '../use5RecipesAwareness'
import { FiveRecipesAwarenessModal } from './FiveRecipesAwarenessModal'

describe('<FiveRecipesAwarenessModal /> ', () => {
  let use5RecipesAwarenessSpy: JestSpyInstance<typeof FiveRecipeHooks.use5RecipesAwareness>
  let sendClientMetricSpy: JestSpyInstance<typeof clientMetrics.sendClientMetric>

  beforeEach(() => {
    use5RecipesAwarenessSpy = jest.spyOn(FiveRecipeHooks, 'use5RecipesAwareness')
    sendClientMetricSpy = jest.spyOn(clientMetrics, 'sendClientMetric')
  })

  afterEach(jest.clearAllMocks)

  describe('when the user does not have the feature enabled', () => {
    it('should not render', () => {
      use5RecipesAwarenessSpy.mockReturnValue({
        isEnabled: false,
        hasSeenOnMenu: false,
      })

      render(<FiveRecipesAwarenessModal pricePerPortion={4.3} pricePerPortionDiscounted={2.53} />)

      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('when the user has the feature enabled', () => {
    describe('when the user has already seen the modal', () => {
      it('should not render', () => {
        use5RecipesAwarenessSpy.mockReturnValue({
          isEnabled: true,
          hasSeenOnMenu: true,
        })

        render(<FiveRecipesAwarenessModal pricePerPortion={4.3} pricePerPortionDiscounted={2.53} />)

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })
    })

    describe('when the user has not seen the modal', () => {
      it('should render the modal and they can close the modal by clicking the close icon', () => {
        use5RecipesAwarenessSpy.mockReturnValue({
          isEnabled: true,
          hasSeenOnMenu: false,
          setMenuAsSeen: jest.fn(),
        })

        render(<FiveRecipesAwarenessModal pricePerPortion={4.3} pricePerPortionDiscounted={2.53} />)

        expect(screen.queryByRole('heading')).toHaveTextContent(/Hungry for 5 recipes?/i)

        fireEvent.click(screen.getByLabelText('Close Icon'))

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })

      it('should render the modal and they can close the modal by clicking "Show me the menu"', () => {
        use5RecipesAwarenessSpy.mockReturnValue({
          isEnabled: true,
          hasSeenOnMenu: false,
          setMenuAsSeen: jest.fn(),
        })

        render(<FiveRecipesAwarenessModal pricePerPortion={4.3} pricePerPortionDiscounted={2.53} />)

        expect(screen.queryByRole('heading')).toHaveTextContent(/Hungry for 5 recipes?/i)

        fireEvent.click(screen.getByText('Show me the menu'))

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })

      describe('when the user is a prospect', () => {
        it('should apply the correct discount for new subscription', () => {
          use5RecipesAwarenessSpy.mockReturnValue({
            isEnabled: true,
            hasSeenOnMenu: false,
            isNewUser: true,
          })

          render(
            <FiveRecipesAwarenessModal pricePerPortion={4.3} pricePerPortionDiscounted={2.53} />,
          )
          expect(screen.queryByText('£2.53 per serving.')).toBeFalsy()
        })
      })

      describe('when the user is an existing subscriber', () => {
        it('should apply the correct discount for existing subscriber', () => {
          use5RecipesAwarenessSpy.mockReturnValue({
            isEnabled: true,
            hasSeenOnMenu: false,
            isNewUser: false,
          })

          render(
            <FiveRecipesAwarenessModal pricePerPortion={4.3} pricePerPortionDiscounted={2.53} />,
          )

          expect(screen.queryByText('£2.53 per serving.')).toBeTruthy()
        })

        it('should apply the correct discount for existing subscriber', () => {
          use5RecipesAwarenessSpy.mockReturnValue({
            isEnabled: true,
            hasSeenOnMenu: false,
            isNewUser: false,
          })

          render(<FiveRecipesAwarenessModal pricePerPortion={4.3} pricePerPortionDiscounted={0} />)

          expect(screen.queryByText('£4.30 per serving.')).toBeTruthy()
        })

        it('should send a client metric `menu-five-recipes-awareness-4M-2P`', () => {
          use5RecipesAwarenessSpy.mockReturnValue({
            isEnabled: true,
            hasSeenOnMenu: false,
            isNewUser: false,
            setMenuAsSeen: jest.fn(),
          })

          render(
            <FiveRecipesAwarenessModal pricePerPortion={4.3} pricePerPortionDiscounted={2.53} />,
          )

          fireEvent.click(screen.getByText('Show me the menu'))

          expect(screen.queryByRole('heading')).not.toBeInTheDocument()
          expect(sendClientMetricSpy).toHaveBeenCalledWith(
            'menu-five-recipes-awareness-4M-2P',
            1,
            'Count',
          )
        })
      })
    })
  })
})
