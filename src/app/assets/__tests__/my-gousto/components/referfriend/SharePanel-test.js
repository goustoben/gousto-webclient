

const React = require('react')
const Enzyme = require('enzyme')

let shallowRenderer

const SharePanel = require('../../../../js/my-gousto/components/referfriend/SharePanel')

describe('SharePanel', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})
	it('should return a <div>', function() {
		const result = shallowRenderer(<SharePanel />)


		expect(result.type()).toBe('div')
	})
	it('should have a child of <div.share/>', function() {
		const result = shallowRenderer(<SharePanel />)


		expect(result.find('.share').length).toEqual(1)
	})
	it('should have a child of <p.share-body/>', function() {
		const result = shallowRenderer(<SharePanel />)


		expect(result.find('.share-body').length).toEqual(1)
	})
	it('should have a child of <a.share-invite-friend/>', function() {
		const result = shallowRenderer(<SharePanel />)


		expect(result.find('.share-invite-friend').length).toEqual(1)
	})
	it('should have a child of <h3.share-heading/>', function() {
		const result = shallowRenderer(<SharePanel />)


		expect(result.find('.share-heading').length).toEqual(1)
	})
})
