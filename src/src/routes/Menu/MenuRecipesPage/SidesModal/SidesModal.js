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
import { SubIngredients } from '../../Recipe/Detail/SubIngredients/SubIngredients'
import css from './SidesModal.css'
import { SidePropType } from './SidesPropTypes'

const SidesContentFooter = ({
  toggleShowAllergenAndNutrition,
  total,
  onSubmit,
  showAllergenAndNutrition
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
  showAllergenAndNutrition: PropTypes.bool.isRequired
}

const SidesContent = ({
  getQuantityForSide,
  addSide,
  removeSide,
  sides,
}) => (
  <React.Fragment>
    {sides.map(
      side => (
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
                isAvailable
                isAgeVerificationRequired={false}
                limitReached={false}
                onAdd={addSide}
                onRemove={removeSide}
                outOfStock={false}
                productId={side.id}
                qty={getQuantityForSide(side.id)}
              />
            </div>
          </div>
        </div>
      )
    )}
  </React.Fragment>
)

SidesContent.propTypes = {
  getQuantityForSide: PropTypes.func.isRequired,
  addSide: PropTypes.func.isRequired,
  removeSide: PropTypes.func.isRequired,
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

// Note: this method should be replaced with `Object.fromEntries` when supported
const fromEntriesReduce = (memo, [key, value]) => ({
  ...memo,
  [key]: value,
})

const useSidesBasket = (sides, modalOnSubmit) => {
  const [selectedProducts, setSelectedProducts] = React.useState({})
  const getQuantityForSide = (id) => selectedProducts[id] || 0
  const incrementSide = (id, increment) => setSelectedProducts({
    ...selectedProducts,
    ...{ [id]: getQuantityForSide(id) + increment },
  })
  const addSide = (id) => incrementSide(id, 1)
  const removeSide = (id) => incrementSide(id, -1)
  const sideEntries = Object.entries(selectedProducts)
  const getSidePrice = (id) => sides.find(side => side.id === id).list_price
  const total = sideEntries.reduce((memo, [id, qnt]) => getSidePrice(id) * qnt + memo, 0)
  const onSubmit = () => {
    const cleanSelectedProducts = Object.entries(selectedProducts).filter(([, value]) => Boolean(value)).reduce(fromEntriesReduce, {})
    modalOnSubmit(cleanSelectedProducts)
  }

  return { onSubmit, total, addSide, removeSide, getQuantityForSide }
}

export const SidesModal = ({
  sides,
  isOpen,
  onClose,
  onSubmit: modalOnSubmit,
}) => {
  const {
    onSubmit,
    addSide,
    removeSide,
    getQuantityForSide,
    total,
  } = useSidesBasket(sides, modalOnSubmit)
  const [showAllergenAndNutrition, setShowAllergenAndNutrition] = React.useState(false)
  const toggleShowAllergenAndNutrition = () => setShowAllergenAndNutrition(!showAllergenAndNutrition)

  return (
    <Overlay
      open={isOpen}
      from="top"
    >
      <ModalPanel closePortal={onClose} className={css.sidesModalPanelContainer}>
        <ModalHeader align="left" withSeparator>
          {showAllergenAndNutrition
            ? 'Allergens and Nutrition'
            : 'Fancy any sides?'}
        </ModalHeader>
        <div className={classnames([
          css.sideModalForSidesSelections,
          total ? '' : css.sideModalForSidesSelectionsWithSides
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
                getQuantityForSide={getQuantityForSide}
                addSide={addSide}
                removeSide={removeSide}
                onSubmit={onSubmit}
                sides={sides}
                toggleShowAllergenAndNutrition={toggleShowAllergenAndNutrition}
                total={total}
              />
            )}
        </div>
        <SidesContentFooter
          toggleShowAllergenAndNutrition={toggleShowAllergenAndNutrition}
          showAllergenAndNutrition={showAllergenAndNutrition}
          total={total}
          onSubmit={onSubmit}
        />
      </ModalPanel>
    </Overlay>
  )
}

SidesModal.propTypes = {
  sides: PropTypes.arrayOf(SidePropType).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
