import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import InfoBadge from 'Recipe/InfoBadge'

import RecommendedBadge from 'Recipe/RecommendedBadge'

describe('<RecommendedBadge />', () => {
	let wrapper
	let features

	xit('should not render a badge by default', function() {
		wrapper = shallow(<RecommendedBadge />)
		expect(wrapper.find(InfoBadge).length).toBe(0)
	})

	xit('should render a badge if recipe is recommended and recommended feature set', function() {
		features = Immutable.fromJS({
			recommendedBadge: {
				value: true,
			},
		})
		wrapper = shallow(
			<RecommendedBadge isRecommendedRecipe features={features} />,
		)
		expect(wrapper.find(InfoBadge).length).toBe(1)
		expect(wrapper.find(InfoBadge).prop('recommended')).toBe(true)
	})

	xit('should not render a badge if recipe is not recommended and recommended feature set', function() {
		features = Immutable.fromJS({
			recommendedBadge: true,
		})
		wrapper = shallow(<RecommendedBadge features={features} />)
		expect(wrapper.find(InfoBadge).length).toBe(0)
	})

	xit('should not render a badge if recipe is recommended and recommended feature not set', function() {
		features = Immutable.fromJS({
			recommendedBadge: null,
		})
		wrapper = shallow(
			<RecommendedBadge isRecommendedRecipe features={features} />,
		)
		expect(wrapper.find(InfoBadge).length).toBe(0)
	})
})
