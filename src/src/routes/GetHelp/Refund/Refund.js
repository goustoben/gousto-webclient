import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Link from 'Link'
import Loading from 'Loading'
import { BottomFixedContent, Card, CTA, Heading } from 'goustouicomponents'
import { client as routes } from 'config/routes'
import { GetHelpLayout2 } from '../layouts/GetHelpLayout2'
import { IngredientsListContainer } from './IngredientsList'

import css from './Refund.css'

const propTypes = {
  compensation: PropTypes.shape({
    amount: PropTypes.number,
    type: PropTypes.string
  }).isRequired,
  createComplaint: PropTypes.func.isRequired,
  isAnyError: PropTypes.bool.isRequired,
  isAnyPending: PropTypes.bool.isRequired,
  loadRefundAmount: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
  }).isRequired,
  numberOfIngredients: PropTypes.number.isRequired,
  trackIngredientsGetInTouchClick: PropTypes.func.isRequired,
}

const Refund = ({
  compensation,
  createComplaint,
  isAnyError,
  isAnyPending,
  loadRefundAmount,
  numberOfIngredients,
  trackIngredientsGetInTouchClick
}) => {
  useEffect(() => {
    loadRefundAmount()
  }, []) //eslint-disable-line

  const headingText = `We're so sorry to hear about the issue with your ingredient${numberOfIngredients > 1 ? 's' : ''}`
  const getHelpLayoutbody = (isAnyPending || isAnyError)
    ? (
      <p className={css.confirmationBody}>
        There was a problem in getting your refund. Please contact us below, or try again later.
      </p>
    )
    : (
      <Fragment>
        <p className={css.confirmationBody}>
          We would like to give you
          {' '}
          <span className={css.confirmationBodyAmount}>
            £
            {compensation.amount ? compensation.amount.toFixed(2) : ''}
            {' '}
            credit
          </span>
          {' '}
          off your next order as an apology for the issues with:
        </p>
        <IngredientsListContainer />
      </Fragment>
    )

  const acceptButton = (isAnyError)
    ? null
    : (
      <BottomFixedContent>
        <CTA
          testingSelector="claimCTA"
          isFullWidth
          size="small"
          onClick={createComplaint}
        >
          Claim £
          {compensation.amount ? compensation.amount.toFixed(2) : ''}
          {' '}
          credit
        </CTA>
      </BottomFixedContent>
    )

  return (
    <GetHelpLayout2
      headingText={headingText}
      backUrl={`${routes.getHelp.index}/${routes.getHelp.ingredientReasons}`}
    >
      {(isAnyPending)
        ? (
          <div className={css.center}>
            <Loading className={css.loading} />
          </div>
        )
        : (
          <Fragment>
            <Card>
              {getHelpLayoutbody}
            </Card>
            <Card>
              <Heading size="fontStyleM" type="h2">
                Your feedback will help us improve
              </Heading>
              <p className={css.feedbackText}>
                We take this issue very seriously as we know how inconvenient this can be.
                We’ll share your feedback with the relevant team to ensure this doesn’t happen again.
              </p>
            </Card>
            <div className={css.extraInfo}>
              <p className={css.extraInfoText}>
                <strong>
                  Need more help?
                </strong>
                {' '}
                If you have any further questions please get in touch with our team.
              </p>
              <Link
                className={css.getInTouch}
                data-testing="getInTouch"
                to={`${routes.getHelp.index}/${routes.getHelp.contact}`}
                clientRouted
                tracking={() => trackIngredientsGetInTouchClick(compensation.amount, false)}
              >
                Get in touch
              </Link>
            </div>
            {acceptButton}
          </Fragment>
        )}
    </GetHelpLayout2>
  )
}

Refund.propTypes = propTypes

export {
  Refund
}
