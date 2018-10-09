import React from 'react'
import renderer from 'react-test-renderer'
import FilterTagsList from 'routes/Menu/FilterTagsNav/FilterTagsList'
import Immutable from 'immutable'
import { Provider } from 'react-redux'

describe('FilterTagsList', () => {

	describe('rendering', () => {

		test('Will render FilterTagsList component', () => {
			const store = {
				getState: () => ({
					filters: Immutable.Map({
						currentCollectionId: 'ca8f71be',
						totalTime: '0',
						dietTypes: Immutable.Set(['meat']),
						dietaryAttributes: Immutable.Set(['gluten-free']),
					}),
					pending: Immutable.Map({
						MENU_FETCH_DATA: false,
					}),
				}),
				subscribe: () => {},
			}
			const component = <Provider store={store}>
				<FilterTagsList
					tags={
						[{
							text: 'Gluten Free',
							type: 'dietaryAttribute',
							value: 'gluten-free'
						}, {
							text: 'Meat',
							type: 'dietType',
							value: 'meat'
						}]}
				/>
			</Provider>

			const tree = renderer.create(component).toJSON()

			expect(tree).toMatchSnapshot()
		})
	})
})
