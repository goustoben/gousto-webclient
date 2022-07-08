export type UseMenuDependencies = {
  selectedRecipeVariants: Record<string, Record<string, string>>,
  numPortions: number,
  isRecipeInStock: (coreRecipeId: string, numPortions: number) => boolean
}