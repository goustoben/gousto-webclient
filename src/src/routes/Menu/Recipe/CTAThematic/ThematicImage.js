import React from 'react'
import PropTypes from 'prop-types'
import { getImage } from 'utils/menu'
import Image from 'Image'

import css from './CTAThematic.css'

const ThematicImage = ({ imageName }) => <Image className={css.staticImg} media={getImage(`thematic/${imageName}`)} />

ThematicImage.propTypes = {
  imageName: PropTypes.string.isRequired
}

export { ThematicImage }
