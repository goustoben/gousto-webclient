/* eslint-disable no-unused-vars */
import { OrderedMap as ImmutableOrderedMap } from 'immutable'
import { MenuCollection, MenuCollectionIMap } from './menuCollection'

export type MenuCollections = MenuCollection[]

export type MenuCollectionsIOrderedMap = ImmutableOrderedMap<string, MenuCollectionIMap>
