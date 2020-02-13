import React from 'react'
import { PropTypes } from 'prop-types'
import css from './CancelButton.css'

const CancelButton = ({ basketRestorePreviousValues, shouldShow }) => (
  shouldShow ? (
    <div className={css.cancelRow}>
      <button type="button" onClick={basketRestorePreviousValues} className={css.cancelLink}>
        Cancel
      </button>
    </div>
  ) : null
)

CancelButton.propTypes = {
  basketRestorePreviousValues: PropTypes.func.isRequired,
  shouldShow: PropTypes.bool.isRequired
}

export { CancelButton }
