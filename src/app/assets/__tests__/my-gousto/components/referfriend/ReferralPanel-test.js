

const React = require('react')
const Enzyme = require('enzyme')

let shallowRenderer

const ReferralPanel = require('../../../../js/my-gousto/components/referfriend/ReferralPanel')

describe('ReferralPanel', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})
	it('should return a <div>', function() {
		const result = shallowRenderer(<ReferralPanel />)


		expect(result.type()).toBe('div')
	})
	it('should have a child of <div.referral--left/>', function() {
		const result = shallowRenderer(<ReferralPanel />)


		expect(result.find('.referral--left').length).toEqual(1)
	})
	it('should have a child of <div.referral--centre/>', function() {
		const result = shallowRenderer(<ReferralPanel />)


		expect(result.find('.referral--centre').length).toEqual(2)
	})
})
