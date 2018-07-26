import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'

import Ctas from 'containers/SubscriptionPause/callsToAction'
import actions from 'actions/subscriptionPause'
import routesConfig from 'config/routes'
import Button from 'Button'
import Link from 'Link'

describe('SubscriptionPause CTA containers', function() {
	let wrapper
	let sandbox
	let subscriptionPauseTrack

	const store = {
		default: () => {},
		subscribe: () => {},
		dispatch: () => {},
		getState: () => {},
	}

	describe('ApplyPromo', function() {
		let subscriptionPauseApplyPromo

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			subscriptionPauseTrack = sandbox.spy(actions, 'subscriptionPauseTrack')
			subscriptionPauseApplyPromo = sandbox.spy(actions, 'subscriptionPauseApplyPromo')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should be a Button', function() {
			wrapper = shallow(<Ctas.ApplyPromo store={store} />)
			expect(wrapper.type()).to.equal(Button)
		})

		it('should call subscriptionPauseTrack with "CTA_CLICK" & correct tracking data on click', function() {
			wrapper = shallow(<Ctas.ApplyPromo store={store} text="sample text" />)
			wrapper.simulate('click')
			expect(subscriptionPauseTrack.callCount).to.equal(1)
			expect(subscriptionPauseTrack.firstCall).to.be.calledWithExactly('CTA_CLICK', { text: 'sample text' })
		})

		it('should call subscriptionPauseApplyPromo with no args on click', function() {
			wrapper = shallow(<Ctas.ApplyPromo store={store} />)
			wrapper.simulate('click')
			expect(subscriptionPauseApplyPromo.callCount).to.equal(1)
			expect(subscriptionPauseApplyPromo.firstCall).to.be.calledWithExactly()
		})

		it('should have text "Activate my discount" by default', function() {
			wrapper = shallow(<Ctas.ApplyPromo store={store} />)
			expect(wrapper.prop('children')).to.equal('Activate my discount')
		})
	})

	describe('Cancel', function() {
		let subscriptionPauseProceed

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			subscriptionPauseTrack = sandbox.spy(actions, 'subscriptionPauseTrack')
			subscriptionPauseProceed = sandbox.spy(actions, 'subscriptionPauseProceed')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should be a Button', function() {
			wrapper = shallow(<Ctas.Cancel store={store} />)
			expect(wrapper.type()).to.equal(Button)
		})

		it('should call subscriptionPauseTrack with "CTA_CLICK" & correct tracking data on click', function() {
			wrapper = shallow(<Ctas.Cancel store={store} text="sample text" />)
			wrapper.simulate('click')
			expect(subscriptionPauseTrack.callCount).to.equal(1)
			expect(subscriptionPauseTrack.firstCall).to.be.calledWithExactly('CTA_CLICK', { text: 'sample text' })
		})

		it('should call subscriptionPauseProceed with "cancel", "recovered" and "changed_mind" on click', function() {
			wrapper = shallow(<Ctas.Cancel store={store} />)
			wrapper.simulate('click')
			expect(subscriptionPauseProceed.callCount).to.equal(1)
			expect(subscriptionPauseProceed.firstCall).to.be.calledWithExactly('cancel', 'recovered', 'changed_mind')
		})

		it('should have text "I\'ve changed my mind" by default', function() {
			wrapper = shallow(<Ctas.Cancel store={store} />)
			expect(wrapper.prop('children')).to.equal("I've changed my mind")
		})
	})

	describe('CancelPendingOrders', function() {
		let subscriptionPauseCancelPendingOrders

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			subscriptionPauseTrack = sandbox.spy(actions, 'subscriptionPauseTrack')
			subscriptionPauseCancelPendingOrders = sandbox.spy(actions, 'subscriptionPauseCancelPendingOrders')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should be a Button', function() {
			wrapper = shallow(<Ctas.CancelPendingOrders store={store} />)
			expect(wrapper.type()).to.equal(Button)
		})

		it('should call subscriptionPauseTrack with "CTA_CLICK" & correct tracking data on click', function() {
			wrapper = shallow(<Ctas.CancelPendingOrders store={store} text="sample text" />)
			wrapper.simulate('click')
			expect(subscriptionPauseTrack.callCount).to.equal(1)
			expect(subscriptionPauseTrack.firstCall).to.be.calledWithExactly('CTA_CLICK', { text: 'sample text' })
		})

		it('should call subscriptionPauseCancelPendingOrders with no args on click', function() {
			wrapper = shallow(<Ctas.CancelPendingOrders store={store} />)
			wrapper.simulate('click')
			expect(subscriptionPauseCancelPendingOrders.callCount).to.equal(1)
			expect(subscriptionPauseCancelPendingOrders.firstCall).to.be.calledWithExactly()
		})

		it('should have text "Cancel order" by default', function() {
			wrapper = shallow(<Ctas.CancelPendingOrders store={store} />)
			expect(wrapper.prop('children')).to.equal('Cancel order')
		})
	})

	describe('CancelLink', function() {
		let subscriptionPauseProceed

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			subscriptionPauseTrack = sandbox.spy(actions, 'subscriptionPauseTrack')
			subscriptionPauseProceed = sandbox.spy(actions, 'subscriptionPauseProceed')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should be a Link', function() {
			wrapper = shallow(<Ctas.CancelLink store={store} />)
			expect(wrapper.type()).to.equal(Link)
		})

		it('should call subscriptionPauseTrack with "CTA_CLICK" & correct tracking data on click', function() {
			wrapper = shallow(<Ctas.CancelLink store={store} text="sample text" />)
			wrapper.simulate('click')
			expect(subscriptionPauseTrack.callCount).to.equal(1)
			expect(subscriptionPauseTrack.firstCall).to.be.calledWithExactly('CTA_CLICK', { text: 'sample text' })
		})

		it('should call subscriptionPauseProceed with "cancel", "recovered" and "changed_mind" on click', function() {
			wrapper = shallow(<Ctas.CancelLink store={store} />)
			wrapper.simulate('click')
			expect(subscriptionPauseProceed.callCount).to.equal(1)
			expect(subscriptionPauseProceed.firstCall).to.be.calledWithExactly('cancel', 'recovered', 'changed_mind')
		})

		it('should have text "I\'ve changed my mind" by default', function() {
			wrapper = shallow(<Ctas.CancelLink store={store} />)
			expect(wrapper.prop('children')).to.equal("I've changed my mind")
		})
	})

	describe('Dismiss', function() {
		let subscriptionPauseEnd

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			subscriptionPauseTrack = sandbox.spy(actions, 'subscriptionPauseTrack')
			subscriptionPauseEnd = sandbox.spy(actions, 'subscriptionPauseEnd')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should be a Button', function() {
			wrapper = shallow(<Ctas.Dismiss store={store} />)
			expect(wrapper.type()).to.equal(Button)
		})

		it('should call subscriptionPauseTrack with "CTA_CLICK" & correct tracking data on click', function() {
			wrapper = shallow(<Ctas.Dismiss store={store} text="sample text" />)
			wrapper.simulate('click')
			expect(subscriptionPauseTrack.callCount).to.equal(1)
			expect(subscriptionPauseTrack.firstCall).to.be.calledWithExactly('CTA_CLICK', { text: 'sample text' })
		})

		it('should call subscriptionPauseEnd with "false" on click', function() {
			wrapper = shallow(<Ctas.Dismiss store={store} />)
			wrapper.simulate('click')
			expect(subscriptionPauseEnd.callCount).to.equal(1)
			expect(subscriptionPauseEnd.firstCall).to.be.calledWithExactly()
		})

		it('should have text "Close" by default', function() {
			wrapper = shallow(<Ctas.Dismiss store={store} />)
			expect(wrapper.prop('children')).to.equal('Close')
		})
	})

	describe('GoToCC', function() {
		let subscriptionPauseRedirect

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			subscriptionPauseTrack = sandbox.spy(actions, 'subscriptionPauseTrack')
			subscriptionPauseRedirect = sandbox.spy(actions, 'subscriptionPauseRedirect')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should be a Button', function() {
			wrapper = shallow(<Ctas.GoToCC store={store} />)
			expect(wrapper.type()).to.equal(Button)
		})

		it('should call subscriptionPauseTrack with "CTA_CLICK" & correct tracking data on click', function() {
			wrapper = shallow(<Ctas.GoToCC store={store} text="sample text" />)
			wrapper.simulate('click')
			expect(subscriptionPauseTrack.callCount).to.equal(1)
			expect(subscriptionPauseTrack.firstCall).to.be.calledWithExactly('CTA_CLICK', { text: 'sample text' })
		})

		it('should call subscriptionPauseRedirect with path configured as client.contact on click', function() {
			wrapper = shallow(<Ctas.GoToCC store={store} />)
			wrapper.simulate('click')
			expect(subscriptionPauseRedirect.callCount).to.equal(1)
			expect(subscriptionPauseRedirect.firstCall).to.be.calledWithExactly(routesConfig.client.help)
		})

		it('should have text "Contact Customer Care" by default', function() {
			wrapper = shallow(<Ctas.GoToCC store={store} />)
			expect(wrapper.prop('children')).to.equal('Contact Customer Care')
		})
	})

	describe('GoToMenu', function() {
		let subscriptionPauseRedirect

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			subscriptionPauseTrack = sandbox.spy(actions, 'subscriptionPauseTrack')
			subscriptionPauseRedirect = sandbox.spy(actions, 'subscriptionPauseRedirect')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should be a Button', function() {
			wrapper = shallow(<Ctas.GoToMenu store={store} />)
			expect(wrapper.type()).to.equal(Button)
		})

		it('should call subscriptionPauseTrack with "CTA_CLICK" & correct tracking data on click', function() {
			wrapper = shallow(<Ctas.GoToMenu store={store} text="sample text" />)
			wrapper.simulate('click')
			expect(subscriptionPauseTrack.callCount).to.equal(1)
			expect(subscriptionPauseTrack.firstCall).to.be.calledWithExactly('CTA_CLICK', { text: 'sample text' })
		})

		it('should call subscriptionPauseRedirect with path configured as client.menu on click', function() {
			wrapper = shallow(<Ctas.GoToMenu store={store} />)
			wrapper.simulate('click')
			expect(subscriptionPauseRedirect.callCount).to.equal(1)
			expect(subscriptionPauseRedirect.firstCall).to.be.calledWithExactly(routesConfig.client.menu)
		})

		it('should have text "See next week\'s menu" by default', function() {
			wrapper = shallow(<Ctas.GoToMenu store={store} />)
			expect(wrapper.prop('children')).to.equal("See next week's menu")
		})
	})

	describe('KeepPendingOrders', function() {
		let subscriptionPauseProceed

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			subscriptionPauseTrack = sandbox.spy(actions, 'subscriptionPauseTrack')
			subscriptionPauseProceed = sandbox.spy(actions, 'subscriptionPauseProceed')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should be a Button', function() {
			wrapper = shallow(<Ctas.KeepPendingOrders store={store} />)
			expect(wrapper.type()).to.equal(Button)
		})

		it('should call subscriptionPauseTrack with "CTA_CLICK" & correct tracking data on click', function() {
			wrapper = shallow(<Ctas.KeepPendingOrders store={store} text="sample text" />)
			wrapper.simulate('click')
			expect(subscriptionPauseTrack.callCount).to.equal(1)
			expect(subscriptionPauseTrack.firstCall).to.be.calledWithExactly('CTA_CLICK', { text: 'sample text' })
		})

		it('should call subscriptionPauseProceed with "pause" and "paused" click', function() {
			wrapper = shallow(<Ctas.KeepPendingOrders store={store} />)
			wrapper.simulate('click')
			expect(subscriptionPauseProceed.callCount).to.equal(1)
			expect(subscriptionPauseProceed.firstCall).to.be.calledWithExactly('pause', 'paused')
		})

		it('should have text "Keep order" by default', function() {
			wrapper = shallow(<Ctas.KeepPendingOrders store={store} />)
			expect(wrapper.prop('children')).to.equal('Keep order')
		})
	})

	describe('Pause', function() {
		let subscriptionPauseReasonSubmit

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			subscriptionPauseTrack = sandbox.spy(actions, 'subscriptionPauseTrack')
			subscriptionPauseReasonSubmit = sandbox.stub(actions, 'subscriptionPauseReasonSubmit')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should be a Button', function() {
			wrapper = shallow(<Ctas.Pause store={store} />)
			expect(wrapper.type()).to.equal(Button)
		})

		it('should call subscriptionPauseTrack with "CTA_CLICK" & correct tracking data on click', function() {
			wrapper = shallow(<Ctas.Pause store={store} text="sample text" />)
			wrapper.simulate('click')
			expect(subscriptionPauseTrack.callCount).to.equal(1)
			expect(subscriptionPauseTrack.firstCall).to.be.calledWithExactly('CTA_CLICK', { text: 'sample text' })
		})

		it('should call subscriptionPauseReasonSubmit with no args on click', function() {
			wrapper = shallow(<Ctas.Pause store={store} />)
			wrapper.simulate('click')
			expect(subscriptionPauseReasonSubmit.callCount).to.equal(1)
			expect(subscriptionPauseReasonSubmit.firstCall).to.be.calledWithExactly()
		})

		it('should have text "Pause anyway" by default', function() {
			wrapper = shallow(<Ctas.Pause store={store} />)
			expect(wrapper.prop('children')).to.equal("Pause anyway")
		})
	})

	describe('Recovered', function() {
		let subscriptionPauseProceed

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			subscriptionPauseTrack = sandbox.spy(actions, 'subscriptionPauseTrack')
			subscriptionPauseProceed = sandbox.spy(actions, 'subscriptionPauseProceed')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should be a Button', function() {
			wrapper = shallow(<Ctas.Recovered store={store} />)
			expect(wrapper.type()).to.equal(Button)
		})

		it('should call subscriptionPauseTrack with "CTA_CLICK" & correct tracking data on click', function() {
			wrapper = shallow(<Ctas.Recovered store={store} text="sample text" />)
			wrapper.simulate('click')
			expect(subscriptionPauseTrack.callCount).to.equal(1)
			expect(subscriptionPauseTrack.firstCall).to.be.calledWithExactly('CTA_CLICK', { text: 'sample text' })
		})

		it('should call subscriptionPauseProceed with "next", "recovered" and "quote" on click', function() {
			wrapper = shallow(<Ctas.Recovered store={store} />)
			wrapper.simulate('click')
			expect(subscriptionPauseProceed.callCount).to.equal(1)
			expect(subscriptionPauseProceed.firstCall).to.be.calledWithExactly('next', 'recovered', 'quote')
		})

		it('should have text "Continue subscription" by default', function() {
			wrapper = shallow(<Ctas.Recovered store={store} />)
			expect(wrapper.prop('children')).to.equal('Continue subscription')
		})
	})

	describe('SkipNextBox', function() {
		let subscriptionPauseSkipNextBox

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			subscriptionPauseTrack = sandbox.spy(actions, 'subscriptionPauseTrack')
			subscriptionPauseSkipNextBox = sandbox.spy(actions, 'subscriptionPauseSkipNextBox')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should be a Button', function() {
			wrapper = shallow(<Ctas.SkipNextBox store={store} />)
			expect(wrapper.type()).to.equal(Button)
		})

		it('should call subscriptionPauseTrack with "CTA_CLICK" & correct tracking data on click', function() {
			wrapper = shallow(<Ctas.SkipNextBox store={store} text="sample text" />)
			wrapper.simulate('click')
			expect(subscriptionPauseTrack.callCount).to.equal(1)
			expect(subscriptionPauseTrack.firstCall).to.be.calledWithExactly('CTA_CLICK', { text: 'sample text' })
		})

		it('should call subscriptionPauseSkipNextBox with no args on click', function() {
			wrapper = shallow(<Ctas.SkipNextBox store={store} />)
			wrapper.simulate('click')
			expect(subscriptionPauseSkipNextBox.callCount).to.equal(1)
			expect(subscriptionPauseSkipNextBox.firstCall).to.be.calledWithExactly()
		})

		it('should have text "Skip one box"', function() {
			wrapper = shallow(<Ctas.SkipNextBox store={store} />)
			expect(wrapper.prop('children')).to.equal('Skip one box')
		})
	})
})
