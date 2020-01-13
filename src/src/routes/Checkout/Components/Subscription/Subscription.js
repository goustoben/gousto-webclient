import PropTypes from 'prop-types'
import React from 'react'
import { FormSection } from 'redux-form'
import Immutable from 'immutable'

import css from './Subscription.css'
import SubscriptionOption from './SubscriptionOption'

const frequencyDescription = {
  1: [
    "50% off your first box + 30% off all boxes in your first month",
    "Personalised recipes as we learn what you love",
    "Surprise gifts!",
  ],
  2: [
    "Personalised recipes as we learn what you love",
  ],
}

const Subscription = ({ chosenIntervalId, options, optionName, sectionName, features, trackSubscriptionIntervalChanged }) => (
  (options.size && features.getIn(['chooseSubscription', 'value'])) ? (
    <div className={css.container}>
      <h3 className={css.header}>Your Gousto Plan</h3>
      <p className={css.text}>Your plan, your rules. Choose two, three or four recipes a week. Skip a box when you don’t want one. Pause or cancel at any time.</p>
      <FormSection name={sectionName} className={css.options}>
        {options.map(option => {
          if(option.get('id') == 1 || option.get('id') == 2)
            return (
              <SubscriptionOption
                name={optionName}
                id={option.get('id')}
                key={`interval-${option.get('id')}`}
                title={option.get('title')}
                description={frequencyDescription[option.get('id')]}
                checked={option.get('id') === chosenIntervalId}
                onClick={trackSubscriptionIntervalChanged}
              />
            )
        })}
      </FormSection>
    </div>
  ) : null
)

Subscription.defaultProps = {
  chosenIntervalId: '1',
  optionName: 'interval_id',
  sectionName: '',
  options: Immutable.List(),
  trackSubscriptionIntervalChanged: () => {},
}

Subscription.propTypes = {
  chosenIntervalId: PropTypes.string,
  optionName: PropTypes.string,
  sectionName: PropTypes.string,
  options: PropTypes.instanceOf(Immutable.List).isRequired,
  features: PropTypes.instanceOf(Immutable.Map).isRequired,
  trackSubscriptionIntervalChanged: PropTypes.func,
}

export default Subscription
