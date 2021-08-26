import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { BoxDescriptorsPropType } from 'routes/BoxPrices/boxPricesPropTypes'
import { signupConfig } from 'config/signup'
import { Benefits } from 'routes/Home/Benefits'
import { BoxPricesTabs } from 'routes/BoxPrices/BoxPricesTabs'
import { BoxPriceSuitableForSection } from 'routes/BoxPrices/BoxPriceBlock/BoxPriceSuitableForSection'
import { PricePerNRecipesTable } from './PricePerNRecipesTable'
import { PrimaryButton } from '../PrimaryButton'
import css from './GoustoOnDemandBoxSizeContent.css'

export const GoustoOnDemandBoxSizeContent = ({
  onPrimaryButtonClick,
  numPersonsToBoxDescriptors,
  isLoadingPrices,
  goustoOnDemandCustomText,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const { boxSizeTypes } = signupConfig.boxSizeStep

  const tabLabels = boxSizeTypes.map(({ heading }) => heading)

  return (
    <div>
      <div className={css.goustoOnDemandCustomText}>{goustoOnDemandCustomText}</div>
      <div className={css.tabsContainer}>
        <BoxPricesTabs
          activeIndex={activeIndex}
          labels={tabLabels}
          setActiveIndex={setActiveIndex}
        />
      </div>
      <div className={css.boxSizeCards}>
        {boxSizeTypes.map(({ heading, ctaText, value }, index) => {
          const boxDescriptors = numPersonsToBoxDescriptors[value]

          return (
            <div
              className={classNames(css.goustoOnDemandBoxSizeItem, {
                [css.isActive]: activeIndex === index,
              })}
              key={`box-size-for-${value}`}
            >
              <h2 className={css.goustoOnDemandBoxSizeItemHeading}>{heading}</h2>
              <BoxPriceSuitableForSection numPersons={value} />
              <PricePerNRecipesTable
                boxDescriptors={boxDescriptors}
                isLoadingPrices={isLoadingPrices}
              />
              <PrimaryButton
                value={value}
                onPrimaryButtonClick={onPrimaryButtonClick}
                ctaText={ctaText}
              />
            </div>
          )
        })}
      </div>
      <Benefits isCentered byId="freeDelivery" fontStyleBody />
    </div>
  )
}

GoustoOnDemandBoxSizeContent.propTypes = {
  onPrimaryButtonClick: PropTypes.func.isRequired,
  numPersonsToBoxDescriptors: PropTypes.objectOf(BoxDescriptorsPropType).isRequired,
  isLoadingPrices: PropTypes.bool.isRequired,
  goustoOnDemandCustomText: PropTypes.string.isRequired,
}
