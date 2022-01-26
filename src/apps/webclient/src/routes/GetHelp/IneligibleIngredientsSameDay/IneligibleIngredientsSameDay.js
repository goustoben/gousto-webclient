import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { client as routes } from 'config/routes'
import { BottomFixedContent, Card, CTA } from 'goustouicomponents'
import Link from 'components/Link'
import { GetHelpLayout2 } from '../layouts/GetHelpLayout2'
import layoutCss from '../layouts/GetHelpLayout2/GetHelpLayout2.css'
import css from './IneligibleIngredientsSameDay.css'

const IneligibleIngredientsSameDay = ({
  ssrTwoComplaintsSameDay,
  trackIngredientsGetInTouchClick,
  trackIngredientsGoToMyGousto,
  trackViewCreditClick,
}) => (
  <GetHelpLayout2 headingText="Ingredients" hasBackButton backUrl={routes.myGousto}>
    <Card
      hasLateralBordersOnSmallScreens={false}
      className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
    >
      {ssrTwoComplaintsSameDay
        ? (
          <Fragment>
            <h2 className={css.heading}>
              We’re so sorry to hear you have another ingredient issue with this box
            </h2>
            <p>
              If you’re trying to find your credit for an ingredient issue you reported earlier today, then you can view your credit&nbsp;
              <Link
                to={routes.myDetails}
                clientRouted={false}
                tracking={trackViewCreditClick}
              >
                here
              </Link>
              .
            </p>
            <p className={css.text}>
              If you’ve had another issue, please contact us through the &apos;Get in touch&apos; button below as we’ll be happy to help.
              Otherwise, you can report it via our website tomorrow.
            </p>
          </Fragment>
        )
        : (
          <Fragment>
            <h2 className={css.heading}>
              You have previously complained about this box earlier today
            </h2>
            <p className={css.text}>
              Unfortunately you can’t complain about the same box twice in one day but if you have any other issues, please let us know the next day.
            </p>
          </Fragment>
        )}
    </Card>
    <BottomFixedContent>
      {ssrTwoComplaintsSameDay && (
        <div className={css.getInTouchCTA}>
          <CTA
            isFullWidth
            onClick={() => {
              trackIngredientsGetInTouchClick()
              window.location.assign(routes.getHelp.contact)
            }}
            size="small"
            variant="secondary"
          >
            Get in touch
          </CTA>
        </div>
      )}
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

IneligibleIngredientsSameDay.propTypes = {
  ssrTwoComplaintsSameDay: PropTypes.bool.isRequired,
  trackIngredientsGetInTouchClick: PropTypes.func.isRequired,
  trackIngredientsGoToMyGousto: PropTypes.func.isRequired,
  trackViewCreditClick: PropTypes.func.isRequired,
}

export {
  IneligibleIngredientsSameDay
}
