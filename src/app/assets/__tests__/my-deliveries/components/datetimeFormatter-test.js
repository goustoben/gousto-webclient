import { formatFullDate } from '../../../js/my-deliveries/datetimeFormatter'

describe('formatFullDate', () => {
	it('should return an iso datetime into date', () => {
		expect(formatFullDate('2016-09-12T14:13:10.791Z')).toEqual('2016-09-12')
	})
})
