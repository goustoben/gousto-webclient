import * as Use5RecipesPaintedDoorTest from './use5RecipesPaintedDoorTest'
import { useShouldShowPaintedDoorButton } from './useShouldShowPaintedDoorButton'

jest.mock('routes/Menu/domains/basket', () => ({
  ...jest.requireActual('routes/Menu/domains/basket'),
  useBasket: jest.fn(),
}))

const Basket = require('routes/Menu/domains/basket')

const use5RecipesPaintedDoorTest = jest.spyOn(
  Use5RecipesPaintedDoorTest,
  'use5RecipesPaintedDoorTest'
)

const parameters = {
  isInExperiment: false,
  isSeenOnMenu: false,
  isLimitReached: false,
  isRecipeInBasket: false
}
const setup = () => {
  use5RecipesPaintedDoorTest.mockReturnValue({
    isEnabled: parameters.isInExperiment,
    hasSeenOnMenu: parameters.isSeenOnMenu,
  })
  Basket.useBasket.mockReturnValue({
    limitReached: parameters.isLimitReached,
    isRecipeInBasket: () => parameters.isRecipeInBasket,
  })
}

describe('useShouldShowPaintedDoorButton', () => {
  describe('given user is in the experiment', () => {
    beforeEach(() => { parameters.isInExperiment = true })

    describe('given has not seen the experiment on the menu', () => {
      beforeEach(() => { parameters.isSeenOnMenu = false })

      describe('given recipe is not in the basket', () => {
        beforeEach(() => { parameters.isRecipeInBasket = false })

        describe('given basket has reached limit', () => {
          beforeEach(() => { parameters.isLimitReached = true })

          it('should return true', () => {
            setup()
            expect(useShouldShowPaintedDoorButton(1)).toBe(true)
          })
        })

        describe('given basket has not reached its limit', () => {
          beforeEach(() => { parameters.isLimitReached = false })
          it('should return false', () => {
            setup()
            expect(useShouldShowPaintedDoorButton(1)).toBe(false)
          })
        })
      })

      describe('given recipe is already in the basket', () => {
        beforeEach(() => { parameters.isRecipeInBasket = true })

        it('should return false', () => {
          setup()
          expect(useShouldShowPaintedDoorButton(1)).toBe(false)
        })
      })
    })
    describe('given has already seen the experiment on the menu', () => {
      beforeEach(() => { parameters.isSeenOnMenu = false })

      it('should return false', () => {
        setup()
        expect(useShouldShowPaintedDoorButton(1)).toBe(false)
      })
    })
  })

  describe('given user is not in the experiment', () => {
    beforeEach(() => { parameters.isInExperiment = false })

    it('should return false', () => {
      setup()
      expect(useShouldShowPaintedDoorButton(1)).toBe(false)
    })
  })
})
