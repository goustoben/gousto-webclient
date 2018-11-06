import Immutable from 'immutable'

import { isCollectionsFeatureEnabled, isJustForYouFeatureEnabled } from 'selectors/features'

describe('isCollectionsFeatureEnabled', () => {
	describe('when collections feature is set to true', () => {
		const state = {
			features: Immutable.fromJS({
				collections: {
					value: true
				}
			})
		}

		it('should return true', () => {
			expect(isCollectionsFeatureEnabled(state)).toBe(true)
		})
	})

	describe('when forceCollections feature is set to true', () => {
		const state = {
			features: Immutable.fromJS({
				forceCollections: {
					value: true
				}
			})
		}

		it('should return true', () => {
			expect(isCollectionsFeatureEnabled(state)).toBe(true)
		})
	})

	describe('when both collections and forceCollections are false', () => {
		const state = {
			features: Immutable.fromJS({
				collections: {
					value: false
				},
				forceCollections: {
					value: false
				}
			})
		}

		it('should return false', () => {
			expect(isCollectionsFeatureEnabled(state)).toBe(false)
		})
	})
})

describe('isJustForYouFeatureEnabled', () => {
	describe('when justforyou feature is enabled', () => {
		const state = {
			features: Immutable.fromJS({
				justforyou: {
					value: true
				}
			})
		}

		it('should return true', () => {
			expect(isJustForYouFeatureEnabled(state)).toBe(true)
		})
	})

	describe('when justforyou feature is disabled', () => {
		const state = {
			features: Immutable.fromJS({
				justforyou: {
					value: false
				}
			})
		}

		it('should return false', () => {
			expect(isJustForYouFeatureEnabled(state)).toBe(false)
		})
	})
})
