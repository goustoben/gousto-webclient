import Immutable from 'immutable'

import { getCollectionIdByName } from 'selectors/collections'


describe('getCollectionIdByName', () => {
	describe('when collection with short title exists', () => {
		const state = {
			menuCollections: Immutable.fromJS({
				testCollectionId: {
					shortTitle: 'testCollectionName',
					id: 'testCollectionId'
				},
				differentCollectionId: {
					shortTitle: 'differentCollectionName',
					id: 'differentCollectionId'
				}
			})
		}

		it('should return collection id of given collection', () => {
			expect(getCollectionIdByName(state, 'testCollectionName')).toEqual('testCollectionId')
		})
	})

	describe('when collections with short title does not exist', () => {
		const state = {
			menuCollections: Immutable.fromJS({
				differentCollectionId: {
					shortTitle: 'differentCollectionName',
					id: 'differentCollectionId'
				}
			})
		}

		it('should return null', () => {
			expect(getCollectionIdByName(state, 'testCollectionName')).toEqual(null)
		})
	})

	describe('when menu collections are undefined', () => {
		const state = {}

		it('should return null', () => {
			expect(getCollectionIdByName(state, 'testCollectionName')).toEqual(null)
		})
	})

	describe('when collection name is empty value', () => {
		const state = {
			menuCollections: Immutable.fromJS({
				testCollectionId: {
					shortTitle: '',
					id: 'testCollectionId'
				}
			})
		}

		it('should return null', () => {
			expect(getCollectionIdByName(state, '')).toEqual(null)
			expect(getCollectionIdByName(state, null)).toEqual(null)
		})
	})
})
