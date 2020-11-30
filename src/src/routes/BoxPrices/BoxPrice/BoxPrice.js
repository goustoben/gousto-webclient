import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import Image from 'Image'
import config from 'config/boxprices'
import BoxInfo from '../BoxInfo'
import { BoxPriceButton } from '../BoxPriceButton/BoxPriceButton'
import css from './BoxPrice.css'

class BoxType extends PureComponent {
  render() {
    const {
      boxInfo,
      numPersons,
      boxPricesBoxSizeSelected
    } = this.props
    const boxType = config.boxTypes[numPersons]

    return (
      <div className={css.container}>
        <h2 className={css.title}>
          {boxType.type}
          &nbsp;box
        </h2>
        <p>{boxType.description}</p>
        <Image media={boxType.image} size={0} />
        <p>Recipes in your box</p>

        <div className={css.boxInfoList}>
          {boxInfo.map((info) => (
            <BoxInfo
              key={`box-info-${numPersons}-${info.num_portions}`}
              numPortions={info.num_portions}
              pricePerPortion={info.price_per_portion}
              totalPrice={info.total}
              numPersons={numPersons}
            />
          ))}
        </div>

        <div className={css.link}>
          <p>
            Delivery is <strong className={css.uppercase}>Free</strong>
          </p>
          <BoxPriceButton
            numPersons={numPersons}
            boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
          >
            <span className={css.uppercase}>{config.cta}</span>
          </BoxPriceButton>
        </div>
      </div>
    )
  }
}

BoxType.propTypes = {
  boxInfo: PropTypes.array.isRequired,
  numPersons: PropTypes.number.isRequired,
  boxPricesBoxSizeSelected: PropTypes.func
}

BoxType.defaultProps = {
  boxPricesBoxSizeSelected: () => {}
}

export default BoxType
