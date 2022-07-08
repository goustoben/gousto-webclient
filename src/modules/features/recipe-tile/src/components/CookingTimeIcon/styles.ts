import { CSSObject } from "@emotion/react"
import { colors, screen } from '../../styles'

export const cssCookingTimeIcon: CSSObject = {
  position: 'absolute',
  bottom: '0.75rem',
  left: '0.75rem',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  padding: '3px',

  [`@media ${screen.screenSMMin}`]: {
    width: '40px',
    height: '40px',
    padding: '4px',
  },
}

export const cssCircularChart: CSSObject = {
  display: 'block',
}

export const cssCircularChartCircleBg: CSSObject = {
  fill: 'none',
  stroke: colors.white,
  strokeWidth: 4,
}

export const cssCircularChartCircle: CSSObject = {
  fill: 'none',
  strokeWidth: '4',
  strokeLinecap: 'round',
  animation: 'progress 1s ease-out forwards',
  stroke: colors.black,
}

export const cssTime: CSSObject = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  top: 0,
  left: 0,
  fontWeight: 600,
  fontSize: '12px',
  fill: colors.black,
  color: colors.black,
  padding: '3px',
  
  [`@media ${screen.screenSMMin}`]: {
    width: '40px',
    height: '40px',
    fontSize: '13px',
    padding: '4px'
  },
}

export const cssKeyframesProgress: CSSObject = {
  '@keyframes progress': {
    '0%': {
      strokeDasharray: '0 100',
    },
  },
}
