import PropTypes from 'prop-types'
import React from 'react'
import ModalPanel from 'Modal/ModalPanel'
import Loading from 'Loading'
import css from './Screen.css'
import ReasonsScreen from '../ReasonsScreen'
import GenericScreen from '../GenericScreen'
import PendingOrderReminder from '../PendingOrderReminder'

const SubscriptionPauseScreen = ({ closeModal, enableBack, onGoBack, pending, screenData, type }) => {
  function renderContent() {
    if (pending) {
      return <div className={css.loading}><Loading /></div>
    }

    switch (type) {
    case 'reasonGrid':
    case 'reasonList':
      return (
          <ReasonsScreen {...screenData} />
      )
    case 'pausedPendingBoxes':
      return (
          <PendingOrderReminder {...screenData} />
      )
    default:
      return (
          <GenericScreen {...screenData} />
      )
    }
  }

  return (
    <ModalPanel
      className={css.modal}
      closePortal={closeModal}
      containerClassName={css.container}
      disableOverlay
      onGoBack={!pending && enableBack ? onGoBack : undefined}
    >
      {!pending && screenData.preTitle && <span className={css.preTitle}>{screenData.preTitle}</span>}
      {!pending && screenData.title && <h1 className={css.title}>{screenData.title}</h1>}
      <div className={css.content}>
        {renderContent()}
      </div>
    </ModalPanel>
  )
}

SubscriptionPauseScreen.propTypes = {
  closeModal: PropTypes.func,
  enableBack: PropTypes.bool,
  onGoBack: PropTypes.func,
  pending: PropTypes.bool,
  screenData: PropTypes.shape({
    preTitle: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  }),
  type: PropTypes.string,
}

SubscriptionPauseScreen.defaultProps = {
  closeModal: () => {},
  enableBack: false,
  pending: false,
  screenData: {
    preTitle: '',
    title: '',
  },
  type: 'reasonList',
}

export default SubscriptionPauseScreen
