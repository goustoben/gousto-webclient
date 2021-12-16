import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { FiveRecipesStartOfJourneyModal } from './FiveRecipesStartOfJourneyModal'
import * as FiveRecipeHooks from './use5RecipesPaintedDoorTest'
import { JestSpyInstance } from '../../types/jest'

describe('<FiveRecipesStartOfJourneyModal />', () => {
  let use5RecipesPaintedDoorTestSpy: JestSpyInstance<typeof FiveRecipeHooks.use5RecipesPaintedDoorTest>

  beforeEach(() => {
    use5RecipesPaintedDoorTestSpy = jest.spyOn(FiveRecipeHooks, 'use5RecipesPaintedDoorTest')
  })

  afterEach(jest.clearAllMocks)

  describe('when the users doesn\'t have the experiment enabled', () => {
    it('should not render', () => {
      use5RecipesPaintedDoorTestSpy.mockReturnValue({
        isEnabled: false,
        hasSeenOnMenu: false,
      })

      render(<FiveRecipesStartOfJourneyModal />)

      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('when the user has the experiment enabled', () => {
    const experimentIsEnabled = true;

    describe('when the users has already see the experiment', () => {
      it('should not render', () => {
        use5RecipesPaintedDoorTestSpy.mockReturnValue({
          isEnabled: experimentIsEnabled,
          hasSeenOnMenu: true,
        })

        render(<FiveRecipesStartOfJourneyModal />)

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })
    })

    describe('when the users has not seen the experiment', () => {
      const userHasNotSeenExperiment = false;

      it('should render the modal and they can close by modal close', () => {
        use5RecipesPaintedDoorTestSpy.mockReturnValue({
          isEnabled: experimentIsEnabled,
          hasSeenOnMenu: userHasNotSeenExperiment,
        })

        render(<FiveRecipesStartOfJourneyModal />)

        expect(screen.queryByRole('heading')).toHaveTextContent(/Hungry for 5 recipes?/i)
        
        fireEvent.click(screen.getByLabelText('Close Icon'))

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })

      it('should render the modal and they can close by clicking "Choose my recipes"', () => {
        use5RecipesPaintedDoorTestSpy.mockReturnValue({
          isEnabled: experimentIsEnabled,
          hasSeenOnMenu: userHasNotSeenExperiment,
        })

        render(<FiveRecipesStartOfJourneyModal />)

        expect(screen.queryByRole('heading')).toHaveTextContent(/Hungry for 5 recipes?/i)

        fireEvent.click(screen.getByText('Choose my recipes'))

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })
    })
  })
})
