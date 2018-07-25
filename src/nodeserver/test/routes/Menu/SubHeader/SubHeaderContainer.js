import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Immutable from 'immutable'
import React from 'react'
import { shallow } from 'enzyme'

const SubHeaderContainer = require('inject-loader?./SubHeader!routes/Menu/SubHeader/SubHeaderContainer')({
	'./SubHeader': () => (<div />),
}).default

describe('SubHeaderContainer', function () {
	it('should show VegetarianFilter when collections are used and collections nav is shown', function () {
		const wrapper = shallow(<SubHeaderContainer />, {
			context: {
				store: {
					getState: () => ({
						auth: Immutable.fromJS({}),
						features: Immutable.fromJS({
							collections: {
								value: true,
							},
							collectionsNav: {
								value: true,
							},
						}),
						basket: Immutable.Map({
							date: '2016-01-01',
						}),
					}),
				},
			},
		})

		expect(wrapper.prop('showVegetarianFilter')).to.equal(false)
	})

	it('should show VegetarianFilter when collections are used and collections nav is shown', function () {
		const wrapper = shallow(<SubHeaderContainer />, {
			context: {
				store: {
					getState: () => ({
						auth: Immutable.fromJS({}),
						features: Immutable.fromJS({
							collections: {
								value: true,
							},
						}),
						basket: Immutable.Map({
							date: '2016-01-01',
						}),
					}),
				},
			},
		})

		expect(wrapper.prop('showVegetarianFilter')).to.equal(false)
	})

	it('should not show VegetarianFilter when collections are used and collections nav is not shown', function () {
		const wrapper = shallow(<SubHeaderContainer />, {
			context: {
				store: {
					getState: () => ({
						auth: Immutable.fromJS({}),
						features: Immutable.fromJS({
							collections: {
								value: true,
							},
							collectionsNav: {
								value: false,
							},
						}),
						basket: Immutable.Map({
							date: '2016-01-01',
						}),
					}),
				},
			},
		})

		expect(wrapper.prop('showVegetarianFilter')).to.equal(true)
	})

	it('should not show VegetarianFilter when force collections are used and collections nav is shown', function () {
		const wrapper = shallow(<SubHeaderContainer />, {
			context: {
				store: {
					getState: () => ({
						auth: Immutable.fromJS({}),
						features: Immutable.fromJS({
							forceCollections: {
								value: true,
							},
						}),
						basket: Immutable.Map({
							date: '2016-01-01',
						}),
					}),
				},
			},
		})

		expect(wrapper.prop('showVegetarianFilter')).to.equal(false)
	})

	it('should not show VegetarianFilter when force collections are used and collections nav is not shown', function () {
		const wrapper = shallow(<SubHeaderContainer />, {
			context: {
				store: {
					getState: () => ({
						auth: Immutable.fromJS({}),
						features: Immutable.fromJS({
							forceCollections: {
								value: true,
							},
							collectionsNav: {
								value: false,
							},
						}),
						basket: Immutable.Map({
							date: '2016-01-01',
						}),
					}),
				},
			},
		})

		expect(wrapper.prop('showVegetarianFilter')).to.equal(false)
	})

	it('should not show VegetarianFilter when force collections are used with a bunch of other feature flags', function () {
		const wrapper = shallow(<SubHeaderContainer />, {
			context: {
				store: {
					getState: () => ({
						auth: Immutable.fromJS({}),
						features: Immutable.fromJS({
							forceCollections: {
								value: true,
							},
							unpubCollections: {
								value: true,
							},
							collections: {
								value: true,
							},
							collectionFreeze: {
								value: '12-recipes',
							},
							collectionsNav: {
								value: false,
							},
						}),
						basket: Immutable.Map({
							date: '2016-01-01',
						}),
					}),
				},
			},
		})

		expect(wrapper.prop('showVegetarianFilter')).to.equal(false)
	})
})
