import { CSSObject } from "@emotion/react"
import { colors } from '../../styles'

export const cssVariantHeader: CSSObject = {
  padding: '0.25rem 0',
  color: colors.white,
  fontWeight: 'bold',
  width: '100%',
  zIndex: '100',
  textAlign: 'left',
}

export const cssTextLeft: CSSObject = {
  paddingLeft: '0.625rem',
  textAlign: 'left',
}

export const cssThemeBlue: CSSObject = {
  background: colors.bluecheese,
}

export const cssPositionTop: CSSObject = {
  position: 'absolute',
  top: '0',
}
