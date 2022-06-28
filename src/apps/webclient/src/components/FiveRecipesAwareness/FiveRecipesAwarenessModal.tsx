import React from 'react'

import Overlay from 'Overlay'
import { CTA, Modal } from 'goustouicomponents'

import { sendClientMetric } from 'routes/Menu/apis/clientMetrics'

import headerImage from 'media/images/five-recipes/five-recipes.png'

import { use5RecipesAwareness } from './use5RecipesAwareness'

import css from './FiveRecipesAwarenessModal.css'

type fiveRecipeBoxPrice = {
  pricePerPortionDiscounted: number
  pricePerPortion: number
}

export const FiveRecipesAwarenessModal = ({
  pricePerPortionDiscounted,
  pricePerPortion,
}: fiveRecipeBoxPrice) => {
  const { isEnabled, hasSeenOnMenu, setMenuAsSeen, isNewUser } = use5RecipesAwareness()
  const [isOpen, updateIsOpen] = React.useState(false)

  React.useEffect(() => {
    if (isEnabled && !hasSeenOnMenu) {
      updateIsOpen(isEnabled && !hasSeenOnMenu)
    }
  }, [isEnabled, hasSeenOnMenu])

  const onModalClose = () => {
    setMenuAsSeen()
    updateIsOpen(false)
    sendClientMetric('menu-five-recipes-awareness-4M-2P', 1, 'Count')
  }

  if (isNewUser || !isOpen) {
    return null
  }

  const price = (pricePerPortionDiscounted || pricePerPortion).toFixed(2)
  const pricePerServing = ` £${price} per serving.`

  return (
    <Overlay open={isOpen} from="top" onBackgroundClick={onModalClose}>
      <div className={css.hideScroll}>
        <Modal
          isOpen={isOpen}
          variant="floating"
          name="five-recipes-modal"
          description="five recipes modal"
          handleClose={onModalClose}
        >
          <div
            className={css.container}
            role="button"
            tabIndex={0}
            onClick={(ev) => ev.stopPropagation()}
            onKeyPress={() => {}}
          >
            <img className={css.header} src={headerImage} alt="Hungry for 5 recipes?" />
            <div className={css.contentContainer}>
              <h4 className={css.subHeader}>Hungry for 5 recipes?</h4>
              <p className={css.content}>
                Monday to Friday, we got you! Give our new feature a try and add a 5th recipe to
                your next Gousto box.
                <strong>{pricePerServing}</strong>
              </p>
              <CTA size="medium" onClick={onModalClose} variant="primary" isFullWidth>
                Show me the menu
              </CTA>
            </div>
          </div>
        </Modal>
      </div>
    </Overlay>
  )
}
