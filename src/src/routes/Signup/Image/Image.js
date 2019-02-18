import PropTypes from 'prop-types'
import React from 'react'

import css from './Image.css'

const SignupImage = ({ name }) => (
	<div className={css.image} style={{ backgroundImage: `url(${require(`media/photos/${name}.jpg`)})` }} /> // eslint-disable-line global-require
)

SignupImage.propTypes = {
  name: PropTypes.string,
}

export default SignupImage
