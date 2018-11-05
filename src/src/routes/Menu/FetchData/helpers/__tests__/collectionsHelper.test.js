import Immutable from 'immutable'

import actions from 'actions'

import { preselectCollection } from '../collectionsHelper'

jest.mock('actions')
jest.mock('utils/logger')


jest.mock('actions', () => ({
	filterCollectionChange: jest.fn()
}))

describe('when pre-selecting a collection', () => {
	const getState = jest.fn()
	const dispatch = jest.fn()

	const initalState = {
		features: Immutable.Map({ forceCollections: true })
	}

	afterEach(() => {
		dispatch.mockClear()
		getState.mockClear()
		actions.filterCollectionChange.mockClear()
	})

		describe('when just for you feature is turned on  ', () => {
			initalState.features = [
				...initalState.features,
				{ justforyou: Immutable.Map({ value: true }) }
			]

			test('then just for you collection is pre-selected', () => {
				const collectionId = 'mocked collection id'
				// preselectCollection(initalState, collectionId, dispatch)

				// expect(actions.filterCollectionChange).toHaveBeenCalledWith(collectionId)

				// expect(dispatch).toHaveBeenCalledWith(actions.filterCollectionChange)
			})
		})


})
