

const React = require('react')
const Enzyme = require('enzyme')
const Immutable = require('immutable')

let shallowRenderer

const ThumbnailList = require('../../../js/order-summary/components/thumbnail/ThumbnailList')
const ThumbnailItem = require('../../../js/order-summary/components/thumbnail/ThumbnailItem')

describe('ThumbnailList', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})

	it('should have a thumbnail item for each gift user has', function() {
		const gifts = Immutable.OrderedMap({
			'gift-1': Immutable.Map({id: 'gift-1', price: '1.12', qty: 1, title: 'Gift A'}),
			'gift-2': Immutable.Map({id: 'gift-2', price: '2.12', qty: 2, title: 'Gift B'})
		})

		const result = shallowRenderer(<ThumbnailList userGifts={gifts} userChoices={Immutable.OrderedMap({})}/>)

		const thumbnailItems = result.find(ThumbnailItem)

		expect(thumbnailItems.length).toEqual(2)
	})

	it('should set item isGift prop to true for gifts', function() {
		const gifts = Immutable.OrderedMap({
			'gift-1': Immutable.Map({id: 'gift-1', price: '1.12', qty: 1, title: 'Gift A'}),
		})
		const result = shallowRenderer(<ThumbnailList userGifts={gifts} userChoices={Immutable.OrderedMap({})} />)

		const thumbnailItems = result.find(ThumbnailItem)
		expect(thumbnailItems.props().isGift).toBe(true)
	})

	it('should set item isGift prop to false for non-gifts', function() {
		const gifts = Immutable.OrderedMap({})
		const userProducts = Immutable.OrderedMap({
			'prod-1': Immutable.Map({1: Immutable.Map({qty: 3})})
		})
		const products = Immutable.OrderedMap({
			'prod-1': Immutable.Map({title: 'product'})
		})
		const result = shallowRenderer(<ThumbnailList userGifts={gifts} userChoices={userProducts} products={products}/>)

		const thumbnailItems = result.find(ThumbnailItem)
		expect(thumbnailItems.props().isGift).toBe(false)
	})

})
