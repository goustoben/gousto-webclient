import PropTypes from 'prop-types'
import React from 'react'

import { Button } from 'goustouicomponents'

import css from './Confirm.css'

export const Confirm = ({ pending, unsubscribeClick, isError, copy, dataTesting }) => (
  <div>
    <p>
      {copy.body1}
      <br />
      {copy.body2}
    </p>
    <Button
      disabled={pending}
      className={css.submitButton}
      onClick={unsubscribeClick}
      data-testing={dataTesting}
    >
      {copy.button}
    </Button>
    {isError && (
      <p className={css.confirmContentError}>
        {copy.defaultError}
      </p>
    )}
  </div>
)

Confirm.propTypes = {
  isError: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  unsubscribeClick: PropTypes.func.isRequired,
  dataTesting: PropTypes.string,
  copy: PropTypes.shape({
    defaultError: PropTypes.string,
    body1: PropTypes.string,
    body2: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,
}

Confirm.defaultProps = {
  dataTesting: ''
}
