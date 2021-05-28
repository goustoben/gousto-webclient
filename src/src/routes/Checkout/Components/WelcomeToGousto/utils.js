import React, { Fragment } from 'react'
import moment from 'moment'
import css from './WelcomeToGousto.module.css'

const DATE_FORMAT = 'YYYY-MM-DD'
const MONTH_NAME_SHORT = 'MMM'
const DAY_OF_MONTH = 'DD'
const DAY_OF_WEEK = 'ddd'

export const isValidDate = (date) => (date && date.length) || typeof date === 'object'

export const eventsList = (whenCutoff, deliveryDate) => {
  const humanCutOffDate = moment(whenCutoff, DATE_FORMAT).format('dddd Do MMMM')
  const secondBoxCutOff = moment(deliveryDate, DATE_FORMAT).add(4, 'days')
  const secondBoxDelivery = moment(deliveryDate, DATE_FORMAT).add(7, 'days')

  return [
    {
      id: 'now',
      meta: {
        label: 'Now!',
      },
      body: {
        title: '1st box selection',
        details: (
          <Fragment>
            Choose your recipes before{' '}
            <span className={css.boldDate}>12pm on {humanCutOffDate}</span>. If you miss this, we’ll
            choose for you.
          </Fragment>
        ),
      },
    },
    {
      id: 'first-box-delivery',
      meta: {
        head: moment(deliveryDate, DATE_FORMAT).format(MONTH_NAME_SHORT),
        date: moment(deliveryDate, DATE_FORMAT).format(DAY_OF_MONTH),
        day: moment(deliveryDate, DATE_FORMAT).format(DAY_OF_WEEK),
      },
      body: {
        title: '1st box delivery',
        details: (
          <Fragment>
            Changes can be made until{' '}
            <span className={css.boldDate}>12pm on {humanCutOffDate}</span>.
          </Fragment>
        ),
      },
    },
    {
      id: 'second-box-cutoff',
      meta: {
        head: secondBoxCutOff.format(MONTH_NAME_SHORT),
        date: secondBoxCutOff.format(DAY_OF_MONTH),
        day: secondBoxCutOff.format(DAY_OF_WEEK),
      },
      body: {
        title: '2nd box cut-off',
        details: (
          <Fragment>
            Choose your recipes before{' '}
            <span className={css.boldDate}>12pm on {secondBoxCutOff.format('dddd Do MMMM')}</span>{' '}
            (don’t worry we’ll remind you). If you miss this, we’ll choose for you.
          </Fragment>
        ),
      },
    },
    {
      id: 'second-box-delivery',
      meta: {
        head: secondBoxDelivery.format(MONTH_NAME_SHORT),
        date: secondBoxDelivery.format(DAY_OF_MONTH),
        day: secondBoxDelivery.format(DAY_OF_WEEK),
      },
      body: {
        title: '2nd box delivery',
        details: (
          <Fragment>
            Your <span className={css.boldDate}>weekly</span> boxes will arrive every{' '}
            {moment(deliveryDate, DATE_FORMAT).format('dddd')} and you can get get tracking
            information on the day.
          </Fragment>
        ),
      },
    },
  ]
}

export const transformSubHeadDate = (deliveryDate) =>
  moment(deliveryDate, DATE_FORMAT).format('dddd Do MMMM')
