import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { CTA } from 'goustouicomponents'
import Link from 'Link'
import { client } from 'config/routes'
import { Section } from 'routes/Account/MyGousto/Section'
import { Alert } from 'routes/Checkout/Components/Alert'
import { click3dsReenterCardDetails, click3dsUpdateInfo } from 'actions/trackingKeys'
import { CardDetailsModal } from './CardDetailsModal'
import css from './PaymentDetailsNotification.module.css'

export const PaymentDetailsNotification = ({
  track3dsCompliantClick,
}) => {
  const [showModal, setShowModal] = useState(false)
  const handleClick = (type) => track3dsCompliantClick(type)
  const handleCardDetailsClick = (type) => () => {
    handleClick(type)
  }
  const toggleModal = (type) => () => {
    handleClick(type)
    setShowModal(!showModal)
  }

  return (
    <Fragment>
      <Section alternateColour hasPaddingBottom={false}>
        <Alert>
          <div className={css.alertContent}>
            <div className={css.notificationContainer}>
              <div className={css.header}>Update card details</div>
              <div className={css.messageContainer}>
                Due to new regulations, we need you to re-enter your current card details to ensure you can still order your Gousto box.
              </div>
            </div>
            <div className={css.buttonsContainer}>
              <Link to={`${client.myDetails}?expand_payment_section=1`} clientRouted={false}>
                <CTA size="small" variant="primary" isFullWidth onClick={handleCardDetailsClick(click3dsReenterCardDetails)}>Re-enter my card details</CTA>
              </Link>
              <CTA variant="secondary" size="small" onClick={toggleModal(click3dsUpdateInfo)}>Find out more</CTA>
            </div>
          </div>
        </Alert>
      </Section>
      <CardDetailsModal isOpen={showModal} toggleModal={toggleModal} />
    </Fragment>
  )
}

PaymentDetailsNotification.propTypes = {
  track3dsCompliantClick: PropTypes.func.isRequired,
}
