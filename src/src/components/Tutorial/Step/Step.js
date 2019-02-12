import React from 'react'
import PropTypes from 'prop-types'

import { Tooltip } from 'Tooltip'
import { Spotlight } from 'Spotlight'

import { getSpotlightLocation, getTooltipProperties } from 'Tutorial/helpers'
import css from './Step.css'

const Step = ({ children, last, onClose, onClick, selector }) => {
  const { style, arrow } = getTooltipProperties(selector, 300)
  const location = getSpotlightLocation(selector)

  return (
    <div>
      <Spotlight
        {...location}
      />
      <div className={css.tooltip} style={style}>
        <Tooltip arrow={arrow} onClose={onClose}>
          {children}
          <div className={css.cta} onClick={onClick}>
            <p>{(last) ? 'OK' : 'NEXT &rsaquo'}</p>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}

Step.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  last: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  selector: PropTypes.string.isRequired,
}

export {
  Step,
}
