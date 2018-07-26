import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import Helmet from 'react-helmet'
import OpenGraph from 'Helmet/OpenGraph'
import localisation from 'config/localisation'

describe('Helmet OpenGraph', () => {
	test('should return 1 Helmet', () => {
		expect(shallow(<OpenGraph />).type()).toBe(Helmet)
	})

	test('should set correct meta data', () => {
		const meta = shallow(
			<OpenGraph
				href="https://www.something.com"
				imageUrl="http://www.something.com/image.png"
			/>,
		).prop('meta')

		expect(meta).toEqual([
			{
				property: 'og:description',
				content: 'Gousto',
			},
			{
				property: 'og:image',
				content: 'http://www.something.com/image.png',
			},
			{
				property: 'og:image:height',
				content: 766,
			},
			{
				property: 'og:image:width',
				content: 1267,
			},
			{
				property: 'og:site_name',
				content: 'Gousto',
			},
			{
				property: 'og:title',
				content: 'Gousto',
			},
			{
				property: 'og:type',
				content: 'website',
			},
			{
				property: 'og:url',
				content: 'https://www.something.com',
			},
			{
				property: 'og:locale',
				content: localisation.locale,
			},
		])
	})
})
