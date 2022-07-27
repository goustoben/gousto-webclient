import React, { useState } from 'react'

import { CTA } from 'goustouicomponents'
import PropTypes from 'prop-types'

import { boxPricesClickRecipeNumber } from 'actions/trackingKeys'
import { useIsFiveRecipesEnabled } from 'hooks/useIsFiveRecipesEnabled'
import { boxTypes, cta } from 'routes/BoxPrices/boxPricesConfig'
import { Benefits } from 'routes/Home/Benefits'
import { useBasket } from 'routes/Menu/domains/basket'

import { BoxDescriptorsPropType } from '../boxPricesPropTypes'
import { BoxPriceSuitableForSection } from './BoxPriceSuitableForSection'

import css from './BoxPriceBlock.css'

const BoxPriceBlock = ({
  boxInfo,
  numPersons,
  boxPricesBoxSizeSelected,
  selectedBox,
  trackUTMAndPromoCode,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(boxInfo.length - 1)
  const { numPortions } = useBasket()
  const { isFiveRecipesEnabled } = useIsFiveRecipesEnabled(numPortions)
  const { title, boxSizeTrackingValue } = boxTypes[numPersons]

  const recipesLeftTrackingIndex = boxSizeTrackingValue !== 'large' && isFiveRecipesEnabled ? 3 : 2

  return (
    <div className={numPersons === selectedBox ? css.containerActive : css.container}>
      <div className={css.carouselItem}>
        <h2 className={css.itemHeading}>{title}</h2>
        <BoxPriceSuitableForSection numPersons={numPersons} />
        <p className={css.subhead}>Select number of recipes</p>
        <div className={css.buttonGroup}>
          {boxInfo.map((item, index) => {
            const numRecipes = item.num_portions

            return (
              <button
                key={numRecipes}
                type="button"
                onClick={() => {
                  trackUTMAndPromoCode(boxPricesClickRecipeNumber, {
                    box_size: boxSizeTrackingValue,
                    number_of_recipes: numRecipes,
                  })
                  setSelectedIndex(index)
                }}
                className={selectedIndex === index ? css.boxSizeButtonActive : css.boxSizeButton}
              >
                {numRecipes}
              </button>
            )
          })}
        </div>
        {recipesLeftTrackingIndex - selectedIndex > 0 ? (
          <div className={css.selectDescription}>
            {`Select ${recipesLeftTrackingIndex - selectedIndex} more recipe${
              selectedIndex === 2 ? '' : 's'
            } for the best price`}
          </div>
        ) : (
          <div className={css.selectDescriptionSuccess}>You’ve got the best price per portion!</div>
        )}
        <div className={css.select}>
          <div className={css.selectItem}>
            <span className={css.amount}>£{boxInfo[selectedIndex].total}</span>
            <br />
            per box
          </div>
          <div className={css.selectItem}>
            <span className={css.amount}>£{boxInfo[selectedIndex].price_per_portion}</span>
            <br />
            per portion
          </div>
        </div>
        <div className={css.benefitContainer}>
          <Benefits byId="paidDelivery" isCentered fontStyleS isReverted />
        </div>
        <div className={css.ctaContainer}>
          <CTA isFullWidth onClick={() => boxPricesBoxSizeSelected(numPersons)}>
            {cta}
          </CTA>
        </div>
        <div className={css.benefitContainer}>
          <Benefits byId="noLockIn" isCentered fontStyleS />
        </div>
      </div>
    </div>
  )
}

BoxPriceBlock.propTypes = {
  boxInfo: BoxDescriptorsPropType.isRequired,
  numPersons: PropTypes.number.isRequired,
  boxPricesBoxSizeSelected: PropTypes.func,
  selectedBox: PropTypes.number.isRequired,
  trackUTMAndPromoCode: PropTypes.func.isRequired,
}

BoxPriceBlock.defaultProps = {
  boxPricesBoxSizeSelected: () => {},
}

export { BoxPriceBlock }
