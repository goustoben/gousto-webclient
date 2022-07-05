import React from 'react'

import { render, screen } from '@testing-library/react'
import {
  FiveRecipesAwarenessOrderListBanner,
  OrderState,
} from 'FiveRecipesAwareness/OrderListBanner/FiveRecipesAwarenessOrderListBanner'
import * as FiveRecipeHooks from 'FiveRecipesAwareness/use5RecipesAwareness'

import { JestSpyInstance } from '../../../types/jest'

describe('<FiveRecipesAwarenessOrderListBanner>', () => {
  let use5RecipesAwarenessSpy: JestSpyInstance<typeof FiveRecipeHooks.use5RecipesAwareness>

  beforeEach(() => {
    use5RecipesAwarenessSpy = jest.spyOn(FiveRecipeHooks, 'use5RecipesAwareness')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when the feature has not been enabled for the user', () => {
    it('should not render the banner', () => {
      use5RecipesAwarenessSpy.mockReturnValue({
        isEnabled: false,
      })
      render(<FiveRecipesAwarenessOrderListBanner orderState={OrderState.MenuOpen} />)
      expect(screen.queryByText(/You can now choose up to/i)).not.toBeInTheDocument()
    })
  })

  describe('when the feature has been enabled for the user', () => {
    describe('order state is not cancelled/dispatched/confirmed', () => {
      it('should render the banner', () => {
        use5RecipesAwarenessSpy.mockReturnValue({
          isEnabled: true,
        })
        const { container } = render(
          <FiveRecipesAwarenessOrderListBanner orderState={OrderState.MenuOpen} />,
        )
        expect(container).toMatchInlineSnapshot(`
          <div>
            <div
              class="fiveRecipesContainer leftArrow"
            >
              <p
                class="fiveRecipesText"
              >
                You can now choose up to 
                <b>
                  5 recipes 
                </b>
                 🎉
              </p>
            </div>
          </div>
        `)
      })
    })
    describe('order state is cancelled', () => {
      it('should not render the banner', () => {
        use5RecipesAwarenessSpy.mockReturnValue({
          isEnabled: true,
        })
        render(<FiveRecipesAwarenessOrderListBanner orderState={OrderState.Cancelled} />)
        expect(screen.queryByText(/You can now choose up to/i)).not.toBeInTheDocument()
      })
    })
  })
})
