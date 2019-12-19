import Immutable from 'immutable'

export function getItemsById(itemIds, itemStore) {
  return Immutable.List(itemIds.map(itemId => itemStore.get(itemId)))
    .filterNot(item => item === undefined)
}
