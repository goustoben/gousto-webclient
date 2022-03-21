import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { CTA } from 'goustouicomponents'
import { boxTypesRedesign, ctaRedesign } from 'routes/BoxPrices/boxPricesConfig'
import { Benefits } from 'routes/Home/Benefits'
import { boxPricesClickRecipeNumber } from 'actions/trackingKeys'
import { BoxPriceSuitableForSection } from './BoxPriceSuitableForSection'
import { BoxDescriptorsPropType } from '../boxPricesPropTypes'
import css from './BoxPriceBlock.css'

const BoxPriceBlock = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(2)
  const { boxInfo, numPersons, boxPricesBoxSizeSelected, selectedBox, trackUTMAndPromoCode } = props
  const boxTypeConfig = boxTypesRedesign[numPersons]
  const { title, boxSizeTrackingValue } = boxTypeConfig

  return (
    <div
      className={numPersons === selectedBox ? css.containerRedesignActive : css.containerRedesign}
    >
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
        {2 - selectedIndex > 0 ? (
          <div className={css.selectDescription}>
            {`Select ${2 - selectedIndex} more recipe${
              selectedIndex === 1 ? '' : 's'
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
          <Benefits byId="freeDelivery" isCentered fontStyleS />
        </div>
        <div className={css.ctaContainer}>
          <CTA isFullWidth onClick={() => boxPricesBoxSizeSelected(numPersons)}>
            {ctaRedesign}
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
