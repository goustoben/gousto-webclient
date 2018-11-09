import Immutable from 'immutable'

import {
	isCollectionsFeatureEnabled,
	isJustForYouFeatureEnabled,
	getCollectionFreezeValue
} from 'selectors/features'


describe('when features are undefined', () => {
	const state = {}

	it('isCollectionsFeatureEnabled should return false', () => {
		expect(isCollectionsFeatureEnabled(state)).toBe(false)
	})

	it('isJustForYouFeatureEnabled should return false', () => {
		expect(isJustForYouFeatureEnabled(state)).toBe(false)
	})

	it('getCollectionFreezeValue should return empty string', () => {
		expect(getCollectionFreezeValue(state)).toBe('')
	})
})

describe('when features are defined', () => {
	let state = {}

	beforeEach(() => {
		state = {
			features: Immutable.Map({})
		}
	})

	describe('isCollectionsFeatureEnabled', () => {
		describe('when collections feature is set to true', () => {
			beforeEach(() => {
				state.features = Immutable.fromJS({
					collections: {
						value: true
					}
				})
			})

			it('should return true', () => {
				expect(isCollectionsFeatureEnabled(state)).toBe(true)
			})
		})

		describe('when forceCollections feature is set to true', () => {
			beforeEach(() => {
				state.features = Immutable.fromJS({
					forceCollections: {
						value: true
					}
				})
			})

			it('should return true', () => {
				expect(isCollectionsFeatureEnabled(state)).toBe(true)
			})
		})

		describe('when both collections and forceCollections are false', () => {
			beforeEach(() => {
				state.features = Immutable.fromJS({
					collections: {
						value: false
					},
					forceCollections: {
						value: false
					}
				})
			})

			it('should return false', () => {
				expect(isCollectionsFeatureEnabled(state)).toBe(false)
			})
		})
	})

	describe('isJustForYouFeatureEnabled', () => {
		describe('when justforyou feature is enabled', () => {
			beforeEach(() => {
				state.features = Immutable.fromJS({
					justforyou: {
						value: true
					}
				})
			})

			it('should return true', () => {
				expect(isJustForYouFeatureEnabled(state)).toBe(true)
			})
		})

		describe('when justforyou feature is disabled', () => {
			beforeEach(() => {
				state.features = Immutable.fromJS({
					justforyou: {
						value: false
					}
				})
			})

			it('should return false', () => {
				expect(isJustForYouFeatureEnabled(state)).toBe(false)
			})
		})
	})

	describe('getCollectionFreezeValue', () => {
		it('should return value of collection freeze', () => {
			state.features = Immutable.fromJS({
				collectionFreeze: {
					value: 'test-value'
				}
			})

			expect(getCollectionFreezeValue(state)).toEqual('test-value')
		})
	})
})
