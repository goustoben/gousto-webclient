import PropTypes from 'prop-types'
import React from 'react'

import ModalComponent, { ModalContent, ModalTitle } from 'ModalComponent'

import css from './OrderSkipRecovery.css'

import Title from './Title'
import Offer from './Offer'
import ValueProposition from './ValueProposition'
import Header from './Header'
import Footer from './Footer'

const propTypes = {
  visible: PropTypes.bool,
  orderId: PropTypes.string,
  deliveryDayId: PropTypes.string,
  orderType: PropTypes.string,
  keepOrder: PropTypes.func.isRequired,
  cancelPendingOrder: PropTypes.func.isRequired,
  cancelProjectedOrder: PropTypes.func.isRequired,
  title: PropTypes.string,
  offer: PropTypes.object,
  valueProposition: PropTypes.shape({
    message: PropTypes.string,
    title: PropTypes.string,
  }),
  callToActions: PropTypes.shape({
    confirm: PropTypes.string,
    keep: PropTypes.string,
  }),
  triggered: PropTypes.bool,
  orderDate: PropTypes.string,
  getSkipRecoveryContent: PropTypes.func,
}

class OrderSkipRecovery extends React.PureComponent {

  componentDidUpdate(prevProps) {
    const { triggered, orderId, orderDate, deliveryDayId, orderType, getSkipRecoveryContent } = this.props
    const actionTriggered = (orderType === 'pending') ? 'Cancel' : 'Skip'

    if (triggered && (prevProps.triggered !== triggered)) {

      getSkipRecoveryContent({
        orderId,
        orderDate,
        deliveryDayId,
        status: orderType,
        actionTriggered,
      })
    }
  }

  skipCancelOrder(orderId, deliveryDayId, orderType, cancelPendingOrder, cancelProjectedOrder) {
    if (orderType === 'pending') {
      cancelPendingOrder(orderId, deliveryDayId)
    } else {
      cancelProjectedOrder(deliveryDayId)
    }
  }

  render() {
    const { visible, deliveryDayId, orderId, orderType, keepOrder, cancelPendingOrder, cancelProjectedOrder, title, offer, valueProposition, callToActions } = this.props
    const onClickKeepOrder = () => keepOrder({ orderId, deliveryDayId, status: orderType })
    const onClickSkipCancel = () => this.skipCancelOrder(orderId, deliveryDayId, orderType, cancelPendingOrder, cancelProjectedOrder)

    return (
      <ModalComponent visible={visible}>
        <Header offer={offer} />
        <div className={css.container}>
          <ModalTitle>
            <Title title={title} orderType={orderType} />
          </ModalTitle>
          <ModalContent>
            <Offer offer={offer} />
            {(offer && valueProposition) ? <hr className={css.rule} /> : null}
            <ValueProposition valueProposition={valueProposition} />
     </ModalContent>
          <Footer orderType={orderType} callToActions={callToActions} onClickKeepOrder={onClickKeepOrder} onClickSkipCancel={onClickSkipCancel} />
        </div>
      </ModalComponent>
    )
  }
}

OrderSkipRecovery.propTypes = propTypes

export { OrderSkipRecovery }
