import PropTypes from 'prop-types'
import React from 'react'

import ModalComponent, { ModalContent, ModalTitle } from 'ModalComponent'

import css from './OnScreenRecovery.css'

import { Title } from './Title'
import { Offer } from './Offer'
import { ValueProposition } from './ValueProposition'
import { Header } from './Header'
import { Footer } from './Footer'

const propTypes = {
  visible: PropTypes.bool,
  orderId: PropTypes.string,
  deliveryDayId: PropTypes.string,
  orderType: PropTypes.string,
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
  getRecoveryContent: PropTypes.func,
  onLoss: PropTypes.func.isRequired,
  onLossCopy: PropTypes.string.isRequired,
  onRecover: PropTypes.func.isRequired,
  onRecoverCopy: PropTypes.string.isRequired,
}

class OnScreenRecovery extends React.PureComponent {

  componentDidUpdate(prevProps) {
    const { triggered, orderId, orderDate, deliveryDayId, orderType, getRecoveryContent } = this.props

    if (triggered && (prevProps.triggered !== triggered)) {
      getRecoveryContent({
        orderId,
        orderDate,
        deliveryDayId,
        status: orderType
      })
    }
  }

  render() {
    const { visible, title, offer, valueProposition, onRecover, onRecoverCopy, onLoss, onLossCopy } = this.props

    return (
      <ModalComponent visible={visible}>
        <Header offer={offer} />
        <div className={css.container}>
          <ModalTitle>
            <Title title={title}/>
          </ModalTitle>
          <ModalContent>
            <Offer offer={offer} />
            {(offer && valueProposition) ? <hr className={css.rule} /> : null}
            <ValueProposition valueProposition={valueProposition} />
          </ModalContent>
          <Footer onRecover={onRecover} onRecoverCopy={onRecoverCopy} onLoss={onLoss} onLossCopy={onLossCopy} />
        </div>
      </ModalComponent>
    )
  }
}

OnScreenRecovery.propTypes = propTypes

export { OnScreenRecovery }
