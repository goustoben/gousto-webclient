import Immutable from 'immutable'
import { getSelectedJobsDepartment } from 'selectors/jobs'

describe('jobs selectors', () => {

  describe('the getSelectedJobsDepartment selector', () => {
    test('returns the selected job department', () => {
      const state = {
        jobsDepartment: Immutable.fromJS({
          selectedDepartment: 'Food'
        })
      }
      expect(getSelectedJobsDepartment(state)).toEqual('Food')
    })
  })
})

