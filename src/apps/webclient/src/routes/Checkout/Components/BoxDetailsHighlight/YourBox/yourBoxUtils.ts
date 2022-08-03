import { ResponsiveValue } from '@gousto-internal/citrus-react/dist/types/theme/types'

// FYI: default maxRecipesNum is 4, max is 5
// also recipeCellResponsiveSize is used as value for expanded cell size, just to reduce num of variables
// and passing same values twice, also this needed to escape nesting in ternary
export const getRecipeTileResponsiveSize = (maxRecipesNum = 4, expanded = false) => {
  const defaultRecipeTileResponsiveSize = ['4rem', '5rem']
  const collapsedRecipeCellResponsiveSize =
    maxRecipesNum === 5 ? defaultRecipeTileResponsiveSize : ['4.5rem', '6rem']

  return (
    expanded ? defaultRecipeTileResponsiveSize : collapsedRecipeCellResponsiveSize
  ) as ResponsiveValue<string>
}
