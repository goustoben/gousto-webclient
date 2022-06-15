import { CSSObject } from "@emotion/react";
import { screen, typography } from "../../styles";

export const cssBrandTag: CSSObject = {
  textTransform: 'uppercase',
  fontSize: typography.sizeXXS,
  fontWeight: '600',
  marginBottom: '0.5rem',
  fontFamily: typography.avenirBookFontStack,

  [`@media ${screen.screenSMMin}`]: {
    fontSize: typography.sizeXS,
  }
}
