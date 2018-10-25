import React from 'react'
import css from './Title.css'

const Title = ({ title }) => (
	<h2 className={css.heading}>{title}</h2>
)

Title.propTypes = {
	title: React.PropTypes.string.isRequired,
}

export default Title
