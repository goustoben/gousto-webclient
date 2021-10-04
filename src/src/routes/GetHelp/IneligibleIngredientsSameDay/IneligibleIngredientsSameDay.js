import PropTypes from 'prop-types'
import React from 'react'
import { client as routes } from 'config/routes'
import { BottomFixedContent, Card, CTA } from 'goustouicomponents'
import { GetHelpLayout2 } from '../layouts/GetHelpLayout2'
import layoutCss from '../layouts/GetHelpLayout2/GetHelpLayout2.css'

const propTypes = {
  trackIngredientsGoToMyGousto: PropTypes.func.isRequired,
}

const IneligibleIngredientsSameDay = ({ trackIngredientsGoToMyGousto }) => (
  <GetHelpLayout2 headingText="Ingredients" hasBackButton>
    <Card
      hasLateralBordersOnSmallScreens={false}
      className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
    >
      <p>
        <b>
          You have previously complained about this box earlier today
        </b>
      </p>
      <p>
        Unfortunately you can’t complain about the same box twice in one day but if you have any other issues, please let us know the next day.
      </p>
    </Card>
    <BottomFixedContent>
      <CTA
        isFullWidth
        size="small"
        onClick={() => {
          trackIngredientsGoToMyGousto()
          window.location.assign(routes.myGousto)
        }}
      >
        Go to My Gousto
      </CTA>
    </BottomFixedContent>
  </GetHelpLayout2>
)

IneligibleIngredientsSameDay.propTypes = propTypes

export {
  IneligibleIngredientsSameDay
}
