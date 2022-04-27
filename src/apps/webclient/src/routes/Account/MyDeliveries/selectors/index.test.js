import {
  getMaxNumRecipes
} from '.'

const menuService = ({
  boxId
}) => ({
  menuService: {
    data: [{
      relationships: {
        boxes: {
          data: [{
            type: 'box',
            id: boxId
          }]
        }
      }
    }]
  }
})

describe('getMaxNumRecipes', () => {
  let state

  describe('when menu service contains a 5 recipe box', () => {
    test('should return 5', () => {
      const boxId = 'SKU-GMT-5-2'
      state = menuService({ boxId })
      expect(getMaxNumRecipes(state)).toEqual(5)
    })
  })

  describe('when menu service does not contain 5 recipe box', () => {
    test('should return 4', () => {
      const boxId = 'SKU-GMT-2-2'
      state = menuService({ boxId })
      expect(getMaxNumRecipes(state)).toEqual(4)
    })
  })
})
