import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { hero } from 'routes/BoxPrices/boxPricesConfig'
import Loading from 'Loading'
import { BoxDescriptorsPropType } from './boxPricesPropTypes'
import css from './BoxPrices.css'

import { BoxPricesListRedesignContainer as BoxPricesListRedesign } from './BoxPricesList/BoxPricesListRedesign'
import { BoxPricesContent } from './BoxPricesContent'
import { SelectButton } from './SelectButton'

const BoxPricesRedesign = ({
  loading,
  error,
  boxPricesBoxSizeSelected,
  numPersonsToBoxDescriptors,
}) => {
  const [selectedBox, setSelectedBox] = useState(2)
  const boxes = [2, 4]

  return (
    <Fragment>
      {loading && (
        <div className={css.loadingOverlay}>
          <Loading />
        </div>
      )}
      <div className={loading ? css.loading : ''}>
        <h1
          className={css.header}
        >
          {hero.header}
        </h1>
        {!loading && (
          <Fragment>
            <div className={css.tabs}>
              {boxes.map((item) => (
                <SelectButton
                  text={item === 2 ? 'Regular box' : 'Large box'}
                  selectedBox={selectedBox}
                  setSelectedBox={setSelectedBox}
                  index={item}
                  key={item}
                />
              ))}
            </div>
            <BoxPricesListRedesign
              numPersonsToBoxDescriptors={numPersonsToBoxDescriptors}
              error={error}
              boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
              selectedBox={selectedBox}
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
