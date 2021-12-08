import { fourNumbersPropType } from '../fourNumbersPropType'

describe('fourNumbersPropType', () => {
  const PROP_NAME = 'propToValidate'
  const COMPONENT_NAME = 'ComponentName'

  describe('when props parameter is not an array', () => {
    const PROPS = { propToValidate: 'a' }

    test('throws an error', () => {
      expect(() => fourNumbersPropType(PROPS, PROP_NAME, COMPONENT_NAME)).toThrowError(`<${COMPONENT_NAME}> ${PROP_NAME} needs to be an array of four numbers`)
    })
  })

  describe('when props parameter is an array', () => {
    describe('and the length of the array is smaller than 4', () => {
      const PROPS = { propToValidate: [1, 2, 3] }

      test('throws an error', () => {
        expect(() => fourNumbersPropType(PROPS, PROP_NAME, COMPONENT_NAME)).toThrowError(`<${COMPONENT_NAME}> ${PROP_NAME} needs to be an array of four numbers`)
      })
    })

    describe('and the length of the array is greater than 4', () => {
      const PROPS = { propToValidate: [1, 2, 3, 4, 5] }

      test('throws an error', () => {
        expect(() => fourNumbersPropType(PROPS, PROP_NAME, COMPONENT_NAME)).toThrowError(`<${COMPONENT_NAME}> ${PROP_NAME} needs to be an array of four numbers`)
      })
    })

    describe('and the length of the array is exactly 4', () => {
      describe('and they are not integers', () => {
        const PROPS = { propToValidate: ['a', 'b', 'c', 'd'] }

        test('throws an error', () => {
          expect(() => fourNumbersPropType(PROPS, PROP_NAME, COMPONENT_NAME)).toThrowError(`<${COMPONENT_NAME}> ${PROP_NAME} needs to be an array of four numbers`)
        })
      })

      describe('and they are not all integers', () => {
        const PROPS = { propToValidate: [1, 'b', 3, 4] }

        test('throws an error', () => {
          expect(() => fourNumbersPropType(PROPS, PROP_NAME, COMPONENT_NAME)).toThrowError(`<${COMPONENT_NAME}> ${PROP_NAME} needs to be an array of four numbers`)
        })
      })

      describe('and they are all integers', () => {
        const PROPS = { propToValidate: [1, 2, 3, 4] }

        test('does not throw an error', () => {
          expect(() => fourNumbersPropType(PROPS, PROP_NAME, COMPONENT_NAME)).not.toThrow()
        })
      })
    })
  })
})
