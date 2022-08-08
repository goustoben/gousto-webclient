import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Breakpoint } from '@gousto-internal/citrus-react'
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

// TODO: rename
export const ExpandContainer = styled.div(() => ({
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  paddingBottom: '0.5rem',
}))

const chevronExpandAnim = keyframes`
  from { transform: rotateZ(180deg); }
  90% { transform: rotateZ(-20deg); }
  to { transform: rotateZ(0); }
`
const chevronCollapseAnim = keyframes`
  from { transform: rotateZ(0); }
  90% { transform: rotateZ(200deg); }
  to { transform: rotateZ(180deg); }
`

type BaseProps = { expanded: boolean }

export const ChevronIconContainer = styled.div(({ expanded }: BaseProps) => ({
  transform: `rotateZ(${expanded ? '180deg' : '0deg'})`,
  width: '1.5rem',
  height: '1.5rem',
  animation: `${expanded ? chevronCollapseAnim : chevronExpandAnim} ${
    expanded ? '600ms' : '300ms'
  } ease-out`,
}))

type RecipeContainerProps = BaseProps & {
  recipeTileResponsiveSize: string[]
  recipesNum: number
}

const recipeContainerExpandAnim = keyframes`
  from {}
  to {}
`
export const RecipesContainer = styled.div(
  ({ expanded, recipeTileResponsiveSize, recipesNum }: RecipeContainerProps) => {
    const [fromSmallSize, fromMediumSize] = recipeTileResponsiveSize

    const fromSmallMediaKey = `@media (min-width: ${Breakpoint.Small})`
    const fromMediumMediaKey = `@media (min-width: ${Breakpoint.Medium})`

    const gapSize = '0.5rem'

    return {
      transition: `ease-out ${expanded ? '300ms' : '100ms'}`,
      display: 'flex',
      flexDirection: expanded ? 'column' : 'row',
      justifyContent: expanded ? 'flex-start' : 'space-between',
      alignItems: expanded ? 'flex-start' : 'center',
      width: '100%',
      gap: gapSize,

      [fromSmallMediaKey]: {
        height: expanded
          ? `calc((${recipesNum} * ${fromSmallSize}) + (${recipesNum - 1} * ${gapSize}))`
          : fromSmallSize,
      },
      [fromMediumMediaKey]: {
        height: expanded
          ? `calc((${recipesNum} * ${fromMediumSize}) + (${recipesNum - 1} * ${gapSize}))`
          : fromMediumSize,
      },
    }
  },
)
