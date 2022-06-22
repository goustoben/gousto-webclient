import Immutable from 'immutable'
import { useSelector } from 'react-redux'

const getMenuCollections = (state: any) => state.menuCollections

export function use_legacy_AllCollections(): Immutable.Map<string, any> {
  return useSelector(getMenuCollections)
}
