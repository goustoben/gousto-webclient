import { UseMenuSWRArgs } from './http'
import { UseMenuDependencies } from './types'
import { useGetRecipesForCollectionId } from './useGetRecipesForCollectionId'

export function useMenu(
    requestArgs: UseMenuSWRArgs,
    date: string,
    deps: UseMenuDependencies
) {
  const getRecipesForCollectionId = useGetRecipesForCollectionId(requestArgs, date, deps)

  return {
    getRecipesForCollectionId
  }
}