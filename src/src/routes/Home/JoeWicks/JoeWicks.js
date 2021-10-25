import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { joeWicks } from 'config/home'
import css from './JoeWicks.css'

const JoeWicks = ({ isHomeJpgEnabled }) => {
  const className = classNames(css.joeWicksImage, { [css.isHomeJpgEnabled]: isHomeJpgEnabled })

  return (
    <div className={css.backgroundContainer}>
      <div className={css.container}>
        <div role="img" aria-label="joe wicks" className={className} />
        <div className={css.textContainer}>
          <p className={css.quote}>{joeWicks}</p>
          <span className={css.joeWicksSign}>Joe Wicks</span>
          <span className={css.bodyCoach}> | The Body Coach</span>
        </div>
      </div>
    </div>
  )
}

JoeWicks.propTypes = {
  isHomeJpgEnabled: PropTypes.bool,
}

JoeWicks.defaultProps = {
  isHomeJpgEnabled: false,
}

export { JoeWicks }
