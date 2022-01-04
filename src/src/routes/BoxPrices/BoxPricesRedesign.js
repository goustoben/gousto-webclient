import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { boxTypesRedesign, getHeroDetails } from 'routes/BoxPrices/boxPricesConfig'
import Loading from 'Loading'
import { boxPricesClickTab } from 'actions/trackingKeys'
import { BoxDescriptorsPropType } from './boxPricesPropTypes'
import { BoxPricesTabs } from './BoxPricesTabs'
import css from './BoxPrices.css'
import { BoxPricesListRedesignContainer as BoxPricesListRedesign } from './BoxPricesList/BoxPricesListRedesign'
import { BoxPricesContent } from './BoxPricesContent'

const BoxPricesRedesign = ({
  loading,
  error,
  boxPricesBoxSizeSelected,
  numPersonsToBoxDescriptors,
  trackUTMAndPromoCode,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const boxTypeConfigsArray = Object.values(boxTypesRedesign)
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
            <BoxPricesListRedesign
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

BoxPricesRedesign.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  boxPricesBoxSizeSelected: PropTypes.func,
  numPersonsToBoxDescriptors: PropTypes.objectOf(BoxDescriptorsPropType),
  trackUTMAndPromoCode: PropTypes.func.isRequired,
}

BoxPricesRedesign.defaultProps = {
  loading: false,
  error: null,
  boxPricesBoxSizeSelected: () => {},
  numPersonsToBoxDescriptors: null,
}

BoxPricesRedesign.contextTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
}

export { BoxPricesRedesign }
