import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'
import Button from 'Button'
import Link from 'Link'

describe('Subscription Pause CallToAction', function() {
	let CallToAction
	let wrapper

	const store = {
		default: () => {},
		subscribe: () => {},
		dispatch: () => {},
		getState: () => {},
	}

	describe('rendering', function() {
		beforeEach(function() {
			CallToAction = require('inject-loader?containers/SubscriptionPause/callsToAction!routes/Account/Subscription/SubscriptionPause/CallToAction')({
				'containers/SubscriptionPause/callsToAction': {
					Cancel: Button,
					CancelLink: Link,
				},
			}).default
		})

		it('should return null if no type match is found', function() {
			wrapper = shallow(<CallToAction />)
			expect(wrapper.type()).to.equal(null)

			wrapper = shallow(<CallToAction type="NotFoundType" />)
			expect(wrapper.type()).to.equal(null)
		})

		it('should return correct call to action if type match is found', function() {
			wrapper = shallow(
				<CallToAction
					store={store}
					type="Cancel"
				/>
			).shallow()
			console.log(wrapper)
			expect(wrapper.type()).to.equal(Button)
		})

		it('should pass through all parameters passed in as props aside from "type"', function() {
			wrapper = shallow(
				<CallToAction
					type="Cancel"
					text="Sample Text"
					color="secondary"
					anything="any value"
					store={store}
				/>
			).shallow()

			const renderedComponent = wrapper.find(Button)

			expect(renderedComponent.prop('text')).to.equal('Sample Text')
			expect(renderedComponent.prop('color')).to.equal('secondary')
			expect(renderedComponent.prop('anything')).to.equal('any value')
			expect(renderedComponent.prop('type')).to.equal(undefined)
		})
	})
})
