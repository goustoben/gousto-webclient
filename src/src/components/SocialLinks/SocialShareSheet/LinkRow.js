import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import css from './SocialShareSheet.css'

const LinkRow = ({ onClick, svgName, rowName }) => (
  <div className={css.row} onClick={onClick}>
    <div className={css.iconWrapper}>
      <Svg fileName={svgName} className={css.icon} />
    </div>
    <span>{rowName}</span>
  </div>
)

LinkRow.propTypes = {
  onClick: PropTypes.func.isRequired,
  svgName: PropTypes.string.isRequired,
  rowName: PropTypes.string.isRequired,
}

export { LinkRow }
