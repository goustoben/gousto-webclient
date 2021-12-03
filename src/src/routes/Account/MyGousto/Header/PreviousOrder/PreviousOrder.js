import React from 'react'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { Card, CTA, Heading, InfoTip, OrderDetails } from 'goustouicomponents'
import Link from 'components/Link'
import { myGoustoOrderPropType } from '../../../../GetHelp/getHelpPropTypes'
import css from './PreviousOrder.module.css'

const PreviousOrder = ({
  hasDeliveryToday,
  hasTooltip,
  order,
  trackClickGetHelpWithThisBox,
}) => {
  const deliveryDate = order.get('humanDeliveryDate')
  const orderId = order.get('id')
  const orderState = order.get('phase')
  const price = order.getIn(['prices', 'total'])
  const recipeImages = order.get('recipeItems').map((item) => {
    const recipeItemMedia = item.get('media').find(
      (mediaItem) => (mediaItem.get('type') === 'mood-image')
    )
    const image = recipeItemMedia.getIn(['urls', '1'])

    return ({
      alt: item.get('title') || 'Recipe image',
      src: image.get('src'),
    })
  })

  return (
    <div data-testing="getHelpPreviousOrder">
      <Heading size="fontStyleM" type="h2">
        Last delivery
      </Heading>
      <Card>
        <OrderDetails
          deliveryDate={deliveryDate}
          orderState={orderState}
          price={price}
          recipeImages={recipeImages.toJS()}
        />
        <div className={css.linkWrapper}>
          {hasTooltip && (
            <InfoTip isCloseIconVisible>
              Any issues with this box? Let us know and we&apos;ll sort it out.
            </InfoTip>
          )}
          <Link to={`${client.getHelp.index}?orderId=${orderId}`}>
            <CTA
              isFullWidth
              onClick={() => trackClickGetHelpWithThisBox(orderId)}
              size="small"
              testingSelector="PreviousOrderGetHelpCTA"
              variant={hasDeliveryToday ? 'secondary' : 'primary'}
            >
              Any issues with this box?
            </CTA>
          </Link>
        </div>
      </Card>
    </div>
  )
}

PreviousOrder.propTypes = {
  hasDeliveryToday: PropTypes.bool.isRequired,
  hasTooltip: PropTypes.bool.isRequired,
  order: myGoustoOrderPropType.isRequired,
  trackClickGetHelpWithThisBox: PropTypes.func.isRequired,
}

export { PreviousOrder }
