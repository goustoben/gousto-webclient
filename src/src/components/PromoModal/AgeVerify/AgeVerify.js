import PropTypes from 'prop-types'
import React from 'react'
import CheckBox from 'Form/CheckBox'
import css from './AgeVerify.module.css'

export const AgeVerify = ({ verified, onChange }) => (
  <div className={css.checkbox}>
    <CheckBox
      label="Please confirm you are over 18 years old to receive these gifts"
      required
      checked={verified}
      onChange={onChange}
      labelClassName={css.label}
    />
  </div>
)

AgeVerify.propTypes = {
  verified: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

AgeVerify.defaultProps = {
  verified: false,
}
