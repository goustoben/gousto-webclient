import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import GetHelpLayout from 'layouts/GetHelpLayout'
import { client } from 'config/routes'
import { CTA, ItemExpandable } from 'goustouicomponents'
import { List } from '../components/List'
import { ItemLink } from '../components/ItemLink'
import css from './Delivery.css'

const propTypes = {
  trackDeliveryOther: PropTypes.func.isRequired,
  trackDeliveryStatus: PropTypes.func.isRequired,
}

const Delivery = ({ trackDeliveryOther, trackDeliveryStatus }) => {
  const content = {
    intro: 'The tracking link is available on your day of delivery and this can be found on the "My Gousto" page under your next box delivery.',
    cta: 'View My Gousto',
  }
  const redirectTo = () => browserHistory.push(client.myGousto)

  return (
    <GetHelpLayout title="Get help with box issue?">
      <List>
        <ItemExpandable
          label="Day of delivery tracking"
          trackClick={trackDeliveryStatus}
        >
          <div className={css.deliveryStatusContent}>
            <p>
              {content.intro}
            </p>
            <CTA size="small" onClick={redirectTo} variant="primary">
              {content.cta}
            </CTA>
          </div>
        </ItemExpandable>
        <ItemLink
          label="Other"
          trackClick={trackDeliveryOther}
          to={`${client.getHelp.index}/${client.getHelp.contact}`}
          clientRouted
        />
      </List>
    </GetHelpLayout>
  )
}

Delivery.propTypes = propTypes

export {
  Delivery
}
