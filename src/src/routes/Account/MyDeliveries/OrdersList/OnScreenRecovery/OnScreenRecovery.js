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
  getRecoveryContent: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
  confirmCopy: PropTypes.string,
  onKeep: PropTypes.func.isRequired,
  keepCopy: PropTypes.string,
  type: PropTypes.oneOf(['subscription', 'order']),
}

const defaultProps = {
  valueProposition: {
    message:'',
    title: '',
  },
  callToActions:{
    confirm: '',
    keep: '',
  },
  triggered: false,
  confirmCopy: '',
  keepCopy: ''
}

class OnScreenRecovery extends React.PureComponent {

  componentDidUpdate(prevProps) {
    const { triggered, getRecoveryContent } = this.props

    if (triggered && (prevProps.triggered !== triggered)) {
      getRecoveryContent()
    }
  }

  render() {
    const { visible, title, offer, valueProposition, onKeep, keepCopy, onConfirm, confirmCopy, type } = this.props

    return (
      <ModalComponent styleName={css.modalComponent} visible={visible}>
        <Header offer={offer} type={type} />
        <div className={css.container}>
          <ModalTitle>
            <Title title={title}/>
          </ModalTitle>
          <ModalContent>
            <Offer offer={offer} type={type} />
            {(offer && valueProposition) ? <hr className={css.rule} /> : null}
            <ValueProposition valueProposition={valueProposition} />
          </ModalContent>
          <Footer onKeep={onKeep} keepCopy={keepCopy} onConfirm={onConfirm} confirmCopy={confirmCopy} />
        </div>
      </ModalComponent>
    )
  }
}

OnScreenRecovery.propTypes = propTypes

OnScreenRecovery.defaultProps = defaultProps

export { OnScreenRecovery }
