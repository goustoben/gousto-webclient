import { getEllipse } from 'Spotlight/ellipse'

describe('getEllipse', () => {
  let accuracy
  const ellipseParams = {
    originX: 100,
    originY: 100,
    radius: 50,
  }

  describe('with an accuracy of 0.1', () => {
    beforeEach(() => {
      accuracy = 0.1
    })

    test('should generate clip-path co-ordinates', () => {
      expect(getEllipse({ ...ellipseParams, accuracy })).toMatchSnapshot()
    })
  })

  describe('with an accuracy of 0.2', () => {
    beforeEach(() => {
      accuracy = 0.2
    })

    test('should generate clip-path co-ordinates', () => {
      expect(getEllipse({ ...ellipseParams, accuracy })).toMatchSnapshot()
    })
  })

  describe('with an accuracy of 0.3', () => {
    beforeEach(() => {
      accuracy = 0.3
    })

    test('should generate clip-path co-ordinates', () => {
      expect(getEllipse({ ...ellipseParams, accuracy })).toMatchSnapshot()
    })
  })
})
