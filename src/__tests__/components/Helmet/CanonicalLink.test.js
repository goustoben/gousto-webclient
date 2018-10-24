import React from 'react'
import { shallow } from 'enzyme'

import Helmet from 'react-helmet'
import CanonicalLink from 'Helmet/CanonicalLink'

describe('Helmet CanonicalLink', () => {
	test('should return 1 Helmet', () => {
		expect(shallow(<CanonicalLink href={''} />).type()).toBe(Helmet)
	})

	test('should set canonical to provided href', () => {
		const link = shallow(
			<CanonicalLink href="http://www.something.com" />,
		).prop('link')
		expect(link).toHaveLength(1)
		expect(link[0]).toEqual({
			rel: 'canonical',
			href: 'http://www.something.com',
		})
	})
})
