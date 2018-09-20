import React, { PropTypes } from 'react'
import { ModalContent } from 'ModalComponent'

import css from './ValueProposition.css'

const propTypes = {
	featureFlag: PropTypes.boolean,
	valueProposition: PropTypes.shape({
		title: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
	})
}

const defaultProps = {
	valueProposition: {
		title: 'Not in on your delivery date?',
		message: 'Change your delivery day easily for any box you can choose recipes for.',
	}
}

const ValueProposition = ({ featureFlag, valueProposition }) => (
	(featureFlag)
		? (
			<ModalContent>
				<div className={css.title}>{valueProposition.title}</div>
				<div className={css.message}>{valueProposition.message}</div>
			</ModalContent>
		) : null
)

ValueProposition.propTypes = propTypes

ValueProposition.defaultProps = defaultProps

export default ValueProposition
