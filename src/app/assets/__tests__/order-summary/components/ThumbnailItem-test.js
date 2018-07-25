

const React = require('react')
const Enzyme = require('enzyme')

let shallowRenderer

const ThumbnailItem = require('../../../js/order-summary/components/thumbnail/ThumbnailItem')

describe('ThumbnailItem', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})

	it('does not show remove button if item is gift', function() {
		const result = shallowRenderer(<ThumbnailItem isGift={true} />)


		expect(result.find('.glyphicon-remove').length).toEqual(0)
	})
	it('shows free gift text if item is gift', function() {
		const result = shallowRenderer(<ThumbnailItem isGift={true} />)


		expect(result.find('.free-gift-text').length).toEqual(1)
	})
	it('shows remove button if item is not gift', function() {
		const result = shallowRenderer(<ThumbnailItem isGift={false} />)


		expect(result.find('.glyphicon-remove').length).toEqual(1)
	})
	it('does not show free gift text if item is not gift', function() {
		const result = shallowRenderer(<ThumbnailItem isGift={false} />)


		expect(result.find('.free-gift-text').length).toEqual(0)
	})
})
