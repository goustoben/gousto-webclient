/* eslint-disable global-require */
import React, { PropTypes } from 'react'
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
