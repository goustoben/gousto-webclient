

const React = require('react')
const Enzyme = require('enzyme')
const CONFIG = require('@fe/gousto-config')
const WIDGET_CONFIG = CONFIG.MY_GOUSTO.WIDGETS.FEATURED_RECIPES

const FeaturedRecipes = require('../../../../js/my-gousto/components/featured-recipes')
const $ = require('jquery')

let featuredRecipes
let userOrders
let thisPeriodID
let nextPeriodID
let periodIds

window.$ = $

describe('FeaturedRecipes', function() {

	describe('sortUserOrders - for this week only', function() {
		beforeEach(function() {
			featuredRecipes = Enzyme.shallow(<FeaturedRecipes />).instance()
			thisPeriodID = '1'
			nextPeriodID = '2'
			periodIds = {twr:thisPeriodID, nwr:nextPeriodID}
		})

		it('should period="next" when order2:{state:"committed", default:"1"}, order3:{state:"committed", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '1',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
		it('should period="next" when order2:{state:"committed", default:"0"}, order3:{state:"committed", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '1',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
		it('should period="next" when order2:{state:"committed", default:"1"}, order3:{state:"committed", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '0',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
		it('should period="next" when order2:{state:"committed", default:"0"}, order3:{state:"committed", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '0',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})

		it('should period="this" when order2:{state:"committed", default:"1"}, order3:{state:"pending", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '1',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(3)
		})
		it('should period="this" when order2:{state:"committed", default:"0"}, order3:{state:"pending", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '1',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(3)
		})
		it('should period="next" when order2:{state:"committed", default:"1"}, order3:{state:"pending", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '0',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
		it('should period="next" when order2:{state:"committed", default:"0"}, order3:{state:"pending", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '0',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})

		it('should period="this" when order2:{state:"pending", default:"1"}, order3:{state:"pending", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '1',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(2)
		})
		it('should period="this" when order2:{state:"pending", default:"0"}, order3:{state:"pending", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '1',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(3)
		})
		it('should period="this" when order2:{state:"pending", default:"1"}, order3:{state:"pending", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '0',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(2)
		})
		it('should period="next" when order2:{state:"pending", default:"0"}, order3:{state:"pending", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '0',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})

		it('should period="this" when order2:{state:"pending", default:"1"}, order3:{state:"committed", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '1',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(2)
		})
		it('should period="this" when order2:{state:"pending", default:"1"}, order3:{state:"committed", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '0',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(2)
		})
		it('should period="next" when order2:{state:"pending", default:"0"}, order3:{state:"committed", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '1',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
		it('should period="next" when order2:{state:"pending", default:"0"}, order3:{state:"committed", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '0',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
	})

	describe('sortUserOrders - for next week only', function() {
		beforeEach(function() {
			featuredRecipes = Enzyme.shallow(<FeaturedRecipes />).instance()
			thisPeriodID = '1'
			nextPeriodID = '2'
			periodIds = {twr:thisPeriodID, nwr:nextPeriodID}
		})

		it('should period="this" when order2:{state:"committed", default:"1"}, order3:{state:"committed", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '1',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
		it('should period="this" when order2:{state:"committed", default:"0"}, order3:{state:"committed", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '0',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
		it('should period="this" when order2:{state:"committed", default:"1"}, order3:{state:"committed", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '1',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
		it('should period="this" when order2:{state:"committed", default:"0"}, order3:{state:"committed", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '0',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})

		it('should period="next" when order2:{state:"committed", default:"1"}, order3:{state:"pending", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '1',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(3)
		})
		it('should period="next" when order2:{state:"committed", default:"0"}, order3:{state:"pending", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '0',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(3)
		})
		it('should period="this" when order2:{state:"committed", default:"1"}, order3:{state:"pending", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '1',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
		it('should period="this" when order2:{state:"committed", default:"0"}, order3:{state:"pending", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '0',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})

		it('should period="next" when order2:{state:"pending", default:"1"}, order3:{state:"pending", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '1',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(2)
		})
		it('should period="next" when order2:{state:"pending", default:"0"}, order3:{state:"pending", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '0',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(3)
		})
		it('should period="next" when order2:{state:"pending", default:"1"}, order3:{state:"pending", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '1',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(2)
		})
		it('should period="this" when order2:{state:"pending", default:"0"}, order3:{state:"pending", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '0',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})

		it('should period="next" when order2:{state:"pending", default:"1"}, order3:{state:"committed", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '1',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(2)
		})
		it('should period="next" when order2:{state:"pending", default:"1"}, order3:{state:"committed", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '1',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(2)
		})
		it('should period="this" when order2:{state:"pending", default:"0"}, order3:{state:"committed", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '0',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
		it('should period="this" when order2:{state:"pending", default:"0"}, order3:{state:"committed", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '0',
					period_id: nextPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
	})

	describe('sortUserOrders - for this and next week only', function() {
		beforeEach(function() {
			featuredRecipes = Enzyme.shallow(<FeaturedRecipes />).instance()
			thisPeriodID = '1'
			nextPeriodID = '2'
			periodIds = {twr:thisPeriodID, nwr:nextPeriodID}
		})

		it('should period="next" when twr_order:{state:"committed", default:"1"}, nwr_order:{state:"committed", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(true)
			expect(orderId).not.toBeDefined
		})
		it('should period="next" when twr_order:{state:"committed", default:"0"}, nwr_order:{state:"committed", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(true)
			expect(orderId).not.toBeDefined
		})
		it('should period="next" when twr_order:{state:"committed", default:"1"}, nwr_order:{state:"committed", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(true)
			expect(orderId).not.toBeDefined
		})
		it('should period="next" when twr_order:{state:"committed", default:"0"}, nwr_order:{state:"committed", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(true)
			expect(orderId).not.toBeDefined
		})

		it('should period="next" when twr_order:{state:"committed", default:"1"}, nwr_order:{state:"pending", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(3)
		})
		it('should period="next" when twr_order:{state:"committed", default:"0"}, nwr_order:{state:"pending", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(3)
		})
		it('should period="next" when twr_order:{state:"committed", default:"1"}, nwr_order:{state:"pending", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(true)
			expect(orderId).not.toBeDefined
		})
		it('should period="next" when twr_order:{state:"committed", default:"0"}, nwr_order:{state:"pending", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'committed',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(true)
			expect(orderId).not.toBeDefined
		})

		it('should period="this" when twr_order:{state:"pending", default:"1"}, nwr_order:{state:"pending", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(2)
		})
		it('should period="next" when twr_order:{state:"pending", default:"0"}, nwr_order:{state:"pending", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(3)
		})
		it('should period="this" when twr_order:{state:"pending", default:"1"}, nwr_order:{state:"pending", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(2)
		})
		it('should period="next" when twr_order:{state:"pending", default:"0"}, nwr_order:{state:"pending", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'pending',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(true)
			expect(orderId).not.toBeDefined
		})

		it('should period="this" when twr_order:{state:"pending", default:"1"}, nwr_order:{state:"committed", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(2)
		})
		it('should period="this" when twr_order:{state:"pending", default:"1"}, nwr_order:{state:"committed", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '1',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).toEqual(2)
		})
		it('should period="next" when twr_order:{state:"pending", default:"0"}, nwr_order:{state:"committed", default:"1"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '1',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(true)
			expect(orderId).not.toBeDefined
		})
		it('should period="next" when twr_order:{state:"pending", default:"0"}, nwr_order:{state:"committed", default:"0"}', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '0',
					period_id: thisPeriodID
				},
				{
					id: 3,
					state: 'committed',
					default: '0',
					period_id: nextPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('next')
			expect(chosenBoth).toBe(true)
			expect(orderId).not.toBeDefined
		})
	})

	describe('sortUserOrders - edge cases', function() {
		beforeEach(function() {
			featuredRecipes = Enzyme.shallow(<FeaturedRecipes />).instance()
			thisPeriodID = '1'
			nextPeriodID = '2'
			periodIds = {twr:thisPeriodID, nwr:nextPeriodID}
		})

		it('should set period to "this" when there is a pending order which is not for either TWR or NWR', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending',
					default: '1',
					period_id: '3'
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
		it('should set period to "this" when there is a cancelled order from TWR', function() {
			userOrders = [
				{
					id: 2,
					state: 'cancelled',
					default: '1',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
		it('should set period to "this" when there is a cancelled order from TWR', function() {
			userOrders = [
				{
					id: 2,
					state: 'pending-cancellation',
					default: '1',
					period_id: thisPeriodID
				}
			]
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
		it('should set period to "this" when there are no type of orders for neither TWR or NWR', function() {
			userOrders = []
			let {period, chosenBoth, orderId} = featuredRecipes.sortUserOrders(userOrders, periodIds)
			expect(period).toEqual('this')
			expect(chosenBoth).toBe(false)
			expect(orderId).not.toBeDefined
		})
	})

	describe('sortMenuRecipes', function() {
		beforeEach(function() {
			featuredRecipes = Enzyme.shallow(<FeaturedRecipes />).instance()
		})
		it('should show featured recipes in correct sorted order', function() {
			let menu = {'recipes': {
				'1': {
					'id': '1',
					'preparation_time_minutes': '50',
					'type': 'gourmet',
					'nutritional_info': {
						'calories_kcal': '123'
					},
					'ratings': {
						'average': '2'
					}
				},
				'2': {
					'id': '2',
					'preparation_time_minutes': '30',
					'type': 'gourmet',
					'nutritional_info': {
						'calories_kcal': '321'
					},
					'ratings': {
						'average': '5'
					}
				},
				'3': {
					'id': '3',
					'preparation_time_minutes': '12',
					'type': 'gourmet',
					'nutritional_info': {
						'calories_kcal': '234'
					},
					'ratings': {
						'average': '3'
					}
				}
			}}
			const result = featuredRecipes.sortMenuRecipes(menu, false)
			expect(result.healthy.id).toEqual('1')
			expect(result.quick.id).toEqual('3')
			expect(result.popular.id).toEqual('2')
		})
		it('should show featured recipes even with same ratings and calories value', function() {
			let menu = {'recipes': {
				'1': {
					'id': '1',
					'preparation_time_minutes': '50',
					'type': 'gourmet',
					'nutritional_info': {
						'calories_kcal': '123'
					},
					'ratings': {
						'average': '5'
					}
				},
				'2': {
					'id': '2',
					'preparation_time_minutes': '30',
					'type': 'gourmet',
					'nutritional_info': {
						'calories_kcal': '123'
					},
					'ratings': {
						'average': '5'
					}
				},
				'3': {
					'id': '3',
					'preparation_time_minutes': '12',
					'type': 'gourmet',
					'nutritional_info': {
						'calories_kcal': '234'
					},
					'ratings': {
						'average': '3'
					}
				}
			}}
			const result = featuredRecipes.sortMenuRecipes(menu, false)
			expect(result.healthy.id).toEqual('1')
			expect(result.quick.id).toEqual('3')
			expect(result.popular.id).toEqual('2')
		})
		it('should show only vegetarian recipes if user is vegetarian', function() {
			let menu = {'recipes': {
				'1': {
					'id': '1',
					'preparation_time_minutes': '50',
					'type': 'gourmet',
					'nutritional_info': {
						'calories_kcal': '123'
					},
					'ratings': {
						'average': '5'
					}
				},
				'2': {
					'id': '2',
					'preparation_time_minutes': '30',
					'type': 'gourmet',
					'nutritional_info': {
						'calories_kcal': '123'
					},
					'ratings': {
						'average': '5'
					}
				},
				'3': {
					'id': '3',
					'preparation_time_minutes': '12',
					'type': 'gourmet',
					'nutritional_info': {
						'calories_kcal': '234'
					},
					'ratings': {
						'average': '3'
					}
				},
				'4': {
					'id': '4',
					'preparation_time_minutes': '50',
					'type': 'vegetarian',
					'nutritional_info': {
						'calories_kcal': '123'
					},
					fish: '0',
					'ratings': {
						'average': '5'
					}
				},
				'5': {
					'id': '5',
					'preparation_time_minutes': '30',
					'type': 'vegetarian',
					'nutritional_info': {
						'calories_kcal': '123'
					},
					fish: '0',
					'ratings': {
						'average': '5'
					}
				},
				'6': {
					'id': '6',
					'preparation_time_minutes': '12',
					'type': 'vegetarian',
					'nutritional_info': {
						'calories_kcal': '234'
					},
					fish: '0',
					'ratings': {
						'average': '3'
					}
				}
			}}
			const result = featuredRecipes.sortMenuRecipes(menu, true)
			expect(result.healthy.id).toEqual('4')
			expect(result.quick.id).toEqual('6')
			expect(result.popular.id).toEqual('5')
		})
		it('should show only vegetarian recipes if user is vegetarian', function() {
			let menu = {'recipes': {
				'1': {
					'id': '1',
					'preparation_time_minutes': '50',
					'type': 'gourmet',
					'nutritional_info': {
						'calories_kcal': '123'
					},
					'ratings': {
						'average': '5'
					}
				},
				'2': {
					'id': '2',
					'preparation_time_minutes': '30',
					'type': 'gourmet',
					'nutritional_info': {
						'calories_kcal': '123'
					},
					'ratings': {
						'average': '5'
					}
				},
				'3': {
					'id': '3',
					'preparation_time_minutes': '12',
					'type': 'gourmet',
					'nutritional_info': {
						'calories_kcal': '234'
					},
					'ratings': {
						'average': '3'
					}
				},
				'4': {
					'id': '4',
					'preparation_time_minutes': '50',
					'type': 'vegetarian',
					'nutritional_info': {
						'calories_kcal': '123'
					},
					fish: '0',
					'ratings': {
						'average': '5'
					}
				},
				'5': {
					'id': '5',
					'preparation_time_minutes': '30',
					'type': 'vegetarian',
					'nutritional_info': {
						'calories_kcal': '123'
					},
					fish: '0',
					'ratings': {
						'average': '5'
					}
				},
				'6': {
					'id': '6',
					'preparation_time_minutes': '12',
					'type': 'vegetarian',
					'nutritional_info': {
						'calories_kcal': '234'
					},
					fish: '1',
					'ratings': {
						'average': '3'
					}
				},
				'7': {
					'id': '7',
					'preparation_time_minutes': '12',
					'type': 'vegetarian',
					'nutritional_info': {
						'calories_kcal': '234'
					},
					fish: '0',
					'ratings': {
						'average': '3'
					}
				}
			}}
			const result = featuredRecipes.sortMenuRecipes(menu, true)
			expect(result.healthy.id).toEqual('4')
			expect(result.quick.id).toEqual('7')
			expect(result.popular.id).toEqual('5')
		})
	})

	describe('getLinkTitle', function() {
		beforeEach(function() {
			featuredRecipes = Enzyme.shallow(<FeaturedRecipes />).instance()
		})
		it('should show "Choose my recipes" link title if order id is set', function() {
			let period = 'this'
			let orderId = 1
			const result = featuredRecipes.getLinkTitle(period, orderId)
			expect(result).toEqual('Choose my recipes')
		})
		it('should show "See all recipes" link title if orderId is not set but period is set to "next"', function() {
			let period = 'next'
			let orderId
			const result = featuredRecipes.getLinkTitle(period, orderId)
			expect(result).toEqual('See all recipes')
		})
		it('should show "Add another box" link title if orderId is not set but period is set to "next" when both menu orders are chosen', function() {
			let period = 'next'
			let orderId
			const result = featuredRecipes.getLinkTitle(period, orderId, true)
			expect(result).toEqual('Add another box')
		})
		it('should show "See all recipes" link title if order id is not set', function() {
			let period = 'this'
			let orderId
			const result = featuredRecipes.getLinkTitle(period, orderId)
			expect(result).toEqual('See all recipes')
		})
	})

})
