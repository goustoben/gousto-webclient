import React, { PropTypes } from 'react'
import classnames from 'classnames'

import css from './ChristmasBanner.css'

const Banner = ({ hide }) => (
  hide ? null :
        <div className={classnames(css.container, { [css.hide]: hide })}></div>
)

Banner.defaultProps = {
  hide: false,
}

Banner.propTypes = {
  hide: PropTypes.bool,
}

export default Banner
