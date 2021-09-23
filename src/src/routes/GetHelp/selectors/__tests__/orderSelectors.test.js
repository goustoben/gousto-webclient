import { Map } from 'immutable'
import {
  getIsOrderValidationPending,
  getIsOrderValidationError,
  getIneligibleIngredientsError,
  getIsMultiComplaintLimitReachedLastFourWeeks
} from '../orderSelectors'

describe('orderSelectors selectors', () => {
  describe('getIsOrderValidationPending', () => {
    let state

    beforeEach(() => {
      state = {
        pending: Map({})
      }
    })
    test('should return false', () => {
      expect(getIsOrderValidationPending(state)).toEqual(false)
    })

    describe('when GET_HELP_VALIDATE_ORDER is pending', () => {
      beforeEach(() => {
        state = {
          pending: Map({
            GET_HELP_VALIDATE_ORDER: true
          })
        }
      })
      test('should return true', () => {
        expect(getIsOrderValidationPending(state)).toEqual(true)
      })
    })
  })
  describe('getIsOrderValidationError', () => {
    let state

    describe('when GET_HELP_VALIDATE_ORDER errored', () => {
      beforeEach(() => {
        state = {
          error: Map({
            GET_HELP_VALIDATE_ORDER: {
              errors: {
                anyCriteria: 'any error'
              }
            }
          })
        }
      })

      test('returns true', () => {
        expect(getIsOrderValidationError(state)).toEqual(true)
      })
    })

    describe('when GET_HELP_VALIDATE_ORDER did not errored', () => {
      beforeEach(() => {
        state = {
          error: Map(({
            GET_HELP_VALIDATE_ORDER: null,
          }))
        }
      })

      test('returns false', () => {
        expect(getIsOrderValidationError(state)).toEqual(false)
      })
    })

    describe('when GET_HELP_VALIDATE_ORDER did not happened', () => {
      beforeEach(() => {
        state = {
          error: Map(({}))
        }
      })

      test('returns false', () => {
        expect(getIsOrderValidationError(state)).toEqual(false)
      })
    })
  })

  describe('getIneligibleIngredientsError', () => {
    let state

    beforeEach(() => {
      state = {
        error: Map({})
      }
    })

    test('should return null', () => {
      expect(getIneligibleIngredientsError(state)).toEqual(null)
    })

    describe('when we have GET_HELP_VALIDATE_ORDER errors', () => {
      beforeEach(() => {
        state = {
          error: Map({
            GET_HELP_VALIDATE_ORDER: {
              errors: {
                criteria: 'errors'
              }
            }
          })
        }
      })

      test('should return errors criteria', () => {
        expect(getIneligibleIngredientsError(state)).toEqual('errors')
      })
    })
  })

  describe('getIsMultiComplaintLimitReachedLastFourWeeks', () => {
    let state

    beforeEach(() => {
      state = {
        error: Map({})
      }
    })

    test('should return false', () => {
      expect(getIsMultiComplaintLimitReachedLastFourWeeks(state)).toEqual(false)
    })

    describe('when we have GET_HELP_VALIDATE_ORDER errors', () => {
      beforeEach(() => {
        state = {
          error: Map({
            GET_HELP_VALIDATE_ORDER: {
              errors: {
                criteria: {
                  multiComplaintLimitReachedLastFourWeeks: true
                }
              }
            }
          })
        }
      })

      test('should return true', () => {
        expect(getIsMultiComplaintLimitReachedLastFourWeeks(state)).toEqual(true)
      })
    })
  })
})
