import Immutable from 'immutable' /* eslint-disable new-cap */

import featuresLoadedFromStore from 'utils/featuresLoadedFromStore'

describe('featuresLoadedFromStore', () => {
  let store

  beforeEach(() => {
    store = {
      getState: () => ({
        features: Immutable.fromJS({
          'feature-1': {
            value: true,
          },
          'feature-2': {
            value: true,
          },
          'feature-3': {
            value: false,
          },
          'feature-4': {
            value: false,
          },
          keyA: {
            value: 'valueA',
          },
          keyB: {
            value: 'valueB',
          },
          keyC: {
            value: 'valueC',
          },
          keyD: {
            value: 'valueD',
          },
          keyX: {
            value: 'valueX',
          },
          keyY: {
            value: 'valueY',
          },
        }),
      }),
    }
  })

  test('should return true by default', () => {
    expect(featuresLoadedFromStore({}, store)).toBe(true)
  })

  test('should return true if enabled features passed in & each enabled feature passed in is also enabled in store', () => {
    const features = {
      enable: ['feature-1', 'feature-2'],
    }

    expect(featuresLoadedFromStore(features, store)).toBe(true)
  })

  test('should return true if disabled features passed in & each disabled feature passed in is also disabled in store', () => {
    const features = {
      disable: ['feature-3', 'feature-4'],
    }

    expect(featuresLoadedFromStore(features, store)).toBe(true)
  })

  test('should return true if set features passed in & each set feature passed in is also set to same value in store', () => {
    const features = {
      set: {
        keyX: 'valueX',
        keyY: 'valueY',
      },
    }

    expect(featuresLoadedFromStore(features, store)).toBe(true)

    const features2 = {
      set: {
        keyX: 'valueX',
      },
    }

    expect(featuresLoadedFromStore(features2, store)).toBe(true)
  })

  test('should return true if features features passed in & each feature passed in is also set to same value in store', () => {
    const features = {
      features: {
        keyX: 'valueX',
        keyY: 'valueY',
      },
    }

    expect(featuresLoadedFromStore(features, store)).toBe(true)

    const features2 = {
      features: {
        keyX: 'valueX',
      },
    }

    expect(featuresLoadedFromStore(features2, store)).toBe(true)
  })

  test('should return true if features experiments passed in & each experiment passed in is also set to same value in store', () => {
    const features = {
      experiments: {
        keyX: 'valueX',
        keyY: 'valueY',
      },
    }

    expect(featuresLoadedFromStore(features, store)).toBe(true)

    const features2 = {
      experiments: {
        keyX: 'valueX',
      },
    }

    expect(featuresLoadedFromStore(features2, store)).toBe(true)
  })

  test('should return false if enabled features passed in & any enabled feature passed in is NOT also enabled in store', () => {
    const features = {
      enable: ['feature-1', 'feature-2', 'feature-x'],
    }

    expect(featuresLoadedFromStore(features, store)).toBe(false)
  })

  test('should return false if disabled features passed in & any disabled feature passed in is NOT also disabled in store', () => {
    const features = {
      disable: ['feature-3', 'feature-4', 'feature-x'],
    }

    expect(featuresLoadedFromStore(features, store)).toBe(false)
  })

  test('should return false if set features passed in & any set feature passed in is NOT also set to the same value in store', () => {
    const features = {
      set: {
        keyX: 'valueX',
        keyY: 'valueY',
        keyZ: false,
      },
    }

    expect(featuresLoadedFromStore(features, store)).toBe(false)

    const features2 = {
      set: {
        keyX: 'valueX',
        keyY: true,
      },
    }

    expect(featuresLoadedFromStore(features2, store)).toBe(false)
  })

  test('should return false if any combination of enabled, disabled, & set features passed in & any of these does not match its value in store', () => {
    const featuresFailEnabled = {
      enable: ['feature-1', 'feature-2', 'feature-x'],
      disable: ['feature-3', 'feature-4'],
      set: {
        keyX: 'valueX',
        keyY: 'valueY',
      },
      features: {
        keyA: 'valueA',
        keyB: 'valueB',
      },
      experiments: {
        keyC: 'valueC',
        keyD: 'valueD',
      },
    }

    expect(featuresLoadedFromStore(featuresFailEnabled, store)).toBe(false)

    const featuresFailDisabled = {
      enable: ['feature-1', 'feature-2'],
      disable: ['feature-3', 'feature-4', 'feature-x'],
      set: {
        keyX: 'valueX',
        keyY: 'valueY',
      },
      features: {
        keyA: 'valueA',
        keyB: 'valueB',
      },
      experiments: {
        keyC: 'valueC',
        keyD: 'valueD',
      },
    }

    expect(featuresLoadedFromStore(featuresFailDisabled, store)).toBe(false)

    const featuresFailSet = {
      enable: ['feature-1', 'feature-2'],
      disable: ['feature-3', 'feature-4'],
      set: {
        keyX: 'valueX',
        keyY: false,
      },
      features: {
        keyA: 'valueA',
        keyB: 'valueB',
      },
      experiments: {
        keyC: 'valueC',
        keyD: 'valueD',
      },
    }

    expect(featuresLoadedFromStore(featuresFailDisabled, store)).toBe(false)

    const featuresFailFeatures = {
      enable: ['feature-1', 'feature-2'],
      disable: ['feature-3', 'feature-4'],
      set: {
        keyX: 'valueX',
        keyY: 'valueY',
      },
      features: {
        keyA: 'valueA',
        keyB: 'valueSomethingElse',
      },
      experiments: {
        keyC: 'valueC',
        keyD: 'valueD',
      },
    }

    expect(featuresLoadedFromStore(featuresFailFeatures, store)).toBe(false)

    const featuresFailExperiments = {
      enable: ['feature-1', 'feature-2'],
      disable: ['feature-3', 'feature-4'],
      set: {
        keyX: 'valueX',
        keyY: 'valueY',
      },
      features: {
        keyA: 'valueA',
        keyB: 'valueB',
      },
      experiments: {
        keyC: 'valueC',
        keyD: 'valueSomethingElse',
      },
    }

    expect(featuresLoadedFromStore(featuresFailExperiments, store)).toBe(false)
  })
})
