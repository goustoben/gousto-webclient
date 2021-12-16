import React from 'react'
import { CTA, Modal } from 'goustouicomponents'
import Overlay from 'Overlay'
import css from './FiveRecipesModal.module.css'
import headerImage from 'media/images/five-recipes/five-recipes.jpg'
import { use5RecipesPaintedDoorTest } from './use5RecipesPaintedDoorTest'

export const FiveRecipesStartOfJourneyModal = () => {
    const { isEnabled, hasSeenOnMenu } = use5RecipesPaintedDoorTest()
    const [isOpen, updateIsOpen] = React.useState(isEnabled && !hasSeenOnMenu)
    const onModalClose = () => updateIsOpen(false)

    if (!isOpen) {
        return null
    }

    return (
      <Overlay open={isOpen} from="top">
        <div className={css.hideScroll}>
          <Modal
            isOpen
            variant="floating"
            name="five-recipes-modal"
            description="five recipes modal"
            handleClose={onModalClose}
          >
            <div className={css.container}>
              <img className={css.header} src={headerImage} alt="Hungry for 5 recipes?" />
              <div className={css.contentContainer}>
                <h4 className={css.subHeader}>Hungry for 5 recipes?</h4>
                <p className={css.content}>
                  Give our new feature a try and add a 5th recipe to your next Gousto box for only <strong>£4.08 per serving</strong>.
                </p>
                <CTA
                  size="medium"
                  onClick={onModalClose}
                  variant="primary"
                  isFullWidth
                >
                  Choose my recipes
                </CTA>
              </div>
            </div>
          </Modal>
        </div>
      </Overlay>
    )
}
