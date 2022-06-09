import { CSSObject } from "@emotion/react";
import { colors, typography } from '../../../styles'

export const cssRecipeList: CSSObject = {
  width: '100%',
  color: colors.black,
}

export const cssRecipeListText: CSSObject = {
  listStyle: 'none',
  margin: '0',
  padding: '0',
}

export const cssVariantsTitle: CSSObject = {
  fontSize: typography.sizeXL,
}

export const cssItem: CSSObject = {
  textAlign: 'left',
  boxSizing: 'content-box',
}
