import PropTypes from 'prop-types'
import React from 'react'

import css from './Image.css'

const SignupImage = ({ name }) => (
  // eslint-disable-next-line import/no-dynamic-require,global-require
  <div className={css.image} style={{ backgroundImage: `url(${require(`media/photos/${name}.jpg`)})` }} />
)

SignupImage.propTypes = {
  name: PropTypes.string,
}

SignupImage.defaultProps = {
  name: '',
}

export { SignupImage }
