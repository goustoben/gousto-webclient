import Immutable from 'immutable'
import transit from 'transit-immutable-js'
import encodeState from 'server/encodeState'

describe('encodeState', () => {
  test('should serialise the immutablejs state tree', () => {
    const input = Immutable.fromJS({
      object: {
        nested: {
          value: 'value1',
          value2: 'value2',
        },
      },
    })

    const serialised = encodeState(input)
    const deserialised = transit.fromJSON(JSON.parse(serialised))

    expect(deserialised).toEqual(input)
  })
})
