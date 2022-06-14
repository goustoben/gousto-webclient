import { CSSObject } from "@emotion/react";
import { screen } from "../../styles";

export const cssImageWrapper: CSSObject = {
  height: '100%',
  width: '62%',
  border: 'none',
  background: 'none',
  position: 'relative',
  padding: '0',
  overflow: 'hidden',
  [`@media ${screen.screenSMMin}`]: {
    height: '65%',
    minHeight: '18.75rem',
    width: '100%',
  },

  '&:hover': {
    cursor: 'pointer',
  },
}

export const cssImageStyle: CSSObject = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transform: 'scale(1.1)',
  [`@media ${screen.screenSMMin}`]: {
    position: 'relative',
  },
}

export const cssRecipeImageAndCookingTimeWrapper: CSSObject = {
  height: '100%',
  width: '100%',
}
