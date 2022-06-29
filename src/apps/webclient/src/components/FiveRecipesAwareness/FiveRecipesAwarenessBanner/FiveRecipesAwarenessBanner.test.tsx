import React from 'react'

import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'

import * as clientMetrics from 'routes/Menu/apis/clientMetrics'

import { JestSpyInstance } from '../../../types/jest'
import { FiveRecipesAwarenessBanner } from './FiveRecipesAwarenessBanner'
import * as FiveRecipeHooks from '.././use5RecipesAwareness'

describe('<FiveRecipesAwarenessBanner /> ', () => {
  let use5RecipesAwarenessSpy: JestSpyInstance<typeof FiveRecipeHooks.use5RecipesAwareness>
  let sendClientMetricSpy: JestSpyInstance<typeof clientMetrics.sendClientMetric>

  beforeEach(() => {
    use5RecipesAwarenessSpy = jest.spyOn(FiveRecipeHooks, 'use5RecipesAwareness')
    sendClientMetricSpy = jest.spyOn(clientMetrics, 'sendClientMetric')
  })

  afterEach(jest.clearAllMocks)

  describe('when the user does not have a two portion subscription', () => {
    it('should not render', () => {
      use5RecipesAwarenessSpy.mockReturnValue({
        isEnabledOnMyDeliveriesPage: false,
        hasClosedBanner: false,
        isIncludedIn5RecipeRollout: true
      })

      render(<FiveRecipesAwarenessBanner  />)
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })
  describe('when the user is not included in the five recipe rollout', () => {
    it('should not render', () => {
      use5RecipesAwarenessSpy.mockReturnValue({
        isEnabledOnMyDeliveriesPage: true,
        hasClosedBanner: false,
        isIncludedIn5RecipeRollout: false
      })

      render(<FiveRecipesAwarenessBanner />)
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('when the user has a two portion subscription and is eligible for five recipes', () => {
    describe('when the user has not previously closed the banner', () => {
      beforeEach(() => {
        use5RecipesAwarenessSpy.mockReturnValue({
          isEnabledOnMyDeliveriesPage: true,
          hasClosedBanner: false,
          isIncludedIn5RecipeRollout: true,
          setBannerAsClosed: jest.fn(),
        })
        render(<FiveRecipesAwarenessBanner />)
      })
      
      it('should render the banner and they can close it by clicking the close icon', () => {
        expect(screen.queryByRole('heading')).toHaveTextContent(/5 recipes, here we come!/)
        fireEvent.click(screen.getByTitle('Close Banner'))
        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
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
          isEnabledOnMyDeliveriesPage: true,
          isIncludedIn5RecipeRollout: true,
          hasClosedBanner: true,
        })

        render(<FiveRecipesAwarenessBanner />)
        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      })

    })
  })
})
