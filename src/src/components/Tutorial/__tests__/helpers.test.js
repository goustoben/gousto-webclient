import {
  DEFAULT_COORDINATES,
  getElementRectBySelector,
  getCenterFromElementRect,
  getBottomFromElementRect,
  getTopFromElementRect,
  getViewportRect,
  getTooltipDirection,
  getTooltipLocation,
  getTransformOffset,
  getSpotlightLocation,
  isElementHidden,
} from 'Tutorial/helpers'

describe('Tutorial helpers', () => {
  const windowWidth = 1920,
    windowHeight = 1080

  const getBoundingClientRect = (width, height) => ({
    x: 0,
    y: 0,
    width,
    height,
    top: 0,
    left: 0,
    right: width,
    bottom: height,
  })

  beforeEach(() => {
    global.window.innerWidth = windowWidth
    global.window.innerHeight = windowHeight
  })

  describe('getElementRectBySelector', () => {
    let element

    beforeEach(() => {
      element = document.createElement('div')
      element.dataset.testing = 'target'
      document.body.appendChild(element)

      Element.prototype.getBoundingClientRect = jest.fn(() => (
        getBoundingClientRect(250, 125)
      ))
    })

    afterEach(() => {
      document.body.removeChild(element)
    })

    test('should return the elementrect', () => {
      expect(getElementRectBySelector('div[data-testing="target"]')).toEqual({
        bottom: 125,
        height: 125,
        left: 0,
        right: 250,
        top: 0,
        width: 250,
        x: 0,
        y: 0
      })
      expect(Element.prototype.getBoundingClientRect).toHaveBeenCalled()
    })
  })

  describe('getCenterFromElementRect', () => {
    test("should find the center of a given element given it's position, width and height", () => {
      const x = 0, y = 0, width = 100, height = 100

      expect(getCenterFromElementRect({ x, y, width, height })).toEqual({
        x: 50,
        y: 50,
      })
    })
  })

  describe('getBottomFromElementRect', () => {
    test("should find the bottom of a given element given it's position, width and height", () => {
      const x = 25, y = 25, width = 100, height = 50

      expect(getBottomFromElementRect({ x, y, width, height })).toEqual({
        x: 75,
        y: 75,
      })
    })
  })

  describe('getTopFromElementRect', () => {
    test("should find the top of a given element given it's position and width", () => {
      const x = 100, y = 100, width = 50

      expect(getTopFromElementRect({ x, y, width })).toEqual({
        x: 125,
        y: 100,
      })
    })
  })

  describe('getViewportRect', () => {
    test('should return the size of the viewport', () => {
      expect(getViewportRect()).toEqual({
        left: 0,
        top: 0,
        right: windowWidth,
        bottom: windowHeight,
        center: windowHeight / 2,
      })
    })
  })

  describe('getTooltipDirection', () => {
    describe('when element is in the top half of the viewport', () => {
      test('should return a top direction', () => {
        expect(getTooltipDirection({ x: 960, y: 200 }, 100)).toContain('top')
      })
    })

    describe('when element is in the bottom of the viewport', () => {
      test('should return a bottom direction', () => {
        expect(getTooltipDirection({ x: 960, y: 740 }, 100)).toContain('bottom')
      })
    })

    describe('when element is on the right of the screen', () => {
      test('should return a right direction', () => {
        expect(getTooltipDirection({ x: 1880, y: 200 }, 100)).toContain('right')
      })
    })

    describe('when element is on the center of the screen', () => {
      test('should return a central direction', () => {
        const direction = getTooltipDirection({ x: 960, y: 200 }, 100)

        expect(direction).not.toContain('right')
        expect(direction).not.toContain('left')
      })
    })

    describe('when element is on the left of the screen', () => {
      test('should return a left direction', () => {
        expect(getTooltipDirection({ x: 40, y: 200 }, 100)).toContain('left')
      })
    })
  })

  describe('getTooltipLocation', () => {
    test("should return default co-ordinates when selector target doesn't exist", () => {
      expect(getTooltipLocation('div[data-testing="target"]', 'top')).toBe(DEFAULT_COORDINATES)
    })

    describe('when target exists', () => {
      let element

      beforeEach(() => {
        element = document.createElement('div')
        element.dataset.testing = 'target'
        document.body.appendChild(element)

        Element.prototype.getBoundingClientRect = jest.fn(() => (
          getBoundingClientRect(25, 50)
        ))
      })

      afterEach(() => {
        document.body.removeChild(element)
      })

      describe('when arrow direction is top', () => {
        test("should return the bottom of the selector's target element", () => {
          expect(getTooltipLocation('div[data-testing="target"]', 'top')).toEqual({
            x: 12.5,
            y: 50,
          })
        })
      })

      describe('when arrow direction is bottom', () => {
        test("should return the top of the selector's target element", () => {
          expect(getTooltipLocation('div[data-testing="target"]', 'top')).toEqual({
            x: 12.5,
            y: 50,
          })
        })
      })
    })
  })

  describe('getTransformOffset', () => {
    test('should provide the correct directions for a given offset', () => {
      const transformMap = {
        top: { x: -50, y: 0 },
        bottom: { x: -50, y: -100 },
        'top-left': { x: -15, y: 0 },
        'top-right': { x: -85, y: 0 },
        'bottom-left': { x: -15, y: -100 },
        'bottom-right': { x: -85, y: -100 },
      }

      Object.entries(transformMap).forEach(([direction, result]) => (
        expect(getTransformOffset(direction)).toEqual(result)
      ))
    })
  })

  describe('getSpotlightLocation', () => {
    describe("when selector doesn't reference an element ", () => {
      test('should return the default co-ordinates', () => {
        expect(getSpotlightLocation('div[data-testing="target"]')).toEqual(
          DEFAULT_COORDINATES,
        )
      })
    })

    describe('when selector references an element', () => {
      let element

      beforeEach(() => {
        element = document.createElement('div')
        element.dataset.testing = 'target'
        document.body.appendChild(element)

        Element.prototype.getBoundingClientRect = jest.fn(() => (
          getBoundingClientRect(100, 100)
        ))
      })

      afterEach(() => {
        document.body.removeChild(element)
      })

      test("should return the element's central location", () => {
        expect(getSpotlightLocation('div[data-testing="target"]')).toEqual({
          x: 50,
          y: 50,
        })
      })
    })
  })

  describe('isElementHidden', () => {
    beforeEach(() => {
      Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
        get() { return this.parentNode },
      })
    })

    describe("when selector doesn't reference an element ", () => {
      test('should return true', () => {
        expect(isElementHidden('div[data-testing="target"]')).toBe(true)
      })
    })

    describe('when selector references a visible element', () => {
      let element

      beforeEach(() => {
        element = document.createElement('div')
        element.dataset.testing = 'target'
        document.body.appendChild(element)
      })

      afterEach(() => {
        document.body.removeChild(element)
      })

      test("should return false", () => {
        expect(isElementHidden('div[data-testing="target"]')).toBe(false)
      })
    })
  })
})
