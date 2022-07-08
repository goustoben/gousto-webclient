import { CSSObject } from "@emotion/react"
import { colors, screen } from '../../styles'

export const cssLikeDislikeButtons: CSSObject = {
  position: 'absolute',
  bottom: '0.75rem',
  right: '0.75rem',
  [`@media ${screen.screenSMMin}`]: {
    width: '2.5em',
    height: '2.5em',
    padding: '0em',
  },
}

export const cssLikeButton: CSSObject = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bottom: 0,
  right: 0,
  width: '2.25em',
  height: '2.25em',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: 'white',
  padding: '0em',

  [`@media ${screen.screenSMMin}`]: {
    width: '2.5em',
    height: '2.5em',
    padding: '0em',
  },
}

export const cssDislikeButton: CSSObject = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bottom: 0,
  right: '2.75em',
  width: '2.25em',
  height: '2.25em',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: 'white',
  padding: '0em',

  [`@media ${screen.screenSMMin}`]: {
    width: '2.5em',
    height: '2.5em',
    padding: '0em',
    right: '3em',
  },
}

export const cssThumb: CSSObject = {
  fill: colors.bluecheese,
  width: '1.25em',
  height: '1.25em',
  
  [`@media ${screen.screenSMMin}`]: {
    width: '1.5em',
    height: '1.5em',
    fontSize: '1em',
    '&:hover': {
      fill: colors.blueberry,
      cursor: 'pointer',
    },
  },
}
