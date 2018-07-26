import React from 'react'
import { shallow } from 'enzyme'

import Immutable from 'immutable'
import routeConfig from 'config/routes'

import Item from 'Collection/Item'
import List from 'Collection/List'
import { Col, Row } from 'Page/Grid'

describe('Collection List', () => {
	const collections = Immutable.fromJS({
		collection1: {
			id: 'collection1',
			media: {
				images: {
					urls: [
						{ url: 'image1.small.jpg' },
						{ url: 'image1.medium.jpg' },
						{ url: 'image1.large.jpg' },
					],
				},
			},
			slug: 'collection-1',
			shortTitle: 'Collection 1',
		},
		collection2: {
			id: 'collection2',
			media: {
				images: {
					urls: [
						{ url: 'image2.small.jpg' },
						{ url: 'image2.medium.jpg' },
						{ url: 'image2.large.jpg' },
					],
				},
			},
			slug: 'collection-2',
			shortTitle: 'Collection 2',
		},
	})

	describe('rendering', () => {
		test('should return a Row', () => {
			const wrapper = shallow(<List />)
			expect(wrapper.type()).toBe(Row)
		})

		test('should return 1 nested Col in Row for each collection item', () => {
			const wrapper = shallow(<List collections={collections} />)
			expect(wrapper.children(Col).length).toBe(2)
		})

		test('should return 1 nested Item in Col for each collection item', () => {
			const wrapper = shallow(<List collections={collections} />)
			expect(wrapper.children(Col).children(Item).length).toBe(2)
		})
	})

	describe('props', () => {
		test('should pass colSizes to nested Col', () => {
			const wrapper = shallow(
				<List collections={collections} colSizes={{ xs: '12', md: '4' }} />,
			)
			wrapper.children(Col).forEach(function(col) {
				expect(col.prop('col-xs-12')).toBe(true)
				expect(col.prop('col-md-4')).toBe(true)
			})
		})

		test('should pass correct link to Item', () => {
			const wrapper = shallow(<List collections={collections} />)

			expect(
				wrapper
					.children(Col)
					.first()
					.find(Item)
					.prop('link'),
			).toBe(`${routeConfig.client.cookbook}/collection-1`)

			expect(
				wrapper
					.children(Col)
					.at(1)
					.find(Item)
					.prop('link'),
			).toBe(`${routeConfig.client.cookbook}/collection-2`)
		})

		test('should pass correct media to Item', () => {
			const wrapper = shallow(
				<List collections={collections} colsize1 colsize2 />,
			)

			expect(
				wrapper
					.children(Col)
					.first()
					.find(Item)
					.prop('media'),
			).toEqual(
				Immutable.fromJS([
					{ url: 'image1.small.jpg' },
					{ url: 'image1.medium.jpg' },
					{ url: 'image1.large.jpg' },
				]),
			)

			expect(
				wrapper
					.children(Col)
					.at(1)
					.find(Item)
					.prop('media'),
			).toEqual(
				Immutable.fromJS([
					{ url: 'image2.small.jpg' },
					{ url: 'image2.medium.jpg' },
					{ url: 'image2.large.jpg' },
				]),
			)
		})

		test('should pass correct title to Item', () => {
			const wrapper = shallow(
				<List collections={collections} colsize1 colsize2 />,
			)

			expect(
				wrapper
					.children(Col)
					.first()
					.find(Item)
					.prop('title'),
			).toBe('Collection 1')

			expect(
				wrapper
					.children(Col)
					.at(1)
					.find(Item)
					.prop('title'),
			).toBe('Collection 2')
		})
	})
})
