import { fromJS } from 'immutable'

import { getCollectionName } from '../utils'
import { recommendationsShortTitle } from 'config/collections'

describe('getCollection', () => {
	let state = {
		features: {}
	}

	describe('when collectionFreeze feature is set to non-empty string value', () => {
		beforeEach(() => {
			state.features = fromJS({
				collectionFreeze: {
					value: 'non-empty string'
				}
			})
		})

		it('should return value of collectionFreeze', () => {
			expect(getCollectionName(state)).toEqual('non-empty string')
		})
	})

	describe('when collectionFreeze feature is empty value', () => {
		beforeEach(() => {
			state.features = fromJS({
				collectionFreeze: {
					value: ''
				}
			})
		})

		describe('and just for you feature is enabled', () => {
			beforeEach(() => {
				state.features = fromJS({
					...state.features.toJS(),
					justforyou: {
						value: true
					}
				})
			})

			it('should return recommendations collection short title', () => {
				expect(getCollectionName(state)).toEqual(recommendationsShortTitle)
			})
		})

		describe('and just for you feature is disabled', () => {
			beforeEach(() => {
				state.features = fromJS({
					...state.features.toJS(),
					justforyou: {
						value: false
					}
				})
			})

			it('should return default collection name', () => {
				expect(getCollectionName(state, 'default-collection-name')).toEqual('default-collection-name')
			})
		})
	})
})
