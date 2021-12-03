import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import usePrevious from 'react-use/lib/usePrevious'
import { Button } from 'goustouicomponents'
import classnames from 'classnames'
import css from './OrderSummary.module.css'

const useSafePrevious = (value) => {
  const prevValue = usePrevious(value)

  return prevValue === undefined ? value : prevValue
}

export const useSaving = (saveRequired, saving, error) => {
  const [showButton, setShowButton] = useState(saveRequired)
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const prevSaving = useSafePrevious(saving)
  const prevSaveRequired = useSafePrevious(saveRequired)

  useEffect(() => {
    if (!prevSaveRequired && saveRequired) {
      setShowButton(true)
    }
  }, [saveRequired, prevSaveRequired])

  useEffect(() => {
    if (prevSaving === saving) {
      return
    }

    if (saving) {
      return
    }

    setShowButton(false)

    if (error) {
      setShowError(true)
      setTimeout(() => setShowError(false), 5000)
    } else {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }, [saving, prevSaving, error])

  return { showButton, showSuccess, showError }
}

export const SaveButton = ({ saveRequired, onClick, saving, onOrderConfirmationMobile, error }) => {
  const { showButton, showSuccess, showError } = useSaving(saveRequired, saving, error)

  return (
    <div className={classnames({ [css.updateOrderButton]: onOrderConfirmationMobile })}>
      {showButton && (
        <div className={css.button}>
          <Button
            disabled={saving}
            onClick={onClick}
            pending={saving}
            width="full"
          >
            Update Order
          </Button>
        </div>
      )}
      {(showSuccess && !showButton) ? <div className={css.success}>SAVED</div> : null}
      {(showError && !showButton) ? <div className={css.error}>ERROR SAVING CHOICES</div> : null}
    </div>
  )
}

SaveButton.propTypes = {
  error: PropTypes.bool,
  onClick: PropTypes.func,
  onOrderConfirmationMobile: PropTypes.bool,
  saving: PropTypes.bool,
  saveRequired: PropTypes.bool.isRequired,
}

SaveButton.defaultProps = {
  error: false,
  onClick: () => { },
  onOrderConfirmationMobile: false,
  saving: false,
}

export default SaveButton
