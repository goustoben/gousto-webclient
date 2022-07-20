export type UseMenuDependencies = {
  numPortions: number,
  isRecipeInStock: (coreRecipeId: string, numPortions: number) => boolean
}
