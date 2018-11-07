import { React } from 'react'
import { mount } from 'enzyme'
import { RecipeList } from 'routes/GetHelp/components/RecipeList'

describe('<RecipeList />', () => {
	describe('rendering', () => {
		test('component is rendering correctly', () => {
			const recipes = [
				{ id: '1', title: 'test 1', ingredients: [{ id: '1', label: 'test' }] },
				{ id: '2', title: 'test 2', ingredients: [{ id: '2', label: 'test' }] },
				{ id: '3', title: 'test 3', ingredients: [{ id: '3', label: 'test' }] },
				{ id: '4', title: 'test 4', ingredients: [{ id: '4', label: 'test' }] },
			]
			const wrapper = mount(
				<RecipeList
					recipes={recipes}
				/>
			)

			expect(wrapper.find('List')).toHaveLength(1)

			console.log(wrapper.find('Recipe'))
		})
	})
})
