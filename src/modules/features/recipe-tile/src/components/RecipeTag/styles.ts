import { CSSObject } from "@emotion/react";
import { colors, typography } from "../../styles";

export const cssRecipeTag: CSSObject = {
  padding: '0.25rem 0.5rem 0.2rem 0.5rem',
  fontWeight: '600',
  fontSize: '13px',
  textTransform: 'uppercase',
  color: colors.white,
  whiteSpace: 'nowrap',
  left: 0,
  fontFamily: typography.avenirBookFontStack,
}
