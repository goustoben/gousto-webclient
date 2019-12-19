import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

import { tutorial } from 'reducers/tutorial'

describe('tutorial state', () => {
  let result
  const getTutorialState = ({ viewed = {}, visible = {} } = {}) => Immutable.Map({
    viewed: Immutable.Map({
      ...viewed,
    }),
    visible: Immutable.Map({
      ...visible,
    })
  })

  describe('when action type is SET_TUTORIAL_VISIBLE', () => {
    test('should set the visible of the passed name to true', () => {
      result = tutorial.tutorial(getTutorialState(), {
        type: actionTypes.SET_TUTORIAL_VISIBLE,
        name: 'testTutorial',
        value: true
      })

      expect(result).toEqual(getTutorialState({
        visible: { "testTutorial": true }
      }))
    })
  })

  describe('when action type is SET_TUTORIAL_VIEWED', () => {
    test('should set the viewed count of the passed action name', () => {
      result = tutorial.tutorial(getTutorialState(), {
        type: actionTypes.SET_TUTORIAL_VIEWED,
        name: 'testTutorial',
        count: 1
      })

      expect(result).toEqual(getTutorialState({
        viewed: { testTutorial: 1 }
      }))
    })
  })

  describe('when action type is INCREMENT_TUTORIAL_VIEWED', () => {
    describe('when count is not set', () => {
      test('should set the viewed count of the passed action name to 1', () => {
        result = tutorial.tutorial(getTutorialState(), {
          type: actionTypes.INCREMENT_TUTORIAL_VIEWED,
          name: 'testTutorial',
        })

        expect(result).toEqual(getTutorialState({
          viewed: { "testTutorial": 1 }
        }))
      })
    })

    describe('when count is already set', () => {
      test('should increment the viewed count of the passed action name', () => {
        result = tutorial.tutorial(getTutorialState({
          viewed: { testTutorial: 1 }
        }), {
          type: actionTypes.INCREMENT_TUTORIAL_VIEWED,
          name: 'testTutorial',
        })

        expect(result).toEqual(getTutorialState({
          viewed: { "testTutorial": 2 }
        }))
      })
    })
  })
})
