import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { client as routes } from 'config/routes'
import { BottomFixedContent, Card, CTA } from 'goustouicomponents'
import { GetHelpLayout2 } from '../layouts/GetHelpLayout2'
import layoutCss from '../layouts/GetHelpLayout2/GetHelpLayout2.module.css'
import css from './RepetitiveIngredientsIssues.module.css'

const showPersonalisedCopy = (firstName, numOrdersChecked, numOrdersCompensated) => {
  if (numOrdersChecked === 1 && numOrdersCompensated === 1) {
    return {
      heading: `${firstName}, it looks like you've had issues with your previous box too`,
      body: 'We see that you’ve had issues with your previous box too. We’d love to speak to you to get to the bottom of your repetitive issues and make things right.',
    }
  } if (numOrdersChecked > 1 && numOrdersChecked === numOrdersCompensated) {
    return {
      heading: `${firstName}, it looks like you've had issues with all of your last ${numOrdersCompensated} boxes`,
      body: `We see that all of your last ${numOrdersChecked} boxes have had issues.
      We’d love to speak to you to get to the bottom of your repetitive issues and make things right.`,
    }
  }

  return {
    heading: `${firstName}, it looks like you've had issues with ${numOrdersCompensated} of your last ${numOrdersChecked} boxes`,
    body: `We see that ${numOrdersCompensated} out of your last ${numOrdersChecked} boxes have had issues.
      We’d love to speak to you to get to the bottom of your repetitive issues and make things right.`,
  }
}

const RepetitiveIngredientsIssues = ({
  firstName,
  numOrdersChecked,
  numOrdersCompensated,
  params: {
    userId,
    orderId,
  },
  trackIngredientsGetInTouchClick,
  trackContinueToSsrClick,
  updateHasSeenRepetitiveIssuesScreen,
  validateLatestOrder,
}) => {
  useEffect(() => {
    updateHasSeenRepetitiveIssuesScreen(true)
  }, [updateHasSeenRepetitiveIssuesScreen])

  useEffect(() => {
    validateLatestOrder({ orderId, costumerId: userId })
  }, [userId, orderId, validateLatestOrder])

  const { heading, body } = showPersonalisedCopy(firstName, numOrdersChecked, numOrdersCompensated)

  return (
    <GetHelpLayout2
      hasBackButton
      backUrl={routes.myGousto}
      headingText={heading}
    >
      <Card
        hasLateralBordersOnSmallScreens={false}
        className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
      >
        <p>
          {body}
        </p>
      </Card>
      <BottomFixedContent>
        <div className={css.getInTouchCTA}>
          <CTA
            isFullWidth
            size="small"
            onClick={() => {
              trackIngredientsGetInTouchClick()
              browserHistory.push(`${routes.getHelp.index}/${routes.getHelp.contact}`)
            }}
          >
            Get in touch
          </CTA>
        </div>
        <CTA
          isFullWidth
          size="small"
          variant="secondary"
          onClick={() => {
            trackContinueToSsrClick()
            browserHistory.push(`${routes.getHelp.ingredients({ userId, orderId })}`)
          }}
        >
          Continue on web
        </CTA>
      </BottomFixedContent>
    </GetHelpLayout2>
  )
}

RepetitiveIngredientsIssues.propTypes = {
  firstName: PropTypes.string.isRequired,
  numOrdersChecked: PropTypes.number.isRequired,
  trackIngredientsGetInTouchClick: PropTypes.func.isRequired,
  trackContinueToSsrClick: PropTypes.func.isRequired,
  numOrdersCompensated: PropTypes.number.isRequired,
  params: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  updateHasSeenRepetitiveIssuesScreen: PropTypes.func.isRequired,
  validateLatestOrder: PropTypes.func.isRequired,
}

export {
  RepetitiveIngredientsIssues
}

