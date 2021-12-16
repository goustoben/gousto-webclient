import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, fireEvent, waitFor, } from '@testing-library/react'
import { AddRecipeButtonWithFiveRecipesEndOfJourneyModal } from './AddRecipeButtonWithFiveRecipesEndOfJourneyModal'
import * as FiveRecipeHooks from './use5RecipesPaintedDoorTest'
import * as Tracking from '../../hooks/useTracking' 
import { JestSpyInstance } from '../../types/jest'

describe('<AddRecipeButtonWithFiveRecipesEndOfJourneyModal />', () => {
  let use5RecipesPaintedDoorTestSpy: JestSpyInstance<typeof FiveRecipeHooks.use5RecipesPaintedDoorTest>,
      useCreateTrackEventSpy: JestSpyInstance<typeof Tracking.useCreateTrackEvent>;
  const trackEvent = jest.fn()
  const setMenuAsSeen = jest.fn()

  beforeEach(() => {
    use5RecipesPaintedDoorTestSpy = jest.spyOn(FiveRecipeHooks, 'use5RecipesPaintedDoorTest')
    useCreateTrackEventSpy = jest.spyOn(Tracking, 'useCreateTrackEvent').mockImplementation(() => trackEvent)
  })

  afterEach(jest.clearAllMocks)

  it('should render the modal and they can close by modal close', async () => {
    use5RecipesPaintedDoorTestSpy.mockReturnValue({ setMenuAsSeen })

    render(<AddRecipeButtonWithFiveRecipesEndOfJourneyModal />)

    fireEvent.click(screen.getByRole('button', { name: /add recipe/i }))

    expect(screen.queryByRole('heading')).toHaveTextContent('coming soon')

    fireEvent.click(screen.getByLabelText('Close Icon'))

    expect(setMenuAsSeen).toBeCalledTimes(1)
    expect(trackEvent).toHaveBeenNthCalledWith(1, {
      event: 'five-recipes-modal-closed'
    })

    await waitFor(() => {
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  it('should render the modal and they can close by clicking "Choose my recipes"', async () => {
    use5RecipesPaintedDoorTestSpy.mockReturnValue({ setMenuAsSeen })

    render(<AddRecipeButtonWithFiveRecipesEndOfJourneyModal />)

    fireEvent.click(screen.getByRole('button', { name: /add recipe/i }))

    expect(screen.queryByRole('heading')).toHaveTextContent('coming soon')

    fireEvent.click(screen.getByText('Back to menu'))

    expect(setMenuAsSeen).toBeCalledTimes(1)
    expect(trackEvent).toHaveBeenNthCalledWith(1, {
      event: 'five-recipes-modal-closed'
    })

    await waitFor(() => {
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })
})
