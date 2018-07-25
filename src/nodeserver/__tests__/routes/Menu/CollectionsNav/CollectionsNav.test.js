import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */

jest.mock('utils/window', () => ({
	getWindow: () => ({
		innerWidth: 200,
	}),
}))

import css from 'routes/Menu/CollectionsNav/CollectionsNav.css'
import CollectionsNav from 'routes/Menu/CollectionsNav/CollectionsNav'
import CollectionItem from 'routes/Menu/CollectionItem'

describe('<CollectionsNav />', () => {
	let wrapper
	let menuCollections
	let collectionFilterChange
	let featureSet
	let menuCurrentCollectionId
	let items

	beforeEach(() => {
		menuCollections = Immutable.OrderedMap({
			'123-123-123': Immutable.Map({
				id: '123-123-123',
				shortTitle: 'Burgers!',
				colour: 'brown',
				scheduleStart: '2016-01-01',
				scheduleEnd: '2018-01-01',
				published: true,
			}),
			'345-345-345': Immutable.Map({
				id: '345-345-345',
				shortTitle: 'Savour the Summer',
				colour: 'orange',
				scheduleStart: '2016-01-01',
				scheduleEnd: '2018-01-01',
				published: true,
			}),
			'678-678-678': Immutable.Map({
				id: '678-678-678',
				shortTitle: 'Quick Meals',
				colour: 'yellow',
				scheduleStart: '2016-01-01',
				scheduleEnd: '2018-01-01',
				published: true,
			}),
		})
		collectionFilterChange = jest.fn()
		featureSet = jest.fn()
		menuCurrentCollectionId = '345-345-345'
		wrapper = shallow(
			<CollectionsNav
				menuCollections={menuCollections}
				collectionFilterChange={collectionFilterChange}
				menuCurrentCollectionId={menuCurrentCollectionId}
				featureSet={featureSet}
				features={Immutable.fromJS({ menuStickyCollections: { value: true } })}
			/>,
		)
	})

	test('should render a div', () => {
		expect(wrapper.type()).toEqual('div')
	})

	test('should render the given collection items as divs with their "shortTitle" in', () => {
		items = wrapper.find(CollectionItem)

		expect(items.length).toEqual(3)
		expect(items.at(0).find('span').text()).toEqual('Burgers!')
		expect(items.at(1).find('span').text()).toEqual('Savour the Summer')
		expect(items.at(2).find('span').text()).toEqual('Quick Meals')
	})

	test('should call the collectionFilterChange function prop when a collection is clicked & sticky feature is enabled', () => {
		items = wrapper.find(CollectionItem)
		items.at(2).simulate('click')

		expect(collectionFilterChange).toHaveBeenCalledTimes(1)
		expect(collectionFilterChange.mock.calls[0][0]).toEqual('678-678-678')
	})

	test('should NOT call the collectionFilterChange function when a collection is clicked & sticky feature is disabled', () => {
		menuCollections = Immutable.OrderedMap({
			'123-123-123': Immutable.Map({
				id: '123-123-123',
				shortTitle: 'Burgers!',
				colour: 'brown',
				scheduleStart: '2016-01-01',
				scheduleEnd: '2018-01-01',
				published: true,
			}),
		})
		collectionFilterChange = jest.fn()
		featureSet = jest.fn()
		menuCurrentCollectionId = '345-345-345'
		wrapper = shallow(
			<CollectionsNav
				menuCollections={menuCollections}
				collectionFilterChange={collectionFilterChange}
				menuCurrentCollectionId={menuCurrentCollectionId}
				featureSet={featureSet}
				features={Immutable.fromJS({ menuStickyCollections: { value: false } })}
			/>,
		)

		items = wrapper.find(CollectionItem)
		items.at(2).simulate('click')

		expect(collectionFilterChange).not.toHaveBeenCalled()
	})

	test('should change the class of the current collection to be currentItem', () => {
		const currentItems = wrapper.find(
			`.${css.currentItem.split(' ').join('.')}`,
		)
		expect(currentItems.length).toEqual(1)
	})

	test('should always show collections which should always be shown on the menu', () => {
		wrapper = shallow(
			<CollectionsNav
				menuCollections={menuCollections}
				collectionFilterChange={collectionFilterChange}
				menuCurrentCollectionId={menuCurrentCollectionId}
			/>,
		)
		items = wrapper.find(CollectionItem)
		expect(items.length).toEqual(3)
	})

	describe('nav arrows', () => {
		beforeEach(() => {
			menuCollections = Immutable.fromJS({
				'123-123-123': {
					id: '123-123-123',
					shortTitle: '123-123-123',
				},
				'234-234-234': {
					id: '234-234-234',
					shortTitle: '234-234-234',
				},
				'345-345-345': {
					id: '345-345-345',
					shortTitle: '345-345-345',
				},
			}).toOrderedMap()
			menuCurrentCollectionId = '234-234-234'
			collectionFilterChange = jest.fn()
			featureSet = jest.fn()

			wrapper = shallow(
				<CollectionsNav
					menuCollections={menuCollections}
					menuCurrentCollectionId={menuCurrentCollectionId}
					collectionFilterChange={collectionFilterChange}
					featureSet={featureSet}
					features={Immutable.fromJS({
						menuStickyCollections: { value: true },
					})}
				/>,
			)
		})

		describe('nextCollection', () => {
			test("should call collectionFilterChange with the next collection's id", () => {
				wrapper.instance().nextCollection()

				expect(collectionFilterChange).toHaveBeenCalledTimes(1)
				expect(collectionFilterChange).toHaveBeenLastCalledWith(
					'345-345-345',
				)
			})

			test('should not call collectionFilterChange if it is the last collection', () => {
				menuCurrentCollectionId = '345-345-345'
				wrapper = shallow(
					<CollectionsNav
						menuCollections={menuCollections}
						menuCurrentCollectionId={menuCurrentCollectionId}
						collectionFilterChange={collectionFilterChange}
						featureSet={featureSet}
					/>,
				)

				wrapper.instance().nextCollection()

				expect(collectionFilterChange).not.toHaveBeenCalled()
			})

			test('should cope with an empty menuCollections list', () => {
				menuCollections = Immutable.fromJS({}).toOrderedMap()
				wrapper = shallow(
					<CollectionsNav
						menuCollections={menuCollections}
						menuCurrentCollectionId={menuCurrentCollectionId}
						collectionFilterChange={collectionFilterChange}
						featureSet={featureSet}
					/>,
				)

				wrapper.instance().nextCollection()

				expect(collectionFilterChange).not.toHaveBeenCalled()
			})
		})
		describe('prevCollection', () => {
			test("should call collectionFilterChange with the previous collection's id", () => {
				wrapper.instance().prevCollection()

				expect(collectionFilterChange).toHaveBeenCalledTimes(1)
				expect(collectionFilterChange).toHaveBeenLastCalledWith(
					'123-123-123',
				)
			})

			test('should not call collectionFilterChange if it is the first collection', () => {
				menuCurrentCollectionId = '123-123-123'
				wrapper = shallow(
					<CollectionsNav
						menuCollections={menuCollections}
						menuCurrentCollectionId={menuCurrentCollectionId}
						collectionFilterChange={collectionFilterChange}
						featureSet={featureSet}
					/>,
				)
				wrapper.instance().prevCollection()

				expect(collectionFilterChange).not.toHaveBeenCalled()
			})

			test('should cope with an empty menuCollections list', () => {
				menuCollections = Immutable.fromJS({}).toOrderedMap()
				wrapper = shallow(
					<CollectionsNav
						menuCollections={menuCollections}
						menuCurrentCollectionId={menuCurrentCollectionId}
						collectionFilterChange={collectionFilterChange}
						featureSet={featureSet}
					/>,
				)

				wrapper.instance().prevCollection()
				expect(collectionFilterChange).not.toHaveBeenCalled()
			})
		})

		describe('changeCollection', () => {
			test('should call collectionFilterChange', () => {
				menuCurrentCollectionId = '123-123-123'
				wrapper.instance().changeCollection(menuCurrentCollectionId)

				expect(collectionFilterChange).toHaveBeenCalledTimes(1)
				expect(collectionFilterChange).toHaveBeenLastCalledWith(
					'123-123-123',
				)
				expect(featureSet).toHaveBeenCalled()
				expect(featureSet).toHaveBeenLastCalledWith(
					'preferredCollection',
					'123-123-123',
				)
			})

			test('should NOT call collectionFilterChange', () => {
				wrapper.instance().changeCollection()

				expect(collectionFilterChange).not.toHaveBeenCalled()
			})
		})

		describe('click event', () => {
			test('should call collectionFilterChange', () => {
				wrapper = shallow(
					<CollectionsNav
						menuCollections={menuCollections}
						menuCurrentCollectionId={menuCurrentCollectionId}
						collectionFilterChange={collectionFilterChange}
						featureSet={featureSet}
					/>,
				)
				const collections = wrapper.find(CollectionItem).filterWhere(function(n) {
					return n.prop('dataId') === '123-123-123'
				})

				expect(collections.length).toBeGreaterThan(0)

				collections.forEach(node => {
					node.simulate('click')
					expect(collectionFilterChange).toHaveBeenCalledTimes(1)
				})
			})
		})
	})
})
