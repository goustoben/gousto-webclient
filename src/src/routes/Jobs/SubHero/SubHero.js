/* eslint-disable global-require */
import PropTypes from 'prop-types'

import React from 'react'
import css from './SubHero.css'

class SubHero extends React.PureComponent {
  render() {
    const imageUrl = require(`./${this.props.imageName}.jpg`)

    return (
			<div className={css.imageContainer} style={{ backgroundImage: `url(${imageUrl})` }} ></div>
    )
  }
}

SubHero.propTypes = {
  imageName: PropTypes.number,
}

SubHero.defaultProps = {
  imageName: 4,
}

export default SubHero
