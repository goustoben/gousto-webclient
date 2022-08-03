import { ResponsiveValue } from '@gousto-internal/citrus-react/dist/types/theme/types'

// FYI: default maxRecipesNum is 4, max is 5
// also recipeCellResponsiveSize is used as value for expanded cell size, just to reduce num of variables
// and passing same values twice
export const getRecipeTileResponsiveSize = (maxRecipesNum = 4, expanded = false) => {
  const defaultRecipeTileResponsiveSize = ['4rem', '5rem']
  const collapsedRecipeCellResponsiveSize =
    maxRecipesNum === 5 ? defaultRecipeTileResponsiveSize : ['4.5rem', '6rem']

  return (
    expanded ? defaultRecipeTileResponsiveSize : collapsedRecipeCellResponsiveSize
  ) as ResponsiveValue<string>
}

export const getRecipeTileResponsiveGaps = (maxRecipesNum = 4, expanded = false) => {
  const collapsedResponsiveGapSize = maxRecipesNum === 5 ? ['0.25rem'] : ['1rem', '0.5rem']
  const expandedResponsiveGapSize = ['0.5rem']

  return (
    expanded ? expandedResponsiveGapSize : collapsedResponsiveGapSize
  ) as ResponsiveValue<string>
}
