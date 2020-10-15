import Immutable from 'immutable'
import { boxPricesBoxSizeSelected } from 'actions/boxPrices'
import { basketNumPortionChange } from 'actions/basket'
import { redirect } from 'actions/redirect'
import { signupNextStep } from 'actions/signup'
import { trackClickBuildMyBox } from 'actions/tracking'

jest.mock('actions/basket', () => ({
  basketNumPortionChange: jest.fn()
}))

jest.mock('actions/redirect', () => ({
  redirect: jest.fn()
}))

jest.mock('actions/signup', () => ({
  signupNextStep: jest.fn()
}))

jest.mock('actions/tracking', () => ({
  trackClickBuildMyBox: jest.fn()
}))

describe('boxPrices actions', () => {
  const getState = jest.fn()
  const dispatch = jest.fn()

  describe('given boxPricesBoxSizeSelected is dispatched', () => {
    describe('when postcode is not selected yet', () => {
      test('then it should redirect to wizard', async () => {
        getState.mockReturnValue({
          basket: Immutable.fromJS({
            postcode: ''
          })
        })

        await boxPricesBoxSizeSelected(2)(dispatch, getState)

        expect(trackClickBuildMyBox).toHaveBeenCalledWith('2 people', 'wizard')
        expect(basketNumPortionChange).toHaveBeenCalledWith(2)
        expect(signupNextStep).toHaveBeenCalledWith('postcode')
      })
    })

    describe('when postcode is selected', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          basket: Immutable.fromJS({
            postcode: 'W140EE'
          })
        })
      })

      test('then it should redirect to the menu', async () => {
        await boxPricesBoxSizeSelected(4)(dispatch, getState)

        expect(trackClickBuildMyBox).toHaveBeenCalledWith('4 people', 'menu')
        expect(basketNumPortionChange).toHaveBeenCalledWith(4)
        expect(redirect).toHaveBeenCalledWith('/menu')
      })
    })
  })
})
