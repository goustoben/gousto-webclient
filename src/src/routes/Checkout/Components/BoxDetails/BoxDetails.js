import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { basketSum } from 'utils/basket'
import moment from 'moment'
import classNames from 'classnames'
import Immutable from 'immutable'
import routes from 'config/routes'
import config from 'config/basket'
import Link from 'Link'
import { getSlotTimes } from 'utils/deliveries'
import { RecipeSummary } from '../RecipeSummary'
import css from './BoxDetails.css'

export const BoxDetails = ({
  maxRecipesNum,
  recipes,
  numPortions,
  isCheckoutOverhaulEnabled,
  date,
  deliveryDays,
  slotId,
}) => {
  const deliveryDate = moment(date).format('dddd Do MMMM')
  const deliveryTime = getSlotTimes({ date, deliveryDays, slotId })

  return (
    <div
      className={classNames(css.boxDetailsContainer, {
        [css.redesignContainer]: isCheckoutOverhaulEnabled,
      })}
      data-testing="checkoutBoxDetailsSection"
    >
      {isCheckoutOverhaulEnabled ? (
        <div className={css.headerWrapper}>
          <h3 className={css.redesignHeader}>
            {isCheckoutOverhaulEnabled ? `Your box (${numPortions} people)` : 'In your box'}
          </h3>
          <span className={css.editOrder}>
            <Link to={routes.client.menu} clientRouted>
              Edit order
            </Link>
          </span>
        </div>
      ) : (
        <h3 className={css.header}>In your box</h3>
      )}
      <RecipeSummary showButton view="boxdetails" />
      {isCheckoutOverhaulEnabled && (
        <Fragment>
          <div className={css.separator} />
          <div className={css.headerWrapper}>
            <h3 className={css.redesignHeader}>Delivery date</h3>
          </div>
          <p className={css.deliveryDate}>{deliveryDate}</p>
          <p className={css.deliveryTime}>{deliveryTime}</p>
        </Fragment>
      )}
      {basketSum(recipes) < maxRecipesNum && !isCheckoutOverhaulEnabled ? (
        <div className={css.text}>
          You get the best value when your box is full with {maxRecipesNum} recipes.&nbsp;
          <Link to={routes.client.menu} clientRouted>
            Add another recipe&nbsp;
            <span className={css.arrowRight} />
          </Link>
        </div>
      ) : null}
    </div>
  )
}

BoxDetails.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.Map),
  maxRecipesNum: PropTypes.number,
  numPortions: PropTypes.number,
  isCheckoutOverhaulEnabled: PropTypes.bool,
  deliveryDays: PropTypes.instanceOf(Immutable.Map).isRequired,
  slotId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

BoxDetails.defaultProps = {
  maxRecipesNum: config.maxRecipesNum,
  recipes: Immutable.Map({}),
  numPortions: 0,
  isCheckoutOverhaulEnabled: false,
}
