import React from 'react'
import { CTA, Modal } from 'goustouicomponents'
import Overlay from 'Overlay'
import { useSendClientMetric } from 'routes/Menu/apis/clientMetrics'
import headerImage from 'media/images/five-recipes/coming-soon.jpg'
import { useFiveRecipesTracking } from 'components/FiveRecipesPaintedDoorTest/useFiveRecipesTracking'
import { experimentFiveRecipesEndOfJourneyClosed, experimentFiveRecipesEndOfJourneyOpened } from 'actions/trackingKeys'
import css from '../FiveRecipesModal.module.css'
import { use5RecipesPaintedDoorTest } from '../use5RecipesPaintedDoorTest'
import { EndOfJourneyNewUserModal } from './EndOfJourneyNewUser'
import { EndOfJourneySubscriptionUserModal } from './EndOfJourneySubscriptionUser'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const FiveRecipesEndOfJourney = ({ isOpen, onClose }: Props) => {
  const sendClientMetric = useSendClientMetric()
  const trackFiveRecipes = useFiveRecipesTracking()
  const { isNewUser, setMenuAsSeen } = use5RecipesPaintedDoorTest()
  const onModalClose = (ev: React.MouseEvent) => {
    ev.stopPropagation()
    setMenuAsSeen()

    trackFiveRecipes(experimentFiveRecipesEndOfJourneyClosed)

    if (isNewUser) {
      sendClientMetric('menu-5-recipes-painted-new-user-end', 1, 'Count')
    } else {
      sendClientMetric('menu-5-recipes-painted-existing-user-end', 1, 'Count')
    }
    onClose()
  }

  React.useEffect(() => {
    if (isOpen) {
      trackFiveRecipes(experimentFiveRecipesEndOfJourneyOpened)
    }
  }, [isOpen])

  return (
    <Overlay open={isOpen} from="top" onBackgroundClick={onModalClose}>
      <div className={css.hideScroll}>
        <Modal
          isOpen={isOpen}
          variant="floating"
          name="coming-soon-five-recipes-modal"
          description="coming soon five recipes modal"
          handleClose={onModalClose}
        >
          <div className={css.container} onClick={(ev) => ev.stopPropagation()}>
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
