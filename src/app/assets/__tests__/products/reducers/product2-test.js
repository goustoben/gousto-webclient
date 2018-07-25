import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import Immutable from 'immutable' /* eslint-disable new-cap */
const productReducer = require('products/reducers/product')
const CONFIG = require('@fe/gousto-config')
const CONSTANTS = CONFIG.PRODUCTS

describe('products/reducers/product', () => {
	describe('initialUserChoices', () => {
		it('should handle initial state', () => {
			expect(productReducer.initialUserChoices(undefined, {})).to.deep.equal(Immutable.Map({}))
		})
		it('should handle unknown actions', () => {
			expect(productReducer.initialUserChoices({'prod-1': {qty: 1}}, { type: 'unknown' })).to.deep.equal({'prod-1': {qty: 1}})
		})
		it('should receive initial user choices', () => {
			let action = {
				type: CONSTANTS.LOAD_INITIAL_CHOICES,
				choices: [
					{id: 'prod-1'},
					{id: 'prod-2'},
				]
			}

			let startState = Immutable.OrderedMap({
				'prod-1': Immutable.Map({id: 'prod-1', price: '1.12', qty: 1, title: 'Gift A'}),
				'prod-2': Immutable.Map({id: 'prod-2', price: '2.12', qty: 2, title: 'Gift B'})
			})

			let expectedState = Immutable.OrderedMap({
				'prod-1': Immutable.Map({id: 'prod-1', price: '1.12', qty: 1, title: 'Gift A',
				}),
				'prod-2': Immutable.Map({id: 'prod-2', price: '2.12', qty: 2, title: 'Gift B',
				}),
			})
			const result = productReducer.userChoices(startState, action)
			expect(result.toJSON()).to.deep.equal(expectedState.toJSON())
		})
	})
})


