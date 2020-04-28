import React from 'react'
import { Heading } from 'goustouicomponents'
import { zendesk as zendeskRoutes } from 'config/routes'
import css from './CapacityInfo.css'

const CONTENT = {
  title: 'Due to exremely high demand, all of our one-off box delivery slots are full',
  line1: 'We are working hard to increase capacity to make one-off delivery slots available and cannot apologise enough for this inconvenience.',
  line2: 'Unfortunately our customer care team can\'t place orders for you.',
  line3: 'If you’d like to learn more please ',
  urlLabel: 'visit here.',
}

const CapacityInfo = () => (
  <div className={css.contentWrapper}>
    <span className={css.iconNoSlotAvailable} />
    <Heading type="h3" size="large">{CONTENT.title}</Heading>
    <p>{CONTENT.line1}</p>
    <p><strong>{CONTENT.line2}</strong></p>
    <p>
      {CONTENT.line3}
      <a href={zendeskRoutes.faqs} target="_blank" rel="noopener noreferrer">{CONTENT.urlLabel}</a>
    </p>
  </div>
)

export {
  CapacityInfo
}
