import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { ModalHeader, CTA } from 'goustouicomponents'
import Overlay from 'Overlay'
import Buttons from 'Product/Buttons'
import Image from 'components/Image'
import Immutable from 'immutable'
import { getAllergenListFromAttributes } from 'Product/Detail/Detail'
import ModalPanel from 'Modal/ModalPanel'
import { SubIngredients } from '../../components/Detail/SubIngredients/SubIngredients'
import css from './SidesModal.css'
import { SidePropType } from './SidesPropTypes'
import { useSidesBasket } from './SidesModal.hook'

const SidesContentFooter = ({
  toggleShowAllergenAndNutrition,
  total,
  onSubmit,
  showAllergenAndNutrition,
  isSubmitting,
}) => (
  <div className={css.sidesModalFooter}>
    <div>
      <button
        type="button"
        className={css.sidesModalLink}
        onClick={toggleShowAllergenAndNutrition}
      >
        {showAllergenAndNutrition
          ? 'Hide Allergens and Nutrition'
          : 'Show Allergens and Nutrition'}
      </button>
      {Boolean(total) && (
        <div className={css.sideModalSidePrice}>
          <span className={css.sideModalSidePriceText}>
            Sides price
          </span>
          <span className={css.sideModalSidePriceValue}>
            {`+£${total.toFixed(2)}`}
          </span>
        </div>
      )}
      <div>
        {total
          ? (
            <CTA
              isFullWidth
              size="medium"
              variant="primary"
              onClick={onSubmit}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Continue with sides
            </CTA>
          )
          : (
            <CTA
              isFullWidth
              size="medium"
              variant="secondary"
              onClick={onSubmit}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Continue without sides
            </CTA>
          )}
      </div>
    </div>
  </div>
)

SidesContentFooter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  toggleShowAllergenAndNutrition: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  showAllergenAndNutrition: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

const SidesContent = ({
  getQuantityForSidesBasket,
  addSide,
  removeSide,
  sides,
  isOutOfStock,
  getLimit,
}) => (
  <React.Fragment>
    {sides.map(
      side => {
        const quantity = getQuantityForSidesBasket(side.id)
        const limit = getLimit(side.id)
        const isOutOfStockForSide = isOutOfStock(side.id)
        const isAvailable = !(isOutOfStockForSide || limit)

        return (
          <div key={side.id} className={css.sidesModalSidesContainer}>
            <div className={css.sidesModalSidesImageContainer}>
              <Image media={Immutable.fromJS(side.images).toList()} className={css.sidesModalSidesImage} title={side.title} />
            </div>
            <div className={css.sidesModalSidesDetails}>
              <h3 className={css.sidesModalSidesHeader}>
                {side.title}
              </h3>
              <span className={css.sidesModalSidesText}>
                {`£${side.list_price} ● 2 Servings`}
              </span>
              <div
                role="button"
                aria-label="Add or Remove Side"
              >
                <Buttons
                  fill
                  fullWidth
                  isAgeVerificationRequired={false}
                  onAdd={addSide}
                  onRemove={removeSide}
                  productId={side.id}
                  outOfStock={isOutOfStockForSide}
                  limitReached={limit}
                  qty={quantity}
                  isAvailable={isAvailable}
                />
              </div>
            </div>
          </div>
        )
      }
    )}
  </React.Fragment>
)

SidesContent.propTypes = {
  getQuantityForSidesBasket: PropTypes.func.isRequired,
  addSide: PropTypes.func.isRequired,
  removeSide: PropTypes.func.isRequired,
  isOutOfStock: PropTypes.func.isRequired,
  getLimit: PropTypes.func.isRequired,
  sides: PropTypes.arrayOf(SidePropType).isRequired,
}

const SidesAllergenAndNutritionContent = ({
  sides,
}) => (
  <div className={css.sideModalForSidesAllergenAndNutrition}>
    {sides.map(
      side => (
        <div key={side.id}>
          <h3 className={css.sideModalInformationHeader}>
            {side.title}
          </h3>
          <SubIngredients
            className={css.sideModalAllergenAndNutritionSideText}
            subIngredients={side.description}
            allergens={getAllergenListFromAttributes(Immutable.fromJS(side.attributes).toList())}
          />
        </div>
      )
    )}
  </div>
)

SidesAllergenAndNutritionContent.propTypes = {
  sides: PropTypes.arrayOf(SidePropType).isRequired,
}

export const SidesModal = ({
  accessToken,
  userId,
  order,
  isOpen,
  onClose,
  onSubmit: onSubmitCallback,
  trackAddSide,
  trackSidesContinueClicked,
  trackViewSidesAllergens,
  trackCloseSidesAllergens,
}) => {
  const {
    sides,
    onSubmit,
    addSide,
    removeSide,
    getQuantityForSidesBasket,
    isOutOfStock,
    getLimit,
    total,
    isSubmitting,
  } = useSidesBasket({
    accessToken,
    userId,
    order,
    onSubmitCallback,
    isOpen,
    trackAddSide,
    trackSidesContinueClicked,
  })
  const hasSides = Boolean(sides.length)
  const [showAllergenAndNutrition, setShowAllergenAndNutrition] = React.useState(false)
  const toggleShowAllergenAndNutrition = () => {
    if (showAllergenAndNutrition) {
      trackCloseSidesAllergens()
      setShowAllergenAndNutrition(false)
    } else {
      trackViewSidesAllergens()
      setShowAllergenAndNutrition(true)
    }
  }
  const onModalClose = () => {
    setShowAllergenAndNutrition(false)
    onClose()
  }

  if (!hasSides) {
    return null
  }

  return (
    <Overlay
      open={isOpen}
      from="top"
      contentClassName={classnames([
        css.overlayContentForMobile,
      ])}
    >
      <ModalPanel closePortal={onModalClose} className={css.sidesModalPanelContainer}>
        <ModalHeader align="left" withSeparator>
          {showAllergenAndNutrition
            ? 'Allergens and Nutrition'
            : 'Fancy any sides?'}
        </ModalHeader>
        <div className={classnames([
          css.sideModalForSidesSelections,
          total ? '' : css.sideModalForSidesSelectionsWithOutSides
        ])}
        >
          {showAllergenAndNutrition
            ? (
              <SidesAllergenAndNutritionContent
                sides={sides}
                toggleShowAllergenAndNutrition={toggleShowAllergenAndNutrition}
              />
            ) : (
              <SidesContent
                getQuantityForSidesBasket={getQuantityForSidesBasket}
                addSide={addSide}
                removeSide={removeSide}
                onSubmit={onSubmit}
                sides={sides}
                toggleShowAllergenAndNutrition={toggleShowAllergenAndNutrition}
                total={total}
                isOutOfStock={isOutOfStock}
                getLimit={getLimit}
              />
            )}
        </div>
        <SidesContentFooter
          toggleShowAllergenAndNutrition={toggleShowAllergenAndNutrition}
          showAllergenAndNutrition={showAllergenAndNutrition}
          total={total}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </ModalPanel>
    </Overlay>
  )
}

SidesModal.propTypes = {
  accessToken: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  order: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  trackAddSide: PropTypes.func.isRequired,
  trackSidesContinueClicked: PropTypes.func.isRequired,
  trackViewSidesAllergens: PropTypes.func.isRequired,
  trackCloseSidesAllergens: PropTypes.func.isRequired,
}
