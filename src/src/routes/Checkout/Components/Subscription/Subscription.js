import PropTypes from 'prop-types'
import React from 'react'
import { FormSection } from 'redux-form'
import Immutable from 'immutable'

import css from './Subscription.css'
import SubscriptionOption from './SubscriptionOption'

const Subscription = ({ chosenIntervalId, options, optionName, sectionName, features }) => (
	(options.size && features.getIn(['chooseSubscription', 'value'])) ? (
		<div className={css.container}>
			<h3 className={css.header}>Subscription frequency</h3>
			<p className={css.text}>You can change, pause or cancel at any time, simply log-in and go to ‘Subscription’. No lock-in, no stress.</p>
			<FormSection name={sectionName} className={css.options}>
				{options.map(option => (
					<SubscriptionOption
						name={optionName}
						id={option.get('id')}
						key={`interval-${option.get('id')}`}
						title={option.get('title')}
						description={option.get('description')}
						checked={option.get('id') === chosenIntervalId}
					/>
				))}
			</FormSection>
		</div>
	) : null
)

Subscription.defaultProps = {
	chosenIntervalId: '1',
	optionName: 'interval_id',
	sectionName: '',
	options: Immutable.List(),
	features: Immutable.Map(),
}

Subscription.propTypes = {
	chosenIntervalId: PropTypes.string,
	optionName: PropTypes.string,
	sectionName: PropTypes.string,
	options: PropTypes.instanceOf(Immutable.List).isRequired,
	features: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default Subscription
