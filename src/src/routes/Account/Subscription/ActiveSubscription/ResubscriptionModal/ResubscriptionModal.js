import React, { useContext } from 'react'
import { CTA, Modal, ModalHeader } from 'goustouicomponents'
import { browserHistory } from 'react-router'

import { getFirstName } from '../../context/selectors/currentUser'
import { getShowResubscriptionModal } from '../../context/selectors/subscription'
import { SubscriptionContext } from '../../context'
import { actionTypes } from '../../context/reducers'
import css from './ResubscriptionModal.module.css'

export const ResubscriptionModal = () => {
  const { dispatch, state } = useContext(SubscriptionContext)
  const showResubscriptionModal = getShowResubscriptionModal(state)
  const firstName = getFirstName(state)

  const handleHideResubscriptionModal = () => {
    dispatch({
      type: actionTypes.SUBSCRIPTION_HIDE_RESUBSCRIPTION_MODAL
    })
  }

  const handleCTAClick = () => {
    handleHideResubscriptionModal()
    browserHistory.push('/menu')
  }

  return (
    <Modal
      withOverlay
      isOpen={showResubscriptionModal}
      name="resubscription-modal"
      description="Resubscription modal"
      handleClose={handleHideResubscriptionModal}
      variant="floating"
      animated={false}
    >
      <div className={css.backgroundHeader} />
      <div className={css.headerWrapper}>
        <ModalHeader
          align="left"
          data-testing="resub-modal-header"
        >
          {`${firstName}, you're a subscriber`}
        </ModalHeader>
      </div>

      <div className={css.container}>
        <div className={css.copy}>
          <p>
            You&apos;re now
            {' '}
            <b>saving</b>
            {' '}
            on every repeat order.
          </p>
          <p>
            Open our menu to choose the recipes for your next box.
          </p>
        </div>

        <CTA
          variant="primary"
          onClick={handleCTAClick}
          isFullWidth
          data-testing="choose-recipes-cta"
        >
          Choose recipes
        </CTA>
      </div>
    </Modal>
  )
}
