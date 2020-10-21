import React from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { BottomFixedContent, CTA, Heading } from 'goustouicomponents'
import { GetHelpLayout2 } from '../../../layouts/GetHelpLayout2'
import css from './DeliveryPreContact.css'

const redirectToContactPage = () => {
  browserHistory.push(`${client.getHelp.index}/${client.getHelp.contact}`)
}

const DeliveryPreContact = ({ backUrl }) => (
  <GetHelpLayout2 backUrl={backUrl} headingText="Get help with your box">
    <Heading size="fontStyleM" type="h2">
      We&apos;re sorry to hear your box did not arrive
    </Heading>
    <p className={css.mainText}>
      We take this issue very seriously and are keep to investigate further for you.
      Please get in touch with one of our Customer Care team below so we can help sort this out.
    </p>
    <BottomFixedContent>
      <CTA size="small" isFullWidth onClick={redirectToContactPage}>
        Get in touch
      </CTA>
    </BottomFixedContent>
  </GetHelpLayout2>
)

DeliveryPreContact.propTypes = {
  backUrl: PropTypes.string.isRequired
}

export { DeliveryPreContact }
