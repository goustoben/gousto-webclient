import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { CTA } from 'goustouicomponents'
import { Section } from 'routes/Account/MyGousto/Section'
import { Alert } from 'routes/Checkout/Components/Alert'
import Immutable from 'immutable'
import { ProgressSoFarModal } from './ProgressSoFarModal'
import css from './FreqIncNotification.css'

export const FreqIncNotification = ({ frequencyProgress, showModal, updateShowModal, showBanner }) => {
  const toggleModal = () => () => {
    updateShowModal(!showModal)
  }

  return (
    <Fragment>
      { showBanner === true ?
        (
          <Section alternateColour hasPaddingBottom={false}>
            <Alert sho>
              <div className={css.alertContent}>
                <div className={css.buttonsContainer}>
                  <CTA variant="secondary" size="small" onClick={toggleModal()}>Show Progress So Far</CTA>
                </div>
              </div>
            </Alert>
          </Section>
        ) : null}
      <ProgressSoFarModal frequencyProgress={frequencyProgress} isOpen={showModal} toggleModal={toggleModal} />
    </Fragment>
  )
}

FreqIncNotification.propTypes = {
  frequencyProgress: PropTypes.instanceOf(Immutable.Map),
  updateShowModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  showBanner: PropTypes.bool.isRequired,
}

FreqIncNotification.defaultProps = {
  frequencyProgress: Immutable.Map(),
}
