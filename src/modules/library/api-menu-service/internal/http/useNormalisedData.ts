import { useMemo } from 'react'
import { useMenuSWR, UseMenuSWRArgs } from './useMenuSWR'
import { MenuAPIResponseIncludedItem } from './types'
import {
  MenuAPIResponseIncludedBox,
  MenuAPIResponseIncludedCollection,
  MenuAPIResponseIncludedIngredient,
  MenuAPIResponseIncludedRecipe,
} from './types/entities'

const getIdForRow = (row: MenuAPIResponseIncludedItem) =>
  row.type === 'recipe' ? row.attributes.core_recipe_id && row.attributes.core_recipe_id.toString() : row.id

/**
 * This is used to turn the `included` block into something flat that we can look up based on e.g. recipe id
 *
 * This can possibly be removed in future
 */
export function useNormalisedData(requestArgs: UseMenuSWRArgs) {
  const { response, isPending, error } = useMenuSWR(requestArgs)

  return useMemo(() => {
    if (isPending || error) {
      return null
    }

    if (!response) {
      return null
    }

    const { included = [], data, meta } = response

    const normalised = {
      meta,
      data,
      recipe: {} as Record<string, MenuAPIResponseIncludedRecipe>,
      ingredient: {} as Record<string, MenuAPIResponseIncludedIngredient>,
      box: {} as Record<string, MenuAPIResponseIncludedBox>,
      collection: {} as Record<string, MenuAPIResponseIncludedCollection>,
    }

    included.forEach((row) => {
      if (normalised[row.type] === undefined) {
        normalised[row.type] = {}
      }

      const id = getIdForRow(row)
      normalised[row.type][id] = row
    })

    return normalised
  }, [response, isPending, error])
}
