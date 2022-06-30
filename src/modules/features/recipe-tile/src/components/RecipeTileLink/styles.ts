import { CSSObject } from "@emotion/react";

const colorS200 = '#A29EFF'
const colorS400 = '#615CFF'
const colorS600 = '#412dee'
const outlineBroderWidth = '0.1875rem'
const outlineBorderRadius = '0.1875rem'

export const cssRecipeTileLink: CSSObject = {
  label: 'cssRecipeTileLink',
  width: '100%',
  border: 'none',
  background: 'transparent',
  padding: '0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',

  borderBottom: `0.0625rem solid ${colorS400}`,

  color: colorS400,

  '&:focus': {
    outline: 'none',
    border: `${outlineBroderWidth} solid ${colorS400}`,
    borderRadius: outlineBorderRadius,
    borderBottomColor: colorS600,
    color: colorS600
  },

  '&:hover': {
    borderBottomColor: colorS600,
    color: colorS600
  }
}

export const cssFineDineIn: CSSObject = {
  borderBottom: `0.0625rem solid ${colorS200}`,
  color: colorS200,

  '&:hover': {
    borderBottomColor: colorS400,
    color: colorS400
  }
}
