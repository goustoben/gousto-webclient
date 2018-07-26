import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import Immutable from 'immutable' /* eslint-disable new-cap */

describe('getPauseScreenFromConfig', function() {
	let getPauseScreenFromConfig

	beforeEach(function() {
		getPauseScreenFromConfig = require('inject-loader?config/subscription!utils/getPauseScreenFromConfig')({
			'config/subscription': {
				screens: {
					abc: {
						title: 'ABC Title',
						actions: [],
					},
					changedMind: {
						title: 'Great!',
						actions: [
							{
								type: 'GoToMenu',
							},
						],
					},
				},
			},
		}).default
	})

	it('should return Immutable Map with type if no arguments passed in', function() {
		expect(Immutable.is(getPauseScreenFromConfig(), Immutable.fromJS({ type: undefined }))).to.equal(true)
	})

	it('should return Immutable Map with type set to key if no matches found', function() {
		expect(Immutable.is(getPauseScreenFromConfig('123'), Immutable.fromJS({ type: '123' }))).to.equal(true)
	})

	it('should return matching screen if found in config and set type to key', function() {
		expect(getPauseScreenFromConfig('abc').toJS()).to.deep.equal({
			actions: [],
			title: 'ABC Title',
			type: 'abc',
		})
	})
})
