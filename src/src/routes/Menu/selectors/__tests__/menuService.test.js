import { getPreviewMenuDateForCutoff } from '../menuService'

describe('getPreviewMenuDateForCutoff', () => {
  const state = {}
  describe('when menu service has data with one menu', () => {
    beforeEach(() => {
      state.menuService = {
        data: [{
          attributes: {
            ends_at: '2020-10-13'
          }
        }]
      }
    })

    test('should return 2020-10-12 date', () => {
      expect(getPreviewMenuDateForCutoff(state)).toEqual('2020-10-12')
    })
  })

  describe('when menu service has no data', () => {
    beforeEach(() => {
      state.menuService = {
        data: []
      }
    })

    test('should return null', () => {
      expect(getPreviewMenuDateForCutoff(state)).toBe(null)
    })
  })
})
