import '@testing-library/jest-dom'
import React from 'react'
import { render} from '@testing-library/react'
import { FiveRecipesHotjarTrigger } from './FiveRecipesHotjarTrigger'
import * as FiveRecipeHooks from './use5RecipesPaintedDoorTest'
import { JestSpyInstance } from '../../types/jest'

describe('<FiveRecipesHotjarTrigger />', () => {
  let use5RecipesPaintedDoorTestSpy: JestSpyInstance<
    typeof FiveRecipeHooks.use5RecipesPaintedDoorTest
  >
  const hotjar = jest.fn()
  const setOrderConfirmationAsSeen = jest.fn()

  beforeEach(() => {
    window.hj = hotjar
    use5RecipesPaintedDoorTestSpy = jest.spyOn(FiveRecipeHooks, 'use5RecipesPaintedDoorTest')
  })

  afterEach(() => {
    jest.clearAllMocks()
    delete window.hj
  })

  describe('When feature is not enabled for the user', () => {
    it('should not trigger HotJar', () => {
      use5RecipesPaintedDoorTestSpy.mockReturnValue({
        isEnabled: false,
        isNewUser: false,
        hasSeenOnOrderConfirmation: false,
        setOrderConfirmationAsSeen,
      })

      render(<FiveRecipesHotjarTrigger />)

      expect(setOrderConfirmationAsSeen).not.toBeCalled()
      expect(hotjar).not.toBeCalled()
    })
  })

  describe('When the users has the feature enabled', () => {
    describe('When the users has seen the Order confirmation pages', () => {
      it('should not trigger HotJar', () => {
        use5RecipesPaintedDoorTestSpy.mockReturnValue({
          isEnabled: true,
          isNewUser: false,
          hasSeenOnOrderConfirmation: true,
          setOrderConfirmationAsSeen,
        })

        render(<FiveRecipesHotjarTrigger />)

        expect(setOrderConfirmationAsSeen).not.toBeCalled()
        expect(hotjar).not.toBeCalled()
      })
    })

    describe('When the users is new sign-up', () => {
      it('should trigger HotJar', () => {
        use5RecipesPaintedDoorTestSpy.mockReturnValue({
          isEnabled: true,
          isNewUser: true,
          hasSeenOnOrderConfirmation: false,
          setOrderConfirmationAsSeen,
        })

        render(<FiveRecipesHotjarTrigger />)

        expect(setOrderConfirmationAsSeen).toBeCalled()
        expect(hotjar).toHaveBeenNthCalledWith(1, 'trigger', 'painted_door_test_new_users')
        expect(hotjar).toBeCalledTimes(1)
      })
    })

    describe('When the users is an existing users', () => {
      it('should trigger HotJar', () => {
        use5RecipesPaintedDoorTestSpy.mockReturnValue({
          isEnabled: true,
          isNewUser: false,
          hasSeenOnOrderConfirmation: false,
          setOrderConfirmationAsSeen,
        })

        render(<FiveRecipesHotjarTrigger />)

        expect(setOrderConfirmationAsSeen).toBeCalled()
        expect(hotjar).toHaveBeenNthCalledWith(1, 'trigger', 'painted_door_test_existing_users')
        expect(hotjar).toBeCalledTimes(1)
      })
    })
  })
})
