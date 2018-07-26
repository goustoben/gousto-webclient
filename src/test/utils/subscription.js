import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Immutable from 'immutable' /* eslint-disable new-cap */
import * as subUtils from 'utils/subscription'
import GoustoException from 'utils/GoustoException'

describe('pauseReasonsAreCategories', function() {
	it('should return false by default', function() {
		expect(subUtils.pauseReasonsAreCategories()).to.equal(false)
	})

	it('should return false if Immutable list passed in does not have children containing at least 1 item', function() {
		const input = Immutable.fromJS([
			{ id: 1 },
			{ id: 2, children: [] },
			{ id: 3 },
		])

		expect(subUtils.pauseReasonsAreCategories(input)).to.equal(false)
	})

	it('should return GoustoException if Immutable list passed in has at least 1 item containing children', function() {
		const input = Immutable.fromJS([
			{ id: 1 },
			{
				id: 2,
				children: [
					{ id: 3 },
				],
			},
			{ id: 4 },
		])

		expect(subUtils.pauseReasonsAreCategories(input)).to.equal(true)
	})

	it('should throw error if pauseReasons are passed in but are not an Immutable List', function() {
		expect(() => subUtils.pauseReasonsAreCategories('string')).to.throw(GoustoException, 'Cannot determine if pause reasons are categories: pause reasons must be Immutable List')
	})
})

describe('getActivePauseStep', function() {
	it('should throw GoustoException if activeSteps are not provided', function() {
		expect(() => subUtils.getActivePauseStep()).to.throw(GoustoException, 'Cannot find active step: activeSteps is not provided')
	})

	it('should throw GoustoException if activeSteps are provided but activeStepId is not provided', function() {
		expect(() => subUtils.getActivePauseStep(Immutable.Map({}))).to.throw(GoustoException, 'Cannot find active step: activeStepId is not provided')
	})

	it('should throw GoustoException if activeSteps are not iterable', function() {
		expect(() => subUtils.getActivePauseStep({ s1: { id: 's1' } }, 'anything')).to.throw(GoustoException, 'Cannot find active step: activeSteps must be iterable')
	})

	it('should return undefined if activeStepId is not found in activeSteps', function() {
		const activeSteps = Immutable.Map({
			s1: { id: 's1' },
			s2: { id: 's2' },
			s3: { id: 's3' },
		})

		expect(subUtils.getActivePauseStep(activeSteps, 's4')).to.equal(undefined)
	})

	it('should return found step if activeStepId is found in activeSteps', function() {
		const activeSteps = Immutable.Map({
			s1: { id: 's1' },
			s2: { id: 's2' },
			s3: { id: 's3' },
		})

		expect(Immutable.is(subUtils.getActivePauseStep(activeSteps, 's2'), activeSteps.get('s2'))).to.equal(true)
	})
})

describe('getReasonsFromStore', function() {
	it('should throw GoustoException if reasonsStore is not provided', function() {
		expect(() => subUtils.getReasonsFromStore()).to.throw(GoustoException, 'Cannot get reasons from store: reasonsStore is not provided')
	})

	it('should throw GoustoException if chosenReasonIds are provided but reasonsStore is not deeply Immutable', function() {
		expect(() => subUtils.getReasonsFromStore(Immutable.List([{ id: 1 }]), [1])).to.throw(GoustoException, 'Cannot get reasons from store: reasonsStore must be deeply Immutable')
	})

	it('should return all reasons from reasonsStore if no chosenReasonIds are provided', function() {
		const reasonsStore = Immutable.fromJS([
			{ id: 's1' },
			{ id: 's2' },
			{ id: 's3' },
		])

		const result = subUtils.getReasonsFromStore(reasonsStore)

		expect(Immutable.is(result, reasonsStore)).to.equal(true)
	})

	it('should return an empty Immutable List given chosenReasonIds if deep match IS NOT found at every nested level', function() {
		const reasonsStore = Immutable.fromJS([
			{ id: 's1' },
			{ id: 's2' },
			{ id: 's3' },
		])

		const result = subUtils.getReasonsFromStore(reasonsStore, ['s2', 's3'])

		expect(Immutable.is(result, Immutable.List([]))).to.equal(true)
	})

	it('should return final matching reasons given chosenReasonIds if deep match IS found at every nested level', function() {
		const reasonsStore = Immutable.fromJS([
			{ id: 's1' },
			{ id: 's2' },
			{
				id: 's3',
				children: [
					{
						id: 's4',
						children: [
							{ id: 's6' },
							{ id: 's7' },
						],
					},
					{ id: 's5' },
				],
			},
		])

		const result = subUtils.getReasonsFromStore(reasonsStore, ['s3', 's4'])

		expect(Immutable.is(result, Immutable.fromJS([
			{ id: 's6' },
			{ id: 's7' },
		]))).to.equal(true)
	})
})
