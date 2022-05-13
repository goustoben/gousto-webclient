import React from 'react'
import PropTypes from 'prop-types'
import { Card, CTA, Heading, InfoTip } from 'goustouicomponents'
import Link from 'components/Link'
import configRoutes from 'config/routes'
import { windowOpen } from 'utils/window'
import { OrderDetails } from 'routes/Account/AccountComponents/OrderDetails'
import { myGoustoOrderPropType } from '../../../../GetHelp/getHelpPropTypes'
import { getClientOrderState } from '../../../../GetHelp/utils/orders'

import css from './NextOrder.css'

const NextOrder = ({
  boxTrackingUrl,
  hasDeliveryToday,
  hasTooltip,
  order,
  trackNextBoxTrackingClick,
  trackClickGetHelpWithThisBox,
  maxNumRecipes
}) => {
  const deliveryDate = order.get('deliveryDate')
  const orderId = order.get('id')
  const price = order.getIn(['prices', 'total'])
  const orderClientState = getClientOrderState(
    order.get('state'),
    deliveryDate,
    order.get('recipeItems'),
    order.get('phase')
  )
  const recipeImages = order.get('recipeItems').map((item) => {
    const image = item.get('media').find(
      (mediaItem) => (mediaItem.get('type') === 'mood-image')
    ).getIn(['urls', '1'])

    return ({
      alt: item.get('title', 'Recipe image'),
      src: image.get('src'),
    })
  })

  const CTALabel = hasDeliveryToday
    ? 'Any issues with this box?'
    : 'View my upcoming deliveries'
  const CTALink = hasDeliveryToday
    ? `${configRoutes.client.getHelp.index}?orderId=${order.get('id')}`
    : configRoutes.client.myDeliveries

  const onClick = () => {
    if (hasDeliveryToday) {
      trackClickGetHelpWithThisBox(orderId)
    }
  }

  return (
    <div>
      <div className={css.headingWrapper} data-testing="viewUpcomingDelivery">
        <Heading size="fontStyleM" type="h2">
          {hasDeliveryToday ? 'Today\'s delivery' : 'Upcoming delivery'}
        </Heading>
        {hasDeliveryToday && (
          <Link to={configRoutes.client.myDeliveries} className={css.headingLink} data-testing="viewUpcomingDeliveriesCTA">
            View deliveries
          </Link>
        )}
      </div>
      <Card>
        <OrderDetails
          deliveryDate={deliveryDate}
          orderState={orderClientState}
          price={price}
          recipeImages={recipeImages.toJS()}
          maxRecipesCount={maxNumRecipes}
        />
        <div className={css.ctasWrapper}>
          {boxTrackingUrl && (
            <div className={css.cta}>
              <CTA
                isFullWidth
                onClick={() => {
                  trackNextBoxTrackingClick(orderId)
                  windowOpen(boxTrackingUrl)
                }}
                size="small"
                variant="primary"
              >
                Track my box
              </CTA>
            </div>
          )}
          <div className={css.cta}>
            {hasTooltip && (
              <InfoTip isCloseIconVisible>
                Any issues with this box? Let us know and we&apos;ll sort it out.
              </InfoTip>
            )}
            <Link to={CTALink}>
              <CTA
                isFullWidth
                onClick={onClick}
                size="small"
                variant={boxTrackingUrl || !hasDeliveryToday ? 'secondary' : 'primary'}
                testingSelector="myGoustoNextBoxHelpCTA"
              >
                {CTALabel}
              </CTA>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

NextOrder.propTypes = {
  boxTrackingUrl: PropTypes.string,
  hasDeliveryToday: PropTypes.bool.isRequired,
  hasTooltip: PropTypes.bool.isRequired,
  order: myGoustoOrderPropType.isRequired,
  trackNextBoxTrackingClick: PropTypes.func.isRequired,
  trackClickGetHelpWithThisBox: PropTypes.func.isRequired,
  maxNumRecipes: PropTypes.number
}

NextOrder.defaultProps = {
  boxTrackingUrl: null,
  maxNumRecipes: 4
}

export { NextOrder }
