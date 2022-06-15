import { CSSObject } from "@emotion/react";
import { colors, screen, typography } from "../../styles";

export const cssRecipeTile: CSSObject = {
  width: '100%',
  position: 'relative',
  height: '220px',
  margin: '0 0.75rem 0.75rem 0.75rem',
  flexDirection: 'column',

  [`@media ${screen.screenSMMin}`]: {
    margin: '0 1rem 1rem 0',
    width: 'calc(50% - 1rem)',
    height: 'auto',
  },
  [`@media ${screen.screenMDMin}`]: {
    width: 'calc(33.33% - 1rem)',
  },
  [`@media ${screen.screenLGMin}`]: {
    width: 'calc(25% - 1rem)',
  }
}

export const cssRecipeTileContainer: CSSObject = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: colors.white,
  color: colors.blackberry,
  position: 'relative',
  [`@media ${screen.screenSMMin}`]: {
    flexDirection: 'column',
  },

  '&:nth-of-type(2n)': {
    [`@media ${screen.screenSMMin} and ${screen.screenSMMax}`]: {
      marginRight: '0',
    }
  },

  '&:nth-of-type(3n)': {
    [`@media ${screen.screenMDMin} and ${screen.screenMDMax}`]: {
      marginRight: '0',
    }
  },

  '&:nth-of-type(4n)': {
    [`@media ${screen.screenLGMin}`]: {
      marginRight: '0',
    }
  },

  '&:hover': {
    boxShadow: '0 4px 14px 0 rgba(51, 61, 71, 0.2)',
    cursor: 'pointer',
  },
}

export const cssRecipeTileInfo: CSSObject = {
  margin: '1rem',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '35%',
  [`@media ${screen.screenXSMax}`]: {
    margin: '0.75rem',
    height: 'auto',
    width: '35%',
  },
}

export const cssVariantPushDown: CSSObject = {
  paddingTop: '30px',
  [`@media ${screen.screenSMMin}`]: {
    paddingTop: '0',
  },
}

export const cssRecipeTileIsFineDineIn: CSSObject = {
  background: colors.blackberry,
  color: colors.white,
}

export const cssVariantDropdownContainer: CSSObject = {
  width: '100%',
  position: 'absolute',
  top: '98%',
  right: '0',
  zIndex: '150',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  borderRadius: '3px',
  padding: '0.5rem',
  backgroundColor: colors.white,

  [`@media ${screen.screenSMMin}`]: {
    width: '112%',
    right: '-6%',
  },

  [`@media ${screen.screenMDMin}`]: {
    width: '112%',
    right: '-6%',
  },

  [`@media ${screen.screenLGMin}`]: {
    width: '112%',
    right: '-6%',
  },
}

export const cssRecipeTileTitle: CSSObject = {
  marginBottom: '1rem',
  flex: '1',
  fontFamily: typography.axiformaFontStack,
  fontSize: typography.sizeXS,
  fontWeight: '600',
  lineHeight: '1.6',
  [`@media ${screen.screenSMMin}`]: {
    fontSize: typography.sizeMD,
  }
}

export const cssRecipeTagHolder: CSSObject = {
  position: 'absolute',
  top: '0.5rem',
}

export const cssRecipeTagHolderShifted: CSSObject = {
  position: 'absolute',
  top: '2.625rem',
}
