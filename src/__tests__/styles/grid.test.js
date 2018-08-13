import sinon from 'sinon'

import { getColSizes } from 'styles/grid'

describe('getColSizes', () => {
	test('should transform given breakpoints into class names corresponding to bootstrap grid columns', () => {
		expect(
			getColSizes({
				xs: 12,
				md: 8,
				lg: 6,
			}),
		).toEqual({
			'col-xs-12': true,
			'col-md-8': true,
			'col-lg-6': true,
		})
	})
})
