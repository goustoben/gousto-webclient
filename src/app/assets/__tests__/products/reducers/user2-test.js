import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import Immutable from 'immutable' /* eslint-disable new-cap */
const userReducer = require('products/reducers/user')
const CONFIG = require('@fe/gousto-config')
const CONSTANTS = CONFIG.PRODUCTS

describe('products/reducers/user', () => {
	let state
	describe('saveStatus', () => {
		beforeEach(() => {
			state = Immutable.Map({})
		})

		it('should handle initial state', () => {
			expect(userReducer.saveStatus(undefined, {})).to.deep.equal(Immutable.Map({}))
		})
		it('should handle unknown actions', () => {
			expect(userReducer.saveStatus(state, { type: 'unknown' }).toJSON()).to.deep.equal({})
		})
		it('should handle INCREMENT_PRODUCT', () => {
			expect(userReducer.saveStatus(state, { type: 'INCREMENT_PRODUCT' }).toJSON()).to.deep.equal({
				requiresSave: true,
				statusText: 'Update My Order',
			})
		})
		it('should handle DECREMENT_PRODUCT', () => {
			expect(userReducer.saveStatus(state, { type: 'DECREMENT_PRODUCT' }).toJSON()).to.deep.equal({
				requiresSave: true,
				statusText: 'Update My Order',
			})

		})
		it('should handle SAVE_IN_PROGRESS', () => {
			expect(userReducer.saveStatus(state, { type: 'SAVE_IN_PROGRESS' }).toJSON()).to.deep.equal({
				requiresSave: true,
				statusText: 'Saving Order...',
			})

		})
		it('should handle SAVE_FINISHED', () => {
			expect(userReducer.saveStatus(state, { type: 'SAVE_FINISHED' }).toJSON()).to.deep.equal({
				requiresSave: false,
				statusText: 'Order Saved!',
			})

		})
	})
})


