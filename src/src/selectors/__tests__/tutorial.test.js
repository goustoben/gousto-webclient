import Immutable from 'immutable'
import { getShortlistTutorialFirstStep, getShortlistTutorialSecondStep } from '../tutorial'

describe('tutorial selectors', () => {

  describe('getShortlistTutorialFirstStep', () => {
    test('should return the "productCategories" attribute', () => {
      const state = {
        tutorial: Immutable.fromJS({
          viewed: {
            'shortlistStep1': 1
          }
        })
      }

      expect(getShortlistTutorialFirstStep(state)).toEqual(1)
    })
  })

  describe('getShortlistTutorialSecondStep', () => {
    test('should return the "productCategories" attribute', () => {
      const state = {
        tutorial: Immutable.fromJS({
          viewed: {
            'shortlistStep2': 1
          }
        })
      }

      expect(getShortlistTutorialSecondStep(state)).toEqual(1)
    })
  })
})
