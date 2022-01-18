import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import * as FiveRecipeHooks from '../use5RecipesPaintedDoorTest'
import { FiveRecipesStartOfJourney } from './FiveRecipesStartOfJourney'
import { JestSpyInstance } from '../../../types/jest'
import * as clientMetrics from 'routes/Menu/apis/clientMetrics'

describe('<FiveRecipesStartOfJourney />', () => {
  let use5RecipesPaintedDoorTestSpy: JestSpyInstance<
    typeof FiveRecipeHooks.use5RecipesPaintedDoorTest
  >
  let sendClientMetricSpy: JestSpyInstance<typeof clientMetrics.sendClientMetric>

  beforeEach(() => {
    use5RecipesPaintedDoorTestSpy = jest.spyOn(FiveRecipeHooks, 'use5RecipesPaintedDoorTest')
    sendClientMetricSpy = jest.spyOn(clientMetrics, 'sendClientMetric')
  })

  afterEach(jest.clearAllMocks)

  describe('when the users don`t have the experiment enabled', () => {
    it('should not render', () => {
      use5RecipesPaintedDoorTestSpy.mockReturnValue({
        isEnabled: false,
        hasSeenOnMenu: false,
      })

      render(<FiveRecipesStartOfJourney discount={60.0} />)

      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('when the user has the experiment enabled', () => {
    describe('when the users has already see the experiment', () => {
      it('should not render', () => {
        use5RecipesPaintedDoorTestSpy.mockReturnValue({
          isEnabled: true,
          hasSeenOnMenu: true,
        })

        render(<FiveRecipesStartOfJourney discount={60.0} />)

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })
    })

    describe('when the users has not seen the experiment', () => {
      it('should render the modal and they can close by modal close', () => {
        use5RecipesPaintedDoorTestSpy.mockReturnValue({
          isEnabled: true,
          hasSeenOnMenu: false,
        })

        render(<FiveRecipesStartOfJourney discount={60.0} />)

        expect(screen.queryByRole('heading')).toHaveTextContent(/Hungry for 5 recipes?/i)

        fireEvent.click(screen.getByLabelText('Close Icon'))

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })

      it('should render the modal and they can close by clicking "Choose my recipes"', () => {
        use5RecipesPaintedDoorTestSpy.mockReturnValue({
          isEnabled: true,
          hasSeenOnMenu: false,
        })

        render(<FiveRecipesStartOfJourney discount={60.0} />)

        expect(screen.queryByRole('heading')).toHaveTextContent(/Hungry for 5 recipes?/i)

        fireEvent.click(screen.getByText('Choose my recipes'))

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })

      describe('when the users is a new user', () => {
        it('should apply the correct discount for new users', () => {
          use5RecipesPaintedDoorTestSpy.mockReturnValue({
            isEnabled: true,
            hasSeenOnMenu: false,
            isNewUser: true,
          })

          render(<FiveRecipesStartOfJourney discount={10.5} />)
          expect(screen.queryByText('£3.65 per serving.')).toBeTruthy()
          expect(screen.queryByText('£4.08')).toHaveClass('strike')
        })

        it('should send a client metric `menu-5-recipes-painted-new-user-start`', () => {
          use5RecipesPaintedDoorTestSpy.mockReturnValue({
            isEnabled: true,
            hasSeenOnMenu: false,
            isNewUser: true,
          })

          render(<FiveRecipesStartOfJourney discount={10.5} />)

          fireEvent.click(screen.getByText('Choose my recipes'))

          expect(screen.queryByRole('heading')).not.toBeInTheDocument()
          expect(sendClientMetricSpy).toHaveBeenCalledWith('menu-5-recipes-painted-new-user-start', 1, 'Count')
        })
      })

      describe('when is an existing users', () => {
        it('should apply the correct discount for existing subscribers', () => {
          use5RecipesPaintedDoorTestSpy.mockReturnValue({
            isEnabled: true,
            hasSeenOnMenu: false,
            isNewUser: false,
          })

          render(<FiveRecipesStartOfJourney discount={20} />)

          expect(screen.queryByText('£3.26 per serving.')).toBeTruthy()
        })

        it('should apply the correct discount for existing subscribers', () => {
          use5RecipesPaintedDoorTestSpy.mockReturnValue({
            isEnabled: true,
            hasSeenOnMenu: false,
            isNewUser: false,
          })

          render(<FiveRecipesStartOfJourney discount={0} />)

          expect(screen.queryByText('£4.08 per serving.')).toBeTruthy()
        })

        it('should send a client metric `menu-5-recipes-painted-existing-user-start`', () => {
          use5RecipesPaintedDoorTestSpy.mockReturnValue({
            isEnabled: true,
            hasSeenOnMenu: false,
            isNewUser: false,
          })

          render(<FiveRecipesStartOfJourney discount={10.5} />)

          fireEvent.click(screen.getByText('Choose my recipes'))

          expect(screen.queryByRole('heading')).not.toBeInTheDocument()
          expect(sendClientMetricSpy).toHaveBeenCalledWith('menu-5-recipes-painted-existing-user-start', 1, 'Count')
        })
      })
    })
  })
})
