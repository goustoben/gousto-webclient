import React from 'react'
import { PropTypes } from 'prop-types'
import css from './CancelButton.css'

const CancelButton = ({ basketRestorePreviousValues }) => (
  <div className={css.cancelRow}>
    <button type='button' onClick={basketRestorePreviousValues} className={css.cancelLink}>
      Cancel
    </button>
  </div>
)

CancelButton.propTypes = {
  basketRestorePreviousValues: PropTypes.func.isRequired
}

export { CancelButton }
