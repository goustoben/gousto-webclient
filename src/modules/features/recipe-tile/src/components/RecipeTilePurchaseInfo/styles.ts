import { CSSObject } from "@emotion/react";
import { colors, screen, typography } from "../../styles";

export const cssPurchaseInfoWrapper: CSSObject = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
}

export const cssSurchargeOnTop: CSSObject = {
  flexDirection: 'column',
}

export const cssButtonsWrapper: CSSObject = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
}

export const cssSurchargeInfo: CSSObject = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginRight: '0.75rem',
  paddingTop: '0.125rem',
  color: colors.blackberry,
  fontFamily: typography.avenirBookFontStack,
}

export const cssSurchargeInfoRow: CSSObject = {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  paddingBottom: '0.5rem',
  marginRight: '0',
}

export const cssSurchargeInfoIsFineDineIn: CSSObject = {
  color: colors.white,
}

export const cssSurchargeAmountText: CSSObject = {
  fontWeight: '600',
  whiteSpace: 'nowrap',
  alignSelf: 'flex-end',
  fontSize: typography.sizeSM,
}

export const cssPerText: CSSObject = {
  fontWeight: '500',
  whiteSpace: 'nowrap',
  fontSize: typography.sizeXS,
  lineHeight: typography.sizeMD,
  paddingRight: '0.25rem',
  [`@media ${screen.screenXXSMax}`]: {
    display: 'none',
  }
}

export const cssPerServingText: CSSObject = {
  fontWeight: '500',
  whiteSpace: 'nowrap',
  fontSize: typography.sizeXS,
  lineHeight: typography.sizeMD,
  textAlign: 'right',
  [`@media ${screen.screenXXSMax}`]: {
    fontSize: '12px',
    marginLeft: 'auto',
  }
}

export const cssSpaceLeft: CSSObject = {
  paddingLeft: '0.25rem',
}
