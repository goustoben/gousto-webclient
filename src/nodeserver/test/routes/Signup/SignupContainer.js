import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { shallow } from 'enzyme'
import React from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */
import SignupContainer from 'routes/Signup/SignupContainer'

describe('SignupContainer', function() {
	let wrapper

	const ownProps = {
		params: {
			stepName: 'exampleStep',
		},
	}

	beforeEach(function() {
		wrapper = shallow(<SignupContainer {...ownProps} />, {
			context: {
				store: {
					getState: () => ({
						signup: Immutable.fromJS({
							wizard: {
								steps: ['a', 'b', 'c'],
							}
						}),
						features: Immutable.Map({}),
					}),
				},
			},
		})
	})

	describe('', function() {
		it('should map stepName value through to the props correctly', function() {
			expect(wrapper.prop('stepName')).to.equal('exampleStep')
		})

		it('should map steps value from store to props', function() {
			expect(Immutable.is(wrapper.prop('steps'), Immutable.List(['a', 'b', 'c']))).to.equal(true)
		})

		it('should not add defaults steps if not requested', function() {
			wrapper = shallow(<SignupContainer {...ownProps} />, {
				context: {
					store: {
						getState: () => ({
							signup: Immutable.fromJS({
								wizard: {
									steps: ['c'],
								}
							}),
							features: Immutable.Map({}),
							signupSteps: Immutable.List(['c']),
						}),
					},
				},
			})

			expect(Immutable.is(wrapper.prop('steps'), Immutable.List(['c']))).to.equal(true)
		})
	})
})
