import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Gel from 'Gel'
import config from 'config/menu'
import css from './ChristmasBanner.css'

const ChristmasBanner = ({ hide }) => (
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

ChristmasBanner.defaultProps = {
  hide: false,
}

ChristmasBanner.propTypes = {
  hide: PropTypes.bool,
}

export {
  ChristmasBanner
}
