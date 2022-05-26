import React, { Fragment, useState } from 'react'

import Loading from 'Loading'
import PropTypes from 'prop-types'

import { boxPricesClickTab } from 'actions/trackingKeys'
import { boxTypes, getHeroDetails } from 'routes/BoxPrices/boxPricesConfig'

import { BoxPricesContent } from './BoxPricesContent'
import { BoxPricesList } from './BoxPricesList'
import { BoxPricesTabs } from './BoxPricesTabs'
import { BoxDescriptorsPropType } from './boxPricesPropTypes'

import css from './BoxPrices.css'

const BoxPricesComponent = ({
  loading,
  error,
  boxPricesBoxSizeSelected,
  numPersonsToBoxDescriptors,
  trackUTMAndPromoCode,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const boxTypeConfigsArray = Object.values(boxTypes)
  const labels = boxTypeConfigsArray.map(({ title }) => title)

  const handleSetActiveTabIndex = (index) => {
    const { boxSizeTrackingValue } = boxTypeConfigsArray[index]
    trackUTMAndPromoCode(boxPricesClickTab, {
      box_size: boxSizeTrackingValue,
    })
    setActiveIndex(index)
  }

  return (
    <Fragment>
      {loading && (
        <div className={css.loadingOverlay}>
          <Loading />
        </div>
      )}
      <div className={loading ? css.loading : ''}>
        <h1 className={css.header}>{getHeroDetails(false).header}</h1>
        {!loading && (
          <Fragment>
            <BoxPricesTabs
              activeIndex={activeIndex}
              labels={labels}
              setActiveIndex={handleSetActiveTabIndex}
            />
            <BoxPricesList
              numPersonsToBoxDescriptors={numPersonsToBoxDescriptors}
              error={error}
              boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
              selectedBox={boxTypeConfigsArray[activeIndex].value}
              trackUTMAndPromoCode={trackUTMAndPromoCode}
            />
          </Fragment>
        )}
        <BoxPricesContent />
      </div>
    </Fragment>
  )
}

BoxPricesComponent.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  boxPricesBoxSizeSelected: PropTypes.func,
  numPersonsToBoxDescriptors: PropTypes.objectOf(BoxDescriptorsPropType),
  trackUTMAndPromoCode: PropTypes.func.isRequired,
}

BoxPricesComponent.defaultProps = {
  loading: false,
  error: null,
  boxPricesBoxSizeSelected: () => {},
  numPersonsToBoxDescriptors: null,
}

export { BoxPricesComponent }
