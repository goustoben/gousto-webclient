

const Immutable = require('immutable')

const actionUtils = require('../../../js/products/actions/actionUtils')

describe('actionUtils', function() {
	describe('checkLimitReached', function() {
		it('should check for stock limits', () => {

			let state = {
				products: Immutable.Map({}),
				categories: Immutable.Map({}),
				userChoices: Immutable.Map({
					'prod-1': Immutable.Map({1: Immutable.Map({qty: 3})})
				}),
				userGifts: Immutable.Map({}),
				stock: Immutable.Map({
					'prod-1': 3
				})
			}

			expect(actionUtils.checkLimitReached(1, 'prod-1', state)).toEqual('Sorry, we don\'t have any more in stock')
		})

		it('should check for stock limits but not include gifts', () => {
			let state = {
				products: Immutable.Map({
					prod1: Immutable.Map({categories: [{id: 'cat1'}]}),
				}),
				categories: Immutable.Map({
					cat1: Immutable.Map({id: 'cat1', box_limit: 10, 'title': 'category 1'}),
				}),
				userChoices: Immutable.Map({
					prod1: Immutable.Map({1: Immutable.Map({qty: 2})}),
				}),
				userGifts: Immutable.Map({
					prod1: Immutable.Map({qty: 1}),
				}),
				stock: Immutable.Map({
					prod1: 3
				})
			}

			expect(actionUtils.checkLimitReached(1, 'prod1', state)).toBe(false)
		})


		it('should check for overall box limit - add new product', () => {
			let state = {
				products: Immutable.Map({}),
				categories: Immutable.Map({}),
				userChoices: Immutable.Map({
					'prod-3': Immutable.Map({1: Immutable.Map({qty: 5})})
				}),
				userGifts: Immutable.Map({
					'prod-2': Immutable.Map({qty: 5}),
				}),
				stock: Immutable.Map({
					'prod-1': 15
				})
			}

			expect(actionUtils.checkLimitReached(1, 'prod-1', state)).toEqual('Sorry, we can\'t fit anymore items in your box')
		})

		it('should check for overall box limit - increase no. of existing product', () => {
			let state = {
				products: Immutable.Map({}),
				categories: Immutable.Map({}),
				userChoices: Immutable.Map({
					'prod-2': Immutable.Map({1: Immutable.Map({qty: 5})}),
					'prod-1': Immutable.Map({1: Immutable.Map({qty: 5})})
				}),
				userGifts: Immutable.Map({}),
				stock: Immutable.Map({
					'prod-1': 15
				})
			}

			expect(actionUtils.checkLimitReached(1, 'prod-1', state)).toEqual('Sorry, we can\'t fit anymore items in your box')
		})

		it('should check for overall box limit including gifts - increase no. of existing product', () => {
			let state = {
				products: Immutable.Map({}),
				categories: Immutable.Map({}),
				userChoices: Immutable.Map({
					'prod-2': Immutable.Map({1: Immutable.Map({qty: 5})})
				}),
				userGifts: Immutable.Map({
					'prod-1': Immutable.Map({qty: 5})
				}),
				stock: Immutable.Map({
					'prod-1': 15
				})
			}

			expect(actionUtils.checkLimitReached(1, 'prod-1', state)).toEqual('Sorry, we can\'t fit anymore items in your box')
		})

		it('should check for category limits', () => {
			let state = {
				products: Immutable.Map({
					prod1: Immutable.Map({categories: [{id: 'cat1'}]}),
					prod2: Immutable.Map({categories: [{id: 'cat1'}, {id: 'cat2'}]})
				}),
				categories: Immutable.Map({
					cat1: Immutable.Map({id: 'cat1', box_limit: 5, 'title': 'category 1'}),
					cat2: Immutable.Map({id: 'cat2', box_limit: 3, 'title': 'category 2'})
				}),
				userChoices: Immutable.Map({
					prod1: Immutable.Map({1: Immutable.Map({qty: 2})}),
					prod2: Immutable.Map({1: Immutable.Map({qty: 3})})
				}),
				userGifts: Immutable.Map({}),
				stock: Immutable.Map({
					prod1: 10
				})
			}

			expect(actionUtils.checkLimitReached(1, 'prod1', state)).toEqual('Sorry, we can\'t fit anymore "category 1" items in your box')
		})

		it('should check for category limits including gifts', () => {
			let state = {
				products: Immutable.Map({
					prod1: Immutable.Map({categories: [{id: 'cat1'}]}),
					prod2: Immutable.Map({categories: [{id: 'cat1'}, {id: 'cat2'}]})
				}),
				categories: Immutable.Map({
					cat1: Immutable.Map({id: 'cat1', box_limit: 5, 'title': 'category 1'}),
					cat2: Immutable.Map({id: 'cat2', box_limit: 3, 'title': 'category 2'})
				}),
				userChoices: Immutable.Map({
					prod2: Immutable.Map({1: Immutable.Map({qty: 3})})
				}),
				userGifts: Immutable.Map({
					prod1: Immutable.Map({qty: 2}),
				}),
				stock: Immutable.Map({
					prod1: 10
				})
			}

			expect(actionUtils.checkLimitReached(1, 'prod1', state)).toEqual('Sorry, we can\'t fit anymore "category 1" items in your box')
		})

		it('should check for all individual product box limit', () => {
			let state = {
				products: Immutable.Map({
					prod1: Immutable.Map({box_limit: 3, categories: [{id: 'cat1'}]}),
				}),
				categories: Immutable.Map({
					cat1: Immutable.Map({id: 'cat1', box_limit: 10, 'title': 'category 1'})
				}),
				userChoices: Immutable.Map({
					prod1: Immutable.Map({1: Immutable.Map({qty: 3})})
				}),
				userGifts: Immutable.Map({}),
				stock: Immutable.Map({
					prod1: 10
				})
			}

			expect(actionUtils.checkLimitReached(1, 'prod1', state)).toEqual('Sorry, we can\'t fit anymore of this item in your box')
		})

		it('should check for all individual product box limit including gifts', () => {
			let state = {
				products: Immutable.Map({
					prod1: Immutable.Map({box_limit: 3, categories: [{id: 'cat1'}]}),
				}),
				categories: Immutable.Map({
					cat1: Immutable.Map({id: 'cat1', box_limit: 10, 'title': 'category 1'})
				}),
				userChoices: Immutable.Map({}),
				userGifts: Immutable.Map({
					prod1: Immutable.Map({qty: 3})
				}),
				stock: Immutable.Map({
					prod1: 10
				})
			}

			expect(actionUtils.checkLimitReached(1, 'prod1', state)).toEqual('Sorry, we can\'t fit anymore of this item in your box')
		})

		it('should NOT check for all individual product box limit, if it is null', () => {
			let state = {
				products: Immutable.Map({
					prod1: Immutable.Map({box_limit: null, categories: [{id: 'cat1'}]}),
				}),
				categories: Immutable.Map({
					cat1: Immutable.Map({id: 'cat1', box_limit: 10, 'title': 'category 1'})
				}),
				userChoices: Immutable.Map({
					prod1: Immutable.Map({1: Immutable.Map({qty: 9})})
				}),
				userGifts: Immutable.Map({}),
				stock: Immutable.Map({
					prod1: 10
				})
			}

			expect(actionUtils.checkLimitReached(1, 'prod1', state)).toBe(false)
		})

		it('should check for all limits and return no errors if user is within all limits', () => {
			let state = {
				products: Immutable.Map({
					prod1: Immutable.Map({categories: [{id: 'cat1'}]}),
					prod2: Immutable.Map({categories: [{id: 'cat1'}, {id: 'cat2'}]})
				}),
				categories: Immutable.Map({
					cat1: Immutable.Map({id: 'cat1', box_limit: 10, 'title': 'category 1'}),
					cat2: Immutable.Map({id: 'cat2', box_limit: 3, 'title': 'category 2'})
				}),
				userChoices: Immutable.Map({
					prod1: Immutable.Map({1: Immutable.Map({qty: 2})}),
					prod2: Immutable.Map({1: Immutable.Map({qty: 2})})
				}),
				userGifts: Immutable.Map({
					prod1: Immutable.Map({qty: 1})
				}),
				stock: Immutable.Map({
					prod1: 10
				})
			}

			expect(actionUtils.checkLimitReached(1, 'prod1', state)).toBe(false)
		})

	})
})
