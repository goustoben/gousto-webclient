import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import { onEnter } from 'utils/accessibility'
import css from './SocialShareSheet.module.css'

const LinkRow = ({ onClick, svgName, rowName }) => (
  <div role="button" tabIndex={0} className={css.row} onClick={onClick} onKeyDown={onEnter(onClick)}>
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
