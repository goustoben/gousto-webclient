import { elementScroll, elementScrollTo } from '../scrollUtils'

describe('given elementScroll is called', () => {
  describe('when it has a native scroll method', () => {
    const scroll = jest.fn()

    test('then the native method should be called', () => {
      const element = {
        scroll,
      }

      elementScroll(element, { left: 10, behavior: 'smooth' })

      expect(scroll).toHaveBeenCalledWith({ left: 10, behavior: 'smooth' })
    })
  })

  describe('when it doesn\'t have the native method', () => {
    test('then it should set its scroll postion via properties', () => {
      const element = {}

      elementScroll(element, { left: 10 })
      expect(element.scrollLeft).toBe(10)

      elementScroll(element, { top: 20 })
      expect(element.scrollTop).toBe(20)

      elementScroll(element, { left: 30, top: 40 })
      expect(element.scrollLeft).toBe(30)
      expect(element.scrollTop).toBe(40)
    })
  })
})

describe('given elementScrollTo is called', () => {
  describe('when it has a native scrollTo method', () => {
    const scrollTo = jest.fn()

    test('then the native method should be called', () => {
      const element = {
        scrollTo,
      }

      elementScrollTo(element, 10, 20)

      expect(scrollTo).toHaveBeenCalledWith(10, 20)
    })
  })

  describe('when it doesn\'t have the native method', () => {
    test('then it should set its scroll postion via properties', () => {
      const element = {}

      elementScrollTo(element, 10, 20)
      expect(element.scrollLeft).toBe(10)
      expect(element.scrollTop).toBe(20)
    })
  })
})
