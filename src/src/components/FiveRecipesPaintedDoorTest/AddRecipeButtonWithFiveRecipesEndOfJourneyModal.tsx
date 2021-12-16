import React from 'react'
import { CTA, Modal } from 'goustouicomponents'
import Overlay from 'Overlay'
import css from './FiveRecipesModal.module.css'
import headerImage from 'media/images/five-recipes/coming-soon.jpg'
import buttonCss from './AddRecipeButton.module.css'
import { use5RecipesPaintedDoorTest } from './use5RecipesPaintedDoorTest'
import { useCreateTrackEvent } from '../../hooks/useTracking' 

export const AddRecipeButtonWithFiveRecipesEndOfJourneyModal = () => {
    const trackEvent = useCreateTrackEvent()
    const { setMenuAsSeen } = use5RecipesPaintedDoorTest()
    const [isOpen, updateIsOpen] = React.useState(false)
    const onModalClose = () => {
      updateIsOpen(false)
      setMenuAsSeen()
      trackEvent({
        event: 'five-recipes-modal-closed',
      })
    }
    const openModel = () => updateIsOpen(true)

    return (
      <React.Fragment>
          <button
            className={buttonCss.addButton}
            name="addRecipeButton"
            type="button"
            onClick={openModel}
            onKeyPress={openModel}
            aria-label="Add recipe"
          >
            <span className={buttonCss.buttonText}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line className={buttonCss.addButtonLine} y1="7" x2="14" y2="7" strokeWidth="2" />
                <line x1="7" y1="14" x2="7" stroke="white" strokeWidth="2" />
              </svg>
              <span className={buttonCss.hideOnMobile}>Add recipe</span>
            </span>
          </button>

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
                    <h4 className={css.subHeader}>It’s coming soon...</h4>
                    <p className={css.content}>
                      This is something we’re exploring, so it’s great to see you’re interested. You’re one of the select few who have seen it so far - thanks for helping us learn more.
                    </p>

                    <div className={css.containerForCredit}>
                      <div className={css.containerForThankYou}>
                        <span className={css.thankCopy}>THANK</span>
                        <span className={css.yesCopy}>YOU</span>
                      </div>
                      <span className={css.creditCopy}>
                        We've added <strong>£5 credit</strong> to your Gousto account
                      </span>
                    </div>

                    <span className={css.happyWithChoiceCopy}>Take a look at your basket and make sure you’re happy with your 4 choices.</span>

                    <CTA
                      size="medium"
                      onClick={onModalClose}
                      variant="primary"
                      isFullWidth
                    >
                      Back to menu
                    </CTA>
                  </div>
                </div>
              </Modal>
          </div>
        </Overlay>
      </React.Fragment>
    )
}
