import { getCurrentImage } from '../getCurrentImage'

const createOption = (start, url) => ({ start, url })

describe('CTAThematic', () => {
  describe('getCurrentImage', () => {
    describe('when first image matches', () => {
      test('it returns the first image', () => {
        const options = [ createOption('2019-12-20T12:00:00+01:00', '/foo.png') ]
        const currentDate = '2019-12-25T12:00:00+01:00'

        const result = getCurrentImage(currentDate, options)
        expect(result).toEqual('/foo.png')
      })
    })

    describe('when first and second image match', () => {
      test('it returns the second image', () => {
        const options = [ 
          createOption('2019-12-20T12:00:00+01:00', '/foo.png'), 
          createOption('2019-12-23T12:00:00+01:00', '/bar.png')
        ]
        const currentDate = '2019-12-25T12:00:00+01:00'

        const result = getCurrentImage(currentDate, options)
        expect(result).toEqual('/bar.png')
      })
    })

    describe('when first and second image match but third does not match', () => {
      test('it returns the second image', () => {
        const options = [ 
          createOption(null, '/foo.png'), 
          createOption('2019-12-23T12:00:00+01:00', '/bar.png'),
          createOption('2020-01-01T12:00:00+01:00', '/qux.png')
        ]
        const currentDate = '2019-12-25T12:00:00+01:00'

        const result = getCurrentImage(currentDate, options)
        expect(result).toEqual('/bar.png')
      })
    })

    describe('when no images match', () => {
      test('it returns null', () => {
        const options = [ 
          createOption('2019-12-23T12:00:00+01:00', '/bar.png'),
          createOption('2020-01-01T12:00:00+01:00', '/qux.png')
        ]
        const currentDate = '2019-12-20T12:00:00+01:00'

        const result = getCurrentImage(currentDate, options)
        expect(result).toEqual(null)
      })
    })

    describe('when given null for selected date', () => {
      test('it returns null', () => {
        const options = [ createOption('2019-12-23T12:00:00+01:00', '/bar.png') ]

        const result = getCurrentImage(null, options)
        expect(result).toEqual(null)
      })
    })

    describe('when given undefined for selected date', () => {
      test('it returns null', () => {
        const options = [ createOption('2019-12-23T12:00:00+01:00', '/bar.png') ]

        const result = getCurrentImage(undefined, options)
        expect(result).toEqual(null)
      })
    })

    describe('when given an empty string for selected date', () => {
      test('it returns null', () => {
        const options = [ createOption('2019-12-23T12:00:00+01:00', '/bar.png') ]

        const result = getCurrentImage('', options)
        expect(result).toEqual(null)
      })
    })
  })
})
