import React, { FC, MouseEvent } from 'react'
import { CTA, Modal } from 'goustouicomponents'
import Overlay from 'Overlay'
import headerImage from 'media/images/five-recipes/coming-soon.jpg'
import css from '../FiveRecipesModal.module.css'
import { use5RecipesPaintedDoorTest } from '../use5RecipesPaintedDoorTest'
import { EndOfJourneyNewUserModal } from './EndOfJourneyNewUser'
import { EndOfJourneySubscriptionUserModal } from './EndOfJourneySubscriptionUser'
import { useCreateTrackEvent } from '../../../hooks/useTracking'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const FiveRecipesEndOfJourney = ({ isOpen, onClose }: Props) => {
  const trackEvent = useCreateTrackEvent()
  const { isNewUser, setMenuAsSeen } = use5RecipesPaintedDoorTest()
  const onModalClose = (ev: MouseEvent) => {
    ev.stopPropagation()
    setMenuAsSeen()
    trackEvent({
      event: 'five-recipes-modal-closed',
    })
    onClose()
  }

  return (
    <Overlay open={isOpen} from="top">
      <div className={css.hideScroll}>
        <Modal
          isOpen={isOpen}
          variant="floating"
          name="coming-soon-five-recipes-modal"
          description="coming soon five recipes modal"
          handleClose={onModalClose}
        >
          <div className={css.container}>
            <img className={css.header} src={headerImage} alt="5 Recipes are coming soon" />
            <div className={css.contentContainer}>
              {isNewUser ? <EndOfJourneyNewUserModal /> : <EndOfJourneySubscriptionUserModal />}

              <CTA size="medium" onClick={onModalClose} variant="primary" isFullWidth>
                Back to menu
              </CTA>
            </div>
          </div>
        </Modal>
      </div>
    </Overlay>
  )
}
