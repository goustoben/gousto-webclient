import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import * as Tracking from 'components/FiveRecipesPaintedDoorTest/useFiveRecipesTracking'
import * as clientMetrics from 'routes/Menu/apis/clientMetrics'
import { experimentFiveRecipesEndOfJourneyClosed, experimentFiveRecipesEndOfJourneyOpened } from 'actions/trackingKeys'
import * as FiveRecipeHooks from '../use5RecipesPaintedDoorTest'
import { FiveRecipesEndOfJourney } from './FiveRecipesEndOfJourney'

describe('<FiveRecipesEndOfJourney />', () => {
  let use5RecipesPaintedDoorTestSpy
  const trackEvent = jest.fn()
  const setMenuAsSeen = jest.fn()
  const onClose = jest.fn()
  const sendClientMetricMock = jest.fn()

  beforeEach(() => {
    use5RecipesPaintedDoorTestSpy = jest.spyOn(FiveRecipeHooks, 'use5RecipesPaintedDoorTest')
    jest.spyOn(clientMetrics, 'useSendClientMetric').mockReturnValue(sendClientMetricMock)
    jest.spyOn(Tracking, 'useFiveRecipesTracking').mockImplementation(() => trackEvent)
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
    expect(trackEvent).toHaveBeenNthCalledWith(1, experimentFiveRecipesEndOfJourneyOpened)

    fireEvent.click(screen.getByLabelText('Close Icon'))

    expect(setMenuAsSeen).toBeCalledTimes(1)
    expect(trackEvent).toHaveBeenNthCalledWith(2, experimentFiveRecipesEndOfJourneyClosed)
  })

  it('should render the modal and they can close by clicking "Choose my recipes"', () => {
    use5RecipesPaintedDoorTestSpy.mockReturnValue({ setMenuAsSeen })

    render(<FiveRecipesEndOfJourney isOpen onClose={onClose} />)

    expect(screen.queryByRole('heading')).toHaveTextContent('Shh, let’s keep this between us')
    expect(trackEvent).toHaveBeenNthCalledWith(1, experimentFiveRecipesEndOfJourneyOpened)

    fireEvent.click(screen.getByText('Back to menu'))

    expect(setMenuAsSeen).toBeCalledTimes(1)
    expect(trackEvent).toHaveBeenNthCalledWith(2, experimentFiveRecipesEndOfJourneyClosed)
  })

  describe('when the user is an existing user', () => {
    it('should show credit box to subscribed users', () => {
      use5RecipesPaintedDoorTestSpy.mockReturnValue({
        isEnabled: true,
        hasSeenOnMenu: false,
        isNewUser: false,
      })
      render(<FiveRecipesEndOfJourney isOpen onClose={onClose} />)

      expect(screen.queryByText('£0 credit')).toBeTruthy()
    })

    it('should send a client metric `menu-5-recipes-painted-existing-user-end`', () => {
      use5RecipesPaintedDoorTestSpy.mockReturnValue({
        isEnabled: true,
        hasSeenOnMenu: false,
        isNewUser: false,
        setMenuAsSeen,
      })

      render(<FiveRecipesEndOfJourney isOpen onClose={onClose} />)

      expect(screen.queryByRole('heading')).toHaveTextContent('Shh, let’s keep this between us')

      fireEvent.click(screen.getByText('Back to menu'))

      expect(sendClientMetricMock).toHaveBeenNthCalledWith(
        1,
        'menu-5-recipes-painted-existing-user-end',
        1,
        'Count'
      )
    })
  })

  describe('when the user is a new user', () => {
    it('should not show credit box to new users', () => {
      use5RecipesPaintedDoorTestSpy.mockReturnValue({
        isEnabled: true,
        hasSeenOnMenu: false,
        isNewUser: true,
      })

      render(<FiveRecipesEndOfJourney isOpen onClose={onClose} />)

      expect(screen.queryByText('£0 credit')).toBeFalsy()
    })

    it('should send a client metric `menu-5-recipes-painted-new-user-end`', () => {
      use5RecipesPaintedDoorTestSpy.mockReturnValue({
        isEnabled: true,
        hasSeenOnMenu: false,
        isNewUser: true,
        setMenuAsSeen,
      })

      render(<FiveRecipesEndOfJourney isOpen onClose={onClose} />)

      expect(screen.queryByRole('heading')).toHaveTextContent('Shh, let’s keep this between us')

      fireEvent.click(screen.getByText('Back to menu'))

      expect(sendClientMetricMock).toHaveBeenNthCalledWith(
        1,
        'menu-5-recipes-painted-new-user-end',
        1,
        'Count'
      )
    })
  })
})
