import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

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

type ChevronIconContainerProps = { expanded: boolean }
export const ChevronIconContainer = styled.div(({ expanded }: ChevronIconContainerProps) => ({
  transform: `rotateZ(${expanded ? '180deg' : '0deg'})`,
  width: '1.5rem',
  height: '1.5rem',
  animation: `${expanded ? chevronCollapseAnim : chevronExpandAnim} ${
    expanded ? '600ms' : '300ms'
  } ease-out`,
}))
