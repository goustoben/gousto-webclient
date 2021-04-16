import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'redux-form'

import css from './SubscriptionOption.css'

const SubscriptionOption = ({ name, id, title, description, checked, onClick }) => (
  <label className={css.container} htmlFor={id}>
    <div>
      <Field
        id={id}
        name={name}
        value={id}
        component="input"
        type="radio"
        checked={checked}
        className={css.radio}
        readOnly
        onChange={onClick}
      />
    </div>
    <div className={css.content}>
      <p className={css.title}>{title}</p>
      {description
        ? description.map((descriptionOption) => (
            <p key={descriptionOption} className={css.description}>
              {descriptionOption}
            </p>
          ))
        : null}
    </div>
  </label>
)

SubscriptionOption.defaultProps = {
  name: '',
  onClick: () => {},
  checked: false,
  description: [],
}

SubscriptionOption.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(PropTypes.string),
  checked: PropTypes.bool,
  onClick: PropTypes.func,
}

export { SubscriptionOption }
