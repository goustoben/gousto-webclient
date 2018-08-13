import sinon from 'sinon'

import { shallow, mount } from 'enzyme'
import React from 'react'
import Immutable from 'immutable' // eslint-disable-line no-caps
import RecipeSummary from 'routes/Checkout/Components/RecipeSummary'
import BoxDetails from 'routes/Checkout/Components/BoxDetails/BoxDetails'
import Link from 'Link'

describe('BoxDetails', () => {
	let recipes
	let wrapper

	beforeEach(() => {
		recipes = Immutable.Map({ 1: 1, 2: 1, 3: 1, 4: 1 })
		wrapper = shallow(<BoxDetails recipes={recipes} />)
	})

	test('should return a div', () => {
		expect(wrapper.type()).toEqual('div')
	})

	test('should have 1 RecipeSummary', () => {
		expect(wrapper.find(RecipeSummary).length).toEqual(1)
	})

	test('should return a h3', () => {
		expect(wrapper.find('h3').length).toEqual(1)
	})

	test('should not return a <Link> when max recipes have been chosen', () => {
		expect(wrapper.find(Link).length).toEqual(0)
	})

	test('should return a <Link> when max recipes is not reached', () => {
		recipes = Immutable.fromJS({ 1: 1, 2: 1 })
		wrapper = shallow(<BoxDetails recipes={recipes} />)
		expect(wrapper.find(Link).length).toEqual(1)
	})

	test('should render 1 <RecipeSummary>', () => {
		expect(wrapper.find(RecipeSummary).length).toEqual(1)
	})

	test('should render a <div> with no props', () => {
		expect(wrapper.type()).toEqual('div')
	})

	test('should contain <Link> when max recipe count specified and not reach', () => {
		recipes = Immutable.Map({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 })
		wrapper = shallow(<BoxDetails maxRecipesNum={8} recipes={recipes} />)
		expect(wrapper.find(Link).length).toEqual(1)
	})
})
