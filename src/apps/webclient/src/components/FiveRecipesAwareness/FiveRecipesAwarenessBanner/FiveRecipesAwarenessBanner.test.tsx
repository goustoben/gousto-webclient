import React from 'react'

import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'

import * as clientMetrics from 'routes/Menu/apis/clientMetrics'

import { JestSpyInstance } from '../../../types/jest'
import * as FiveRecipeHooks from '../use5RecipesAwareness'
import { FiveRecipesAwarenessBanner } from './FiveRecipesAwarenessBanner'

describe('<FiveRecipesAwarenessBanner /> ', () => {
  let use5RecipesAwarenessSpy: JestSpyInstance<typeof FiveRecipeHooks.use5RecipesAwareness>
  let sendClientMetricSpy: JestSpyInstance<typeof clientMetrics.sendClientMetric>

  beforeEach(() => {
    use5RecipesAwarenessSpy = jest.spyOn(FiveRecipeHooks, 'use5RecipesAwareness')
    sendClientMetricSpy = jest.spyOn(clientMetrics, 'sendClientMetric')
  })

  afterEach(jest.clearAllMocks)

  describe('when the user does not have a two portion subscription or is not part of 5 recipe rollout', () => {
    it('should not render', () => {
      use5RecipesAwarenessSpy.mockReturnValue({
        isEnabled: false,
        hasClosedBanner: false,
      })

      render(<FiveRecipesAwarenessBanner />)
      expect(screen.queryByText(/5 recipes, here we come!/)).not.toBeInTheDocument()
    })
  })

  describe('when the user has a two portion subscription and is eligible for five recipes', () => {
    describe('when the user has not previously closed the banner', () => {
      let setBannerAsClosedMock: jest.Mock
      beforeEach(() => {
        const hasClosedBanner = false
        setBannerAsClosedMock = jest.fn()
        use5RecipesAwarenessSpy.mockReturnValue({
          isEnabled: true,
          hasClosedBanner,
          setBannerAsClosed: setBannerAsClosedMock,
        })
        render(<FiveRecipesAwarenessBanner />)
      })

      it('should render the banner', () => {
        expect(screen.getByText(/5 recipes, here we come/)).toBeInTheDocument()
      })

      it('can close the banner by clicking the close icon', () => {
        fireEvent.click(screen.getByTitle('Close Banner'))
        expect(setBannerAsClosedMock).toHaveBeenCalled()
      })

      it('should send a client metric `my-deliveries-five-recipes-awareness-4M-2P`', () => {
        fireEvent.click(screen.getByTitle('Close Banner'))
        expect(sendClientMetricSpy).toHaveBeenCalledWith(
          'my-deliveries-five-recipes-awareness-4M-2P',
          1,
          'Count',
        )
      })
    })

    describe('when the user has previously closed the banner', () => {
      it('should not render', () => {
        use5RecipesAwarenessSpy.mockReturnValue({
          isEnabled: true,
          hasClosedBanner: true,
        })

        render(<FiveRecipesAwarenessBanner />)
        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })
    })
  })
})
