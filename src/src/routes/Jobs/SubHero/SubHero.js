/* eslint-disable global-require */
import PropTypes from 'prop-types'
import React from 'react'
import css from './SubHero.css'

const SubHero = ({ imageName }) => {
  const imageUrl = require(`./${imageName}.jpg`)

  return (
    <div
      className={css.imageContainer}
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  )
}

SubHero.propTypes = {
  imageName: PropTypes.number,
}

SubHero.defaultProps = {
  imageName: 4,
}

export default SubHero
