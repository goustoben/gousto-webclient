import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import * as FiveRecipeHooks from '../use5RecipesPaintedDoorTest'
import * as Tracking from '../../../hooks/useTracking'
import { FiveRecipesEndOfJourney } from './FiveRecipesEndOfJourney'

describe('<FiveRecipesEndOfJourney />', () => {
  let use5RecipesPaintedDoorTestSpy
  const trackEvent = jest.fn()
  const setMenuAsSeen = jest.fn()
  const onClose = jest.fn()
  beforeEach(() => {
    use5RecipesPaintedDoorTestSpy = jest.spyOn(FiveRecipeHooks, 'use5RecipesPaintedDoorTest')
    jest.spyOn(Tracking, 'useCreateTrackEvent').mockImplementation(() => trackEvent)
  })

  afterEach(jest.clearAllMocks)

  it('should not render the modal if it is not open', () => {
    use5RecipesPaintedDoorTestSpy.mockReturnValue({ setMenuAsSeen })

    render(<FiveRecipesEndOfJourney isOpen={false} onClose={onClose} />)

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('should render the modal and they can close by modal close', () => {
    use5RecipesPaintedDoorTestSpy.mockReturnValue({ setMenuAsSeen })

    render(<FiveRecipesEndOfJourney isOpen onClose={onClose} />)

    expect(screen.queryByRole('heading')).toHaveTextContent('Shh, let’s keep this between us')

    fireEvent.click(screen.getByLabelText('Close Icon'))

    expect(setMenuAsSeen).toBeCalledTimes(1)
    expect(trackEvent).toHaveBeenNthCalledWith(1, {
      event: 'five-recipes-modal-closed'
    })
  })

  it('should render the modal and they can close by clicking "Choose my recipes"', () => {
    use5RecipesPaintedDoorTestSpy.mockReturnValue({ setMenuAsSeen })

    render(<FiveRecipesEndOfJourney isOpen onClose={onClose} />)

    expect(screen.queryByRole('heading')).toHaveTextContent('Shh, let’s keep this between us')

    fireEvent.click(screen.getByText('Back to menu'))

    expect(setMenuAsSeen).toBeCalledTimes(1)
    expect(trackEvent).toHaveBeenNthCalledWith(1, {
      event: 'five-recipes-modal-closed'
    })
  })

  it('should show credit box to subscribed users', () => {
    use5RecipesPaintedDoorTestSpy.mockReturnValue({
      isEnabled: true,
      hasSeenOnMenu: false,
      isNewUser: false,
    })
    render(<FiveRecipesEndOfJourney isOpen onClose={onClose} />)

    expect(screen.queryByText('£5 credit')).toBeTruthy()
  })

  it('should not show credit box to new users', () => {
    use5RecipesPaintedDoorTestSpy.mockReturnValue({
      isEnabled: true,
      hasSeenOnMenu: false,
      isNewUser: true,
    })

    render(<FiveRecipesEndOfJourney isOpen onClose={onClose} />)

    expect(screen.queryByText('£5 credit')).toBeFalsy()
  })
})
