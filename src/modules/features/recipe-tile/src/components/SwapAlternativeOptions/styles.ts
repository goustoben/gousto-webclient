// @value headingFontStackBold, sizeLG, sizeMD, sizeXS from 'styles/typography.css';
// @value Bluecheese, White, Mackerel from 'styles/colors.css';
// @value ScreenXXSMax, ScreenXXSMin, ScreenXSMax from 'styles/screenSizes.css';
// @value Top from 'styles/z-index.module.css';

import { CSSObject } from "@emotion/react";
import { colors, screen, zIndex } from "../../styles";

// /* Mobile Modal stylings */

// .variantRecipeListModal {
//   position: fixed;
//   top: auto;
//   bottom: 0;
//   width: 100%;
//   border-radius: 0;
//   margin: 0;
//   @media (max-width: 420px) {
//     transform: translate(-50%, 0);
//   }
// }

// .variantRecipeListModalTitleWrapper {
//   display: flex;
//   flex-direction: row;
//   margin: 0;
//   position: relative;
//   padding: 1.25rem 1rem 0.5rem;
// }

// .variantRecipeListModalTitle {
//   font-family: headingFontStackBold;
//   font-size: sizeLG;
//   text-align: left;
//   padding-right: 2rem;
// }

// .variantRecipeListModalCloseX {
//   composes: closeIcon from 'styles/icons.css';
//   position: absolute;
//   top: 1rem;
//   right: 1rem;
//   border: none;
//   padding: 0;
//   background: none;
// }

// .variantRecipeListModalContent {
//   text-align: left;
//   margin: 0;
//   padding: 0.25rem 1rem 2rem;
// }

// .variantRecipeListModalFooter {
//   margin: 0;
//   padding: 1rem;
//   border-top: 1px solid Mackerel;
//   margin-top: 1rem;
// }

// .addASideLabel {
//   font-weight: 600;
//   font-size: sizeXS;
// }

// .variantRecipeListOverlayContent {
//   min-height: auto;
// }

/* Desktop dropdown section */

export const cssOuterWrapper: CSSObject = {
  display: 'flex',
  marginLeft: '1rem',
  justifyContent: 'flex-end',
}

export const cssButton: CSSObject = {
  height: '2.5rem',
  width: '2.5rem',
  border: `1px solid ${colors.bluecheese}`,
  color: colors.bluecheese,
  backgroundColor: colors.white,
  borderRadius: '3px',
  justifyContent: 'center',
  padding: '0',
  [`@media ${screen.screenSMMin}`]: {
    minWidth: '11.25rem',
  }
}

export const cssDropWrapper: CSSObject = {
  position: 'absolute',
  width: '90%',
  background: colors.white,
  zIndex: zIndex.top,
  display: 'none',
  top: '3.5rem',

  boxShadow: '0 4px 14px 0 rgba(51, 61, 71, 0.2)',
  padding: '1rem',
  [`@media ${screen.screenSMMin}`]: {
    paddingTop: '0',
  }
}

export const cssIsExpanded: CSSObject = {
  display: 'block',
}

export const cssChevron: CSSObject = {
  paddingLeft: '0.125rem',
  '& path': {
    fill: colors.bluecheese,
  }
}
