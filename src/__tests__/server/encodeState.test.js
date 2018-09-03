import Immutable from 'immutable'
import transit from 'transit-immutable-js'
import encodeState from 'server/encodeState'

describe('encodeState', () => {
	test('should encode the given object', () => {
		const state = Immutable.fromJS({
			object: {
				nested: {
					value: 'value1',
					value2: 'value2',
				},
			},
		})
		const expected = JSON.stringify(
			Buffer.from(encodeURIComponent(transit.toJSON(state))).toString('base64'),
		)

		expect(encodeState(state)).toBe(expected)
	})
})
