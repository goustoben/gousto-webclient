import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import Image from 'Image'
import { boxTypes, cta } from 'routes/BoxPrices/boxPricesConfig'
import { BoxInfo } from '../BoxInfo'
import { BoxPriceButton } from '../BoxPriceButton/BoxPriceButton'
import { BoxDescriptorsPropType } from '../boxPricesPropTypes'
import css from './BoxPriceBlock.module.css'

class BoxPriceBlock extends PureComponent {
  render() {
    const { boxInfo, numPersons, boxPricesBoxSizeSelected } = this.props
    const boxType = boxTypes[numPersons]

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
            <span className={css.uppercase}>{cta}</span>
          </BoxPriceButton>
        </div>
      </div>
    )
  }
}

BoxPriceBlock.propTypes = {
  boxInfo: BoxDescriptorsPropType.isRequired,
  numPersons: PropTypes.number.isRequired,
  boxPricesBoxSizeSelected: PropTypes.func,
}

BoxPriceBlock.defaultProps = {
  boxPricesBoxSizeSelected: () => {},
}

export { BoxPriceBlock }
