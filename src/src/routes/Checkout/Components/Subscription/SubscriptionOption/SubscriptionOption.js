import React, { PropTypes } from 'react'
import { Field } from 'redux-form'

import css from './SubscriptionOption.css'

const SubscriptionOption = ({ name, id, title, description, checked }) => (
	<label className={css.container}>
		<Field
			name={name}
			value={id}
			component="input"
			type="radio"
			checked={checked}
			className={css.radio}
			readOnly
		/>
		<div className={css.content}>
			<p className={css.title}>{title}</p>
			{(description) ? <p className={css.description}>{description}</p> : null}
		</div>
	</label>
)

SubscriptionOption.defaultProps = {}

SubscriptionOption.propTypes = {
	name: PropTypes.string,
	id: PropTypes.number,
	title: PropTypes.string,
	description: PropTypes.string,
	checked: PropTypes.bool,
}

export default SubscriptionOption
