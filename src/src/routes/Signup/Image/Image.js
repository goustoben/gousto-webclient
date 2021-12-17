import PropTypes from 'prop-types'
import React from 'react'

import css from './Image.css'

const SignupImage = ({ imageUrl }) => {
  const style = { backgroundImage: `url(${imageUrl})` }

  return <div className={css.image} style={style} />
}

SignupImage.propTypes = {
  name: PropTypes.string.isRequired,
}

export { SignupImage }
