import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { getHeroDetails } from 'routes/BoxPrices/boxPricesConfig'
import Loading from 'Loading'
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
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const data = [
    { value: 2, label: 'Regular box' },
    { value: 4, label: 'Large box' },
  ]

  const labels = data.map(({ label }) => label)

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
              setActiveIndex={setActiveIndex}
            />
            <BoxPricesListRedesign
              numPersonsToBoxDescriptors={numPersonsToBoxDescriptors}
              error={error}
              boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
              selectedBox={data[activeIndex].value}
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
