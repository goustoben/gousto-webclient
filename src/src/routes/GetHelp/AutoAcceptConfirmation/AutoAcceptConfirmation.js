import React from 'react'
import PropTypes from 'prop-types'
import { BottomFixedContent, Card, CTA, Alert } from 'goustouicomponents'
import Svg from 'Svg'
import { client } from 'config/routes'
import Link from 'components/Link'
import { GetHelpLayout2 } from '../layouts/GetHelpLayout2'
import { GetHelpFAQ } from '../components/GetHelpFAQ/GetHelpFAQ'
import layoutCss from '../layouts/GetHelpLayout2/GetHelpLayout2.css'
import css from './AutoAcceptConfirmation.css'

const IS_AUTO_ACCEPT = true

const AutoAcceptConfirmation = ({
  creditAmount,
  issuesIDs,
  nameFirst,
  totalCreditAmount,
  trackConfirmationCTA,
  trackIngredientsGetInTouchClick,
  trackRefundFAQClick
}) => {
  const onClickFAQ = (articleName) => {
    trackRefundFAQClick({
      compensationAmount: creditAmount,
      articleName,
      isAutoAccept: IS_AUTO_ACCEPT,
    })
  }

  const isMultiComplaint = Boolean(totalCreditAmount)

  const headingText = issuesIDs.length > 1
    ? `We’re so sorry to hear about your ${issuesIDs.length} issues with your ingredients`
    : 'We’re so sorry to hear about your issue with your ingredient'

  return (
    <GetHelpLayout2 headingText={headingText} hasBackButton={false}>
      <Card
        hasLateralBordersOnSmallScreens={false}
        className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
      >
        <p>
          {nameFirst}
          , we’ve gone ahead and added
          {isMultiComplaint && ' an additional'}
          {' '}
          <strong>
            £
            {creditAmount}
          </strong>
          {' '}
          credit to your account as an apology
          {
            isMultiComplaint && ', bringing your'
          }
          { isMultiComplaint
          && <strong>{` total compensation to £${totalCreditAmount}`}</strong>}
          .
          This will be automatically taken off your next order.
        </p>
        <Alert type="success" hasIcon={false}>
          <div className={css.alertContent}>
            <div className={css.alertIconWrapper}>
              <Svg fileName="icon-pound" className={css.alertIcon} />
            </div>
            <p className={css.alertText}>
              {isMultiComplaint && 'Extra '}
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
      <div className={css.extraInfo}>
        <p className={css.extraInfoText}>
          <strong>Need more help?</strong>
          {' '}
          If you have any further questions please get in touch with our team.
        </p>
        <Link
          className={css.getInTouchLink}
          clientRouted
          to={`${client.getHelp.index}/${client.getHelp.contact}`}
          tracking={() => trackIngredientsGetInTouchClick()}
        >
          Get in touch
        </Link>
      </div>
      <BottomFixedContent>
        <CTA
          testingSelector="doneCTA"
          isFullWidth
          size="small"
          onClick={() => {
            trackConfirmationCTA()
            window.location.assign(client.myGousto)
          }}
        >
          Done
        </CTA>
      </BottomFixedContent>
    </GetHelpLayout2>
  )
}

AutoAcceptConfirmation.propTypes = {
  creditAmount: PropTypes.number.isRequired,
  issuesIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  nameFirst: PropTypes.string.isRequired,
  totalCreditAmount: PropTypes.number.isRequired,
  trackConfirmationCTA: PropTypes.func.isRequired,
  trackIngredientsGetInTouchClick: PropTypes.func.isRequired,
  trackRefundFAQClick: PropTypes.func.isRequired,
}

export {
  AutoAcceptConfirmation
}
