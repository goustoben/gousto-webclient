import PropTypes from 'prop-types'
import React from 'react'

import css from './SectionContainer.css'

const SectionContainer = ({ children }) => (
	<div className={css.container}>{children}</div>
)

SectionContainer.propTypes = {
	children: PropTypes.node,
}

export default SectionContainer
