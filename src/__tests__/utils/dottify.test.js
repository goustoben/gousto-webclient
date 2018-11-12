import sinon from 'sinon'

import dottify from 'utils/dottify'

describe('dottify', () => {
  test('should turn the first key of the object into a dot separated array', () => {
    const obj = {
      country: {
        county: {
          city: 'London',
        },
        country1: 'London1',
      },
    }

    expect(dottify(obj)).toEqual('country.county.city')
  })

  test('should hadle null', () => {
    const obj = {
      country: {
        county: {
          city: null,
        },
        country1: 'London1',
      },
    }

    expect(dottify(obj)).toEqual('country.county.city')
  })
})
