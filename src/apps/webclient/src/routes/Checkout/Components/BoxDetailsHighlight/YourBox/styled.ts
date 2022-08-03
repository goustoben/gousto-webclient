import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

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
  from {
    transform: rotateZ(180deg);
  }

  90% {
    transform: rotateZ(-20deg);
  }

  to {
    transform: rotateZ(0);
  }
`

const chevronCollapseAnim = keyframes`
  from {
    transform: rotateZ(0);
  }

  90% {
    transform: rotateZ(200deg);
  }

  to {
    transform: rotateZ(180deg);
  }
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

type RecipesContainerProps = BaseProps & {
  fiveRecipes: boolean
}
const getRecipesContainerGapBasedOnRecipesNum = (fiveRecipes: boolean) =>
  fiveRecipes ? '0.25rem' : '1rem'
export const RecipesContainer = styled.div(({ expanded, fiveRecipes }: RecipesContainerProps) => ({
  transition: `ease-out ${expanded ? '100ms' : '300ms'}`,
  display: 'flex',
  flexDirection: expanded ? 'column' : 'row',
  justifyContent: 'flex-start',
  alignItems: expanded ? 'flex-start' : 'center',
  width: '100%',
  gap: expanded ? '0.5rem' : getRecipesContainerGapBasedOnRecipesNum(fiveRecipes),
}))
