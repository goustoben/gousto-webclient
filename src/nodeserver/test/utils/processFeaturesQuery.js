import Immutable from 'immutable' /* eslint-disable new-cap */
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import processFeaturesQuery from 'utils/processFeaturesQuery'
import actions from 'actions'

describe('processFeaturesQuery', function() {
	let sandbox
	let featureSetSpy
	let store
	let dispatchSpy

	beforeEach(function() {
		sandbox = sinon.sandbox.create()
		dispatchSpy = sandbox.spy()
		featureSetSpy = sandbox
			.stub(actions, 'featureSet')
			.returns('return from featureSetSpy')
		store = {
			dispatch: dispatchSpy,
			getState: sinon.stub().returns({
				features: Immutable.fromJS({})
			})
		}
	})

	afterEach(function() {
		sandbox.restore()
	})

	it('should dispatch an featureSet action for each feature in the given query', function() {
		const query = {
			'features[]': ['a', 'b', 'c'],
		}
		processFeaturesQuery(query, store)

		expect(dispatchSpy.callCount).to.be.at.least(6)
		expect(featureSetSpy.callCount).to.be.at.least(6)

		expect(dispatchSpy.getCall(0).args[0]).to.equal('return from featureSetSpy')
		expect(dispatchSpy.getCall(1).args[0]).to.equal('return from featureSetSpy')
		expect(dispatchSpy.getCall(2).args[0]).to.equal('return from featureSetSpy')

		expect(featureSetSpy.getCall(0).args).to.deep.equal(['a', true])
		expect(featureSetSpy.getCall(1).args).to.deep.equal(['b', true])
		expect(featureSetSpy.getCall(2).args).to.deep.equal(['c', true])
	})

	it('should dispatch an featureSet action for each feature in the given query', function() {
		const query = {
			'disabledFeatures[]': ['a', 'b', 'c'],
		}
		processFeaturesQuery(query, store)

		expect(dispatchSpy.callCount).to.be.at.least(6)
		expect(featureSetSpy.callCount).to.be.at.least(6)

		expect(dispatchSpy.getCall(0).args[0]).to.equal('return from featureSetSpy')
		expect(dispatchSpy.getCall(1).args[0]).to.equal('return from featureSetSpy')
		expect(dispatchSpy.getCall(2).args[0]).to.equal('return from featureSetSpy')

		expect(featureSetSpy.getCall(0).args).to.deep.equal(['a', false])
		expect(featureSetSpy.getCall(1).args).to.deep.equal(['b', false])
		expect(featureSetSpy.getCall(2).args).to.deep.equal(['c', false])
	})

	it('should dispatch the disabled after the enabled', function() {
		const query = {
			'features[]': ['a', 'b', 'c'],
			'disabledFeatures[]': ['a', 'b'],
		}
		processFeaturesQuery(query, store)

		expect(featureSetSpy.getCall(0).args).to.deep.equal(['a', true])
		expect(featureSetSpy.getCall(1).args).to.deep.equal(['b', true])
		expect(featureSetSpy.getCall(2).args).to.deep.equal(['c', true])

		expect(featureSetSpy.getCall(3).args).to.deep.equal(['a', false])
		expect(featureSetSpy.getCall(4).args).to.deep.equal(['b', false])

		expect(dispatchSpy.getCall(0).args[0]).to.equal('return from featureSetSpy')
		expect(dispatchSpy.getCall(1).args[0]).to.equal('return from featureSetSpy')
		expect(dispatchSpy.getCall(2).args[0]).to.equal('return from featureSetSpy')
		expect(dispatchSpy.getCall(3).args[0]).to.equal('return from featureSetSpy')
		expect(dispatchSpy.getCall(4).args[0]).to.equal('return from featureSetSpy')
	})

	it('should dispatch a featureSet action with experiment set to true for each experiment in the given query', function() {
		const query = {
			'experiments[]': ['a', 'b', 'c'],
		}
		processFeaturesQuery(query, store)

		expect(featureSetSpy).to.be.calledWithExactly('a', true, true)
		expect(featureSetSpy).to.be.calledWithExactly('b', true, true)
		expect(featureSetSpy).to.be.calledWithExactly('c', true, true)
	})

	it('should cope with just enable one flag', function() {
		const query = {
			'features[]': 'a',
		}
		processFeaturesQuery(query, store)
		expect(dispatchSpy.callCount).to.be.at.least(4)
		expect(featureSetSpy.callCount).to.be.at.least(4)
		expect(featureSetSpy.getCall(0).args[0]).to.equal('a')
		expect(dispatchSpy.getCall(0).args[0]).to.equal('return from featureSetSpy')
	})

	it('should cope with just one disable flag', function() {
		const query = {
			'disabledFeatures[]': 'a',
		}

		processFeaturesQuery(query, store)
		expect(dispatchSpy.callCount).to.be.at.least(4)
		expect(featureSetSpy.callCount).to.be.at.least(4)
		expect(featureSetSpy.getCall(0).args[0]).to.equal('a')
		expect(dispatchSpy.getCall(0).args[0]).to.equal('return from featureSetSpy')

	})

	it('should cope with an undefined, null, or empty query', function() {
		try {
			processFeaturesQuery(null, store)
		} catch (err) {
			expect(err).to.equal(null)
		}

		try {
			processFeaturesQuery(undefined, store)
		} catch (err) {
			expect(err).to.equal(null)
		}

		try {
			processFeaturesQuery({}, store)
		} catch (err) {
			expect(err).to.equal(null)
		}

		try {
			processFeaturesQuery([], store)
		} catch (err) {
			expect(err).to.equal(null)
		}
	})

	it('should set feature flags with values', function() {
		const query = {
			'features[a]': 'thing1',
			'features[b]': 'thing2',
			'features[c]': 'thing3',
		}
		processFeaturesQuery(query, store)
		expect(dispatchSpy.callCount).to.be.at.least(6)
		expect(featureSetSpy.callCount).to.be.at.least(6)
		expect(featureSetSpy.getCall(0).args).to.deep.equal(['a', 'thing1'])
		expect(featureSetSpy.getCall(1).args).to.deep.equal(['b', 'thing2'])
		expect(featureSetSpy.getCall(2).args).to.deep.equal(['c', 'thing3'])
	})

	it('should set a mix of feature flags with values and booleans', function() {
		const query = {
			'features[a]': 'thing1',
			'features[]': 'b',
			'disabledFeatures[]': 'c',
			'experiments[d]': 'thingd',
			'experiments[]': 'e',
		}
		processFeaturesQuery(query, store)
		expect(featureSetSpy.getCall(0).args).to.deep.equal(['b', true])
		expect(featureSetSpy.getCall(1).args).to.deep.equal(['c', false])
		expect(featureSetSpy.getCall(2).args).to.deep.equal(['a', 'thing1'])

		expect(featureSetSpy).to.be.calledWithExactly('e', true, true)
		expect(featureSetSpy).to.be.calledWithExactly('d', 'thingd', true)

		expect(dispatchSpy.getCall(0).args[0]).to.equal('return from featureSetSpy')
		expect(dispatchSpy.getCall(1).args[0]).to.equal('return from featureSetSpy')
		expect(dispatchSpy.getCall(2).args[0]).to.equal('return from featureSetSpy')
	})

	it('should set default menu experiment if undefined', function() {
		const query = {}
		processFeaturesQuery(query, store)
		expect(featureSetSpy).to.be.calledWithExactly('menu', 'default', true)
		expect(dispatchSpy.getCall(0).args[0]).to.equal('return from featureSetSpy')
	})

	it('should set menu experiment if defined', function() {
		const query = {
			'experiments[menu]': 'my-menu'
		}
		processFeaturesQuery(query, store)
		expect(featureSetSpy).to.be.calledWithExactly('menu', 'my-menu', true)
		expect(dispatchSpy.getCall(0).args[0]).to.equal('return from featureSetSpy')
	})

	it('should force enable collections for all users', function() {
		const query = {}
		processFeaturesQuery(query, store)
		expect(dispatchSpy.callCount).to.be.at.least(3)
		expect(featureSetSpy.callCount).to.be.at.least(3)
		expect(featureSetSpy.getCall(0).args).to.deep.equal(['forceCollections', true])
	})

	it('should force enable landingOrder for all users', function() {
		const query = {}
		processFeaturesQuery(query, store)
		expect(dispatchSpy.callCount).to.be.at.least(3)
		expect(featureSetSpy.callCount).to.be.at.least(3)
		expect(featureSetSpy.getCall(1).args).to.deep.equal(['landingOrder', true])
	})
})
