import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'Link'
import Loading from 'Loading'
import { BottomFixedContent, Card, CTA, Heading } from 'goustouicomponents'
import { client as routes } from 'config/routes'
import { GetHelpLayout2 } from '../layouts/GetHelpLayout2'
import { IngredientsListContainer } from './IngredientsList'

import layoutCss from '../layouts/GetHelpLayout2/GetHelpLayout2.css'
import css from './Refund.css'

const propTypes = {
  compensation: PropTypes.shape({
    amount: PropTypes.number,
    totalAmount: PropTypes.number,
    type: PropTypes.string
  }).isRequired,
  createComplaint: PropTypes.func.isRequired,
  isAnyError: PropTypes.bool.isRequired,
  isAnyPending: PropTypes.bool.isRequired,
  isMultiComplaints: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
  }).isRequired,
  numberOfIngredients: PropTypes.number.isRequired,
  numOrdersChecked: PropTypes.number.isRequired,
  numOrdersCompensated: PropTypes.number.isRequired,
  isSsrRepetitiveIssues: PropTypes.bool.isRequired,
  trackIngredientsGetInTouchClick: PropTypes.func.isRequired,
}

const IS_AUTO_ACCEPT = false

const Refund = ({
  compensation,
  createComplaint,
  isAnyError,
  isAnyPending,
  isMultiComplaints,
  numberOfIngredients,
  numOrdersChecked,
  numOrdersCompensated,
  isSsrRepetitiveIssues,
  trackIngredientsGetInTouchClick
}) => {
  const isExperimentAndHasIssuesInCheckedBoxes = isSsrRepetitiveIssues && numOrdersCompensated > 0
  const headingText = [
    "We're so sorry to hear about your ",
    (numberOfIngredients > 1 ? `${numberOfIngredients} ` : ''),
    'ingredient issue',
    (numberOfIngredients > 1 ? 's' : '')
  ].join('')

  const refundCreditText = isMultiComplaints ? (
    <p className={css.confirmationBody}>
      {isExperimentAndHasIssuesInCheckedBoxes ? 'we’d' : 'We would'}
      {' '}
      like to offer you an additional
      {' '}
      <strong className={css.confirmationBodyAmount}>
        £
        {compensation.amount.toFixed(2)}
        {' '}
        credit
      </strong>
      {' '}
      to your account as an apology, bringing your
      <strong className={css.confirmationBodyAmount}>
        {` total compensation to £${compensation.totalAmount.toFixed(2)}.`}
      </strong>
    </p>
  ) : (
    <p className={css.confirmationBody}>
      {isExperimentAndHasIssuesInCheckedBoxes ? 'we’d' : 'We would'}
      {' '}
      like to give you
      {' '}
      <span className={css.confirmationBodyAmount}>
        £
        {compensation.amount.toFixed(2)}
        {' '}
        credit
      </span>
      {' '}
      off your next order as an apology for
      {isExperimentAndHasIssuesInCheckedBoxes ? '' : ' the issues with'}
      :
    </p>
  )

  const showPersonalisedText = () => {
    if (numOrdersChecked === 1 && numOrdersCompensated === 1) {
      return (
        <p>
          Once again, we’re sorry that you’ve had issues with your previous box too.
          We appreciate how inconvenient this is, so
          {' '}
          {refundCreditText}
        </p>
      )
    }

    if (numOrdersChecked > 1 && numOrdersChecked === numOrdersCompensated) {
      return (
        <p>
          Once again, we’re sorry that all of your last
          {' '}
          {numOrdersChecked}
          {' '}
          boxes have had issues. We appreciate how inconvenient this is, so
          {' '}
          {refundCreditText}
        </p>
      )
    }

    return (
      <p>
        Once again, we’re sorry that
        {' '}
        {numOrdersCompensated}
        {' '}
        of your last
        {' '}
        {numOrdersChecked}
        {' '}
        boxes have had issues. We appreciate how inconvenient this is, so
        {' '}
        {refundCreditText}
      </p>
    )
  }

  const getHelpLayoutbody = (isAnyPending || isAnyError)
    ? (
      <p className={css.confirmationBody}>
        There was a problem in getting your refund. Please contact us below, or try again later.
      </p>
    )
    : (
      <Fragment>
        {isExperimentAndHasIssuesInCheckedBoxes
          ? showPersonalisedText()
          : refundCreditText}
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
          onClick={() => createComplaint(IS_AUTO_ACCEPT)}
        >
          Claim
          {' '}
          {isMultiComplaints && 'additional '}
          £
          {compensation.amount.toFixed(2)}
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
            <Card
              hasLateralBordersOnSmallScreens={false}
              className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
            >
              {getHelpLayoutbody}
            </Card>
            <Card
              hasLateralBordersOnSmallScreens={false}
              className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
            >
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
                tracking={trackIngredientsGetInTouchClick}
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
