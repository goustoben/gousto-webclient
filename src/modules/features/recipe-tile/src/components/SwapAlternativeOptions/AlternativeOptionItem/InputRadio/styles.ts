import { CSSObject } from "@emotion/react";
import { colors, typography } from "../../../../styles";

const tilePadding = '11px'

export const cssInputRadioContainer: CSSObject = {
  position: 'relative',
  minHeight: '1.25rem',
  padding: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',

  '& input[type=radio]': {
    // opacity: '0',
    width: '1.5rem',
    height: '1.5rem',
    position: 'absolute',
    zIndex: '1',
    margin: '0',
  },

  '&:hover .inputRadioMask': {
    borderColor: colors.bluecheese,
  }
}

export const cssInputRadioMask: CSSObject = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid NewGrey',
  borderRadius: '100%',
  width: '1.25rem',
  height: '1.25rem',

  '&:hover': {
    borderColor: colors.bluecheese,
  },

  '&::before': {
    position: 'absolute',
    content: '""',
    background: colors.bluecheese,
    borderRadius: '100%',
    width: '0.75rem',
    height: '0.75rem',
    border: `1px solid ${colors.white}`,
    transform: 'scale(0)',
    transition: 'transform 0.075s ease-in',
  },
}


export const cssInputRadioLabel: CSSObject = {
  font: typography.fontStyleBody,
  paddingLeft: '1.75rem',
  margin: '0',
  width: '100%',
  marginTop: '2px',
}

export const cssDisabled: CSSObject = {
  '& .inputRadioMask': {
    borderColor: colors.oyster,
  },

  '& .inputRadioLabel': {
    color: colors.oyster,
    cursor: 'not-allowed',

    '&::before': {
      borderColor: colors.mackerel,
    }
  },

  '&.tile': {
    borderColor: colors.oyster,

    '&:hover': {
      borderColor: colors.oyster
    }
  },

}

// TODO VPP: come up with syntax for Emotion
// input[type=radio]:checked ~ .inputRadioMask::before {
//   transform: scale(1);
// }

export const cssInputRadioLabelChecked: CSSObject = {
  // composes: fontSemiBold from 'design-language/typography.module.css';
  fontFamily: `${typography.fontFamilyAxiformaSemiBold} !important`,
  color: colors.bluecheese,
  marginTop: '0',
}

// TODO VPP: come up with syntax for Emotion
// input[type=radio]:checked ~ .inputRadioMask {
//   width: 1.25rem;
//   height: 1.25rem;
//   border: 2px solid Bluecheese;
// }

export const cssTile: CSSObject = {
  width: '100%',
  padding: tilePadding,
  border: `1px solid ${colors.mackerel}`,
  borderRadius: '3px',
  cursor: 'pointer',
  background: colors.white,

  '&:hover': {
    borderColor: colors.bluecheese,
  },

  '&:checked': {
    padding: `calc(${tilePadding} - 1px`,
    border: `2px solid ${colors.bluebase}`,
  }
}
