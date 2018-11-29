import React, { PropTypes } from 'react'
import classnames from 'classnames'

import css from './ChristmasBanner.css'
import Gel from 'Gel'
import config from 'config/menu'

const Banner = ({ hide }) => (
  hide ? null :
    <div className={classnames(css.container, { [css.hide]: hide })}>
      <div className={css.contentContainer}>
        <Gel className={css.gelMain} size="large" color="red">
          <p className={css.gelMainText}>{config.christmasBanner.gelMain.text}</p>
          <p className={css.gelMainTitle}>{config.christmasBanner.gelMain.title}</p>
        </Gel>
      </div>
    </div>
)

Banner.defaultProps = {
  hide: false,
}

Banner.propTypes = {
  hide: PropTypes.bool,
}

export default Banner
