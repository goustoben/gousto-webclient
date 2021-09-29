import PropTypes from 'prop-types'
import React from 'react'
import { BottomFixedContent, Card, CTA, Alert } from 'goustouicomponents'
import Svg from 'Svg'
import { client as routes } from 'config/routes'
import { GetHelpLayout2 } from '../layouts/GetHelpLayout2'
import { GetHelpFAQ } from '../components/GetHelpFAQ/GetHelpFAQ'
import layoutCss from '../layouts/GetHelpLayout2/GetHelpLayout2.css'
import css from './Confirmation.css'

const propTypes = {
  creditAmount: PropTypes.number.isRequired,
  isMultiComplaints: PropTypes.bool.isRequired,
  issuesIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  nameFirst: PropTypes.string.isRequired,
  trackConfirmationCTA: PropTypes.func.isRequired,
  trackRefundFAQClick: PropTypes.func.isRequired,
}

const Confirmation = ({
  creditAmount,
  isMultiComplaints,
  issuesIDs,
  nameFirst,
  trackConfirmationCTA,
  trackRefundFAQClick
}) => {
  const onClickFAQ = (articleName) => {
    trackRefundFAQClick({
      compensationAmount: creditAmount,
      articleName,
      isAutoAccept: false,
      isMultiComplaints,
    })
  }

  return (
    <GetHelpLayout2 headingText={`${nameFirst}, thanks for your feedback`} hasBackButton={false}>
      <Card
        hasLateralBordersOnSmallScreens={false}
        className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
      >
        <p>
          We really appreciate you letting us know about the issue.
          Credit will be automatically taken off your next order as an apology.
        </p>
        <Alert type="success" hasIcon={false}>
          <div className={css.alertContent}>
            <div className={css.alertIconWrapper}>
              <Svg fileName="icon-pound" className={css.alertIcon} />
            </div>
            <p className={css.alertText}>
              {isMultiComplaints && 'Extra '}
              £
              {creditAmount}
              {' '}
              credit added
            </p>
          </div>
        </Alert>
        <p className={css.creditCopy}>
          Credit can take up to 1 hour to appear in your account.
        </p>
      </Card>
      <GetHelpFAQ onClick={onClickFAQ} issuesIDs={issuesIDs} />
      <BottomFixedContent>
        <CTA
          testingSelector="doneCTA"
          isFullWidth
          size="small"
          onClick={() => {
            trackConfirmationCTA()
            window.location.assign(routes.myGousto)
          }}
        >
          Done
        </CTA>
      </BottomFixedContent>
    </GetHelpLayout2>
  )
}

Confirmation.propTypes = propTypes

export {
  Confirmation
}
