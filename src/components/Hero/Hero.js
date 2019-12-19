import PropTypes from 'prop-types'
import React from 'react'
import css from './Hero.css'

const Hero = ({ imageUrl, headerText, style }) => (
  <div className={css.container} style={{ backgroundImage: `url('${imageUrl}')`, ...style }}>
    <div className={css.textContainer}>
      <h1 className={css.header}>
        <span>{headerText}</span>
      </h1>
    </div>
  </div>
)

Hero.defaultProps = {
  style: {},
}

Hero.propTypes = {
  imageUrl: PropTypes.string,
  headerText: PropTypes.string,
  style: PropTypes.object,
  redirect: PropTypes.func,
  dataTesting: PropTypes.string,
}

export default Hero
