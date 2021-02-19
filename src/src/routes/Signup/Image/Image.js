import PropTypes from 'prop-types'
import React from 'react'

import css from './Image.css'

const SignupImage = ({ name }) => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const style = { backgroundImage: `url(${require(`media/photos/${name}.jpg`)})` }

  return <div className={css.image} style={style} />
}

SignupImage.propTypes = {
  name: PropTypes.string.isRequired,
}

export { SignupImage }
