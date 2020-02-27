import { getNoOfColumns } from './columns'

describe('getNoOfColumns', () => {
  describe('when window not defined', () => {
    beforeEach(() => {
      global.window.innerWidth = undefined
    })
    test('should return 3', () => {
      const result = getNoOfColumns()
      expect(result).toEqual(3)
    })
  })

  describe('when innerWidth is more than 1200 ', () => {
    beforeEach(() => {
      global.window.innerWidth = 1220
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('should return 5', () => {
      const result = getNoOfColumns()
      expect(result).toEqual(5)
    })
  })

  describe('when innerWidth is more than 994 but less than 1200 ', () => {
    beforeEach(() => {
      global.window.innerWidth = 995
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('should return 4', () => {
      const result = getNoOfColumns()
      expect(result).toEqual(4)
    })
  })

  describe('when innerWidth is not in defined range', () => {
    beforeEach(() => {
      global.window.innerWidth = 990
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('should return 3', () => {
      const result = getNoOfColumns()
      expect(result).toEqual(3)
    })
  })
})
