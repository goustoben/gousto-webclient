import { shallow } from 'enzyme'
import React from 'react'
import Immutable from 'immutable' // eslint-disable-line no-caps
import GoustoImage from 'Image'
import OrderedRecipe from 'routes/Checkout/Components/RecipeSummary/OrderedRecipe'

describe('OrderedRecipe', () => {
	const title = 'test'
	const recipeId = '1'
	const stock = 1
	const media = Immutable.fromJS([''])
	const basics = Immutable.fromJS(['test'])

	test('should return a div', () => {
		const wrapper = shallow(
			<OrderedRecipe
				title={title}
				recipeId={recipeId}
				stock={stock}
				media={media}
				basics={basics}
			/>,
		)
		expect(wrapper.type()).toEqual('div')
	})

	test('should have one GoustoImage', () => {
		const wrapper = shallow(
			<OrderedRecipe
				title={title}
				recipeId={recipeId}
				stock={stock}
				media={media}
				basics={basics}
			/>,
		)
		expect(wrapper.find(GoustoImage).length).toEqual(1)
	})

	test('should render a <div> with no props', () => {
		const wrapper = shallow(<OrderedRecipe />)
		expect(wrapper.type()).toEqual('div')
	})
})
