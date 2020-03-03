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

  describe('when innerWidth is more than 1600 ', () => {
    beforeEach(() => {
      global.window.innerWidth = 1601
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('should return 5', () => {
      const result = getNoOfColumns()
      expect(result).toEqual(5)
    })
  })

  describe('when innerWidth is more than 1200 but less than 1400 ', () => {
    beforeEach(() => {
      global.window.innerWidth = 1201
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
