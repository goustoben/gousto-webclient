import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'

import CollectionItem from 'routes/Menu/CollectionItem'
import FilterItem from 'routes/Menu/FilterMenu/FilterItem'

import CollectionFilter from 'routes/Menu/FilterMenu/CollectionFilter/CollectionFilter'

describe('<CollectionFilter />', () => {
	let wrapper
	let collections

	test('should display a FilterItem for each collection passed', () => {
		collections = Immutable.Map({ a: Immutable.Map(), b: Immutable.Map() })
		wrapper = shallow(<CollectionFilter collections={collections} />)

		expect(wrapper.find(FilterItem)).toHaveLength(collections.size)
	})

	describe('CollectionItem', () => {
		test('should dispatch a filterCollectionChange when clicked', () => {
			const filterCollectionChange = jest.fn()
			collections = Immutable.Map({
				a: Immutable.Map({ id: 'a-clicked' }),
			})
			wrapper = shallow(<CollectionFilter
				collections={collections}
				filterCollectionChange={filterCollectionChange}
			/>)
			wrapper.find(FilterItem).first().simulate('click')

			expect(filterCollectionChange).toHaveBeenCalledWith('a-clicked')
		})

		test('should be checked if collectionId matches the currentCollection', () => {
			collections = Immutable.Map({
				a: Immutable.Map({ id: 'a-id' }),
				b: Immutable.Map({ id: 'b-id' }),
			})
			wrapper = shallow(<CollectionFilter collections={collections} currentCollectionId={'b-id'} />)

			expect(wrapper.find(FilterItem).at(0).prop('checked')).toBeFalsy()
			expect(wrapper.find(FilterItem).at(1).prop('checked')).toBeTruthy()
		})
	})
})
