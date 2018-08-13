import Immutable from 'immutable' /* eslint-disable new-cap */

export function getItemIds(itemSets, { endSet, startSet } = {}) {
	const startKey = startSet || 1
	const endKey = endSet || itemSets.size

	return itemSets.filter((collectionSet, key) => (key >= startKey && key <= endKey))
		.sortBy((value, key) => key)
		.reduce((setsAccumulator, collectionSet) => (
			setsAccumulator.concat(collectionSet.reduce((idAccumulator, collectionId) => (
				idAccumulator.concat(collectionId)
			), Immutable.List([])))
		), Immutable.List([]))
}
