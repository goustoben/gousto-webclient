import PropTypes from 'prop-types'
import React from 'react'
import { client as routes } from 'config/routes'
import { BottomFixedContent, Card, CTA } from 'goustouicomponents'
import { GetHelpLayout2 } from '../layouts/GetHelpLayout2'
import layoutCss from '../layouts/GetHelpLayout2/GetHelpLayout2.css'
import css from './IneligibleIngredients.css'

const propTypes = {
  ineligibilityCriteria: PropTypes.shape({
    numOrders: PropTypes.number.isRequired,
    numOrdersCompensated: PropTypes.number.isRequired,
  }).isRequired,
  trackIngredientsGetInTouchClick: PropTypes.func.isRequired,
  trackIngredientsGoToMyGousto: PropTypes.func.isRequired,
}

const IneligibleIngredients = ({
  ineligibilityCriteria,
  trackIngredientsGetInTouchClick,
  trackIngredientsGoToMyGousto
}) => {
  const { numOrders, numOrdersCompensated } = ineligibilityCriteria

  return (
    <GetHelpLayout2 headingText="Ingredients" hasBackButton>
      <Card
        hasLateralBordersOnSmallScreens={false}
        className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
      >
        <p>
          <b>
            You have had issues with
            {' '}
            {numOrdersCompensated}
            {' '}
            of your last
            {' '}
            {numOrders}
            {' '}
            boxes
          </b>
        </p>
        <p>
          We’re so sorry to hear that you’re experiencing so many issues with your boxes.
          We just wanted to let you know we’re looking into this to ensure they don’t continue to happen.
          If you’re experiencing more issues with your boxes do not hesitate to get in touch with us.
        </p>
      </Card>
      <BottomFixedContent>
        <div className={css.ineligibleIngredientsGetInTouch}>
          <CTA
            isFullWidth
            size="small"
            onClick={() => {
              trackIngredientsGetInTouchClick()
              window.location.assign(routes.getHelp.contact)
            }}
          >
            Get in Touch
          </CTA>
        </div>
        <CTA
          isFullWidth
          size="small"
          variant="secondary"
          onClick={() => {
            trackIngredientsGoToMyGousto()
            window.location.assign(routes.myGousto)
          }}
        >
          Go to My Nourished
        </CTA>
      </BottomFixedContent>
    </GetHelpLayout2>
  )
}

IneligibleIngredients.propTypes = propTypes

export {
  IneligibleIngredients
}
