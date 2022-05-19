import { CSSObject } from "@emotion/react"
import { colors, typography, screen } from '../../styles'

export const cssAddButton: CSSObject = {
  backgroundColor: colors.bluecheese,
  color: colors.white,
  display: 'flex',
  padding: '0 1rem',
  height: '2.5rem',
  width: '2.5rem',
  borderRadius: '3px',
  border: 'none',
  justifyContent: 'center',
  [`@media ${screen.screenSMMin}`]: {
    minWidth: '11.25rem',
  },
  '&:hover': {
    backgroundColor: colors.blueberry,
    cursor: 'pointer',
  },

 '&:disabled': {
    color: colors.white,
    backgroundColor: colors.oyster,
  }
}

export const cssButtonText: CSSObject = {
  alignSelf: 'center',
  fontFamily: typography.axiformaFontStack,
  fontWeight: '600',
  fontSize: typography.sizeMD,
  lineHeight: '1.5rem',
  margin: '0.75px 0',
  display: 'flex',
  alignItems: 'center',
}

export const cssHideOnMobile: CSSObject = {
  marginLeft: '0.75rem',
  paddingTop: '0.125rem',
  [`@media ${screen.screenXSMax}`]: {
    display: 'none',
  },
}

export const cssRemoveButton: CSSObject = {
  border: `1px solid ${colors.bluecheese}`,
  color:  colors.bluecheese,
  backgroundColor: colors.white,
  display: 'flex',
  padding: '0 1rem',
  height: '2.5rem',
  width: '2.5rem',
  borderRadius: '3px',
  justifyContent: 'center',
  [`@media ${screen.screenSMMin}`]: {
    minWidth: '11.25rem',
  },
  '&:hover': {
    cursor: 'pointer',
  },
}

export const cssRemoveButtonLine: CSSObject = {
  stroke: colors.bluecheese,
}

export const cssAddButtonLine: CSSObject = {
  stroke: colors.white,
}
