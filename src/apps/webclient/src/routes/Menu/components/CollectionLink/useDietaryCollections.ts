import { useMemo } from 'react'
import Immutable from 'immutable'
import { MenuCollection } from 'routes/Menu/types'
import { useDisplayedCollections } from '../../domains/collections'

export const useDietaryCollections = () => {
  const collections = useDisplayedCollections()

  return useMemo(() => {
    const dietaryCollectionIds = [
      '5c117c20-8b05-11e6-8538-065f01f5b2df',
      '77d1eb54-e3e5-11e7-bf51-06543e25a81c',
      'de3fa51c-87dc-11e7-94ba-0697786b4070',
      'cfb814b4-9c79-11e7-9975-06bf888d1530',
    ]

    if (!collections) {
      return Immutable.OrderedMap<string, MenuCollection>({})
    }

    return collections.filter((collection) => {
      const id = collection?.get('id')

      return id ? dietaryCollectionIds.includes(id) : false
    })
  }, [collections])
}
