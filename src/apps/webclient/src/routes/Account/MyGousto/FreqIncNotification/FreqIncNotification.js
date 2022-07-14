import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { CTA } from 'goustouicomponents'
import Link from 'Link'
import { client } from 'config/routes'
import { Section } from 'routes/Account/MyGousto/Section'
import { Alert } from 'routes/Checkout/Components/Alert'
import { click3dsReenterCardDetails, click3dsUpdateInfo } from 'actions/trackingKeys'
import { ProgressSoFarModal } from './ProgressSoFarModal'
import css from './FreqIncNotification.css'

export const FreqIncNotification = () => {
  const [showModal, setShowModal] = useState(false)
  const toggleModal = (type) => () => {
    setShowModal(!showModal)
  }

  return (
    <Fragment>
      <Section alternateColour hasPaddingBottom={false}>
        <Alert>
          <div className={css.alertContent}>
            <div className={css.buttonsContainer}>
              <CTA variant="secondary" size="small" onClick={toggleModal(click3dsUpdateInfo)}>Show Progress So Far</CTA>
            </div>
          </div>
        </Alert>
      </Section>
      <ProgressSoFarModal isOpen={showModal} toggleModal={toggleModal} />
    </Fragment>
  )
}

FreqIncNotification.propTypes = {
  track3dsCompliantClick: PropTypes.func.isRequired,
}
