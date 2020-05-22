import React from 'react'
import PropTypes from 'prop-types'
import { Heading } from 'goustouicomponents'
import { zendesk as zendeskRoutes } from 'config/routes'
import { addUserIdToUrl } from 'utils/url'
import css from './CapacityInfo.css'

const ONE_OFF_CONTENT = {
  title: 'Due to extremely high demand, all of our one-off box delivery slots are full',
  line1: 'We are working hard to increase capacity to make one-off delivery slots available and cannot apologise enough for this inconvenience.',
  line2: 'Unfortunately our customer care team can\'t place orders for you.',
  line3: 'If you’d like to learn more please ',
  urlLabel: 'visit here.',
  line4: '',
}

const SIGNUP_CONTENT = {
  title: 'Unfortunately all our delivery slots are now full.',
  line1: 'We are working hard to increase capacity to be able to welcome more new customers every week and cannot apologise enough for this inconvenience.',
  line2: 'If you are unable to sign up today, please check again in a few days or weeks, as we will open up delivery slots as soon as they become available.',
  line3: 'You can also ',
  urlLabel: 'visit this page',
  line4: ' to leave your details and we’ll let you know as soon as you can place your order.',
}

const CapacityInfo = ({ userId }) => {
  let content = SIGNUP_CONTENT
  let url = 'https://cook.gousto.co.uk/coronavirus-3/'

  if (userId) {
    content = ONE_OFF_CONTENT
    url = addUserIdToUrl(zendeskRoutes.covid, userId)
  }

  return (
    <div className={css.contentWrapper}>
      <span className={css.iconNoSlotAvailable} />
      <Heading type="h3" size="large">{content.title}</Heading>
      <p>{content.line1}</p>
      <p><strong>{content.line2}</strong></p>
      <p>
        {content.line3}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content.urlLabel}
        </a>
        {content.line4}
      </p>
    </div>
  )
}

CapacityInfo.propTypes = {
  userId: PropTypes.string,
}

CapacityInfo.defaultProps = {
  userId: null,
}

export {
  CapacityInfo
}
