import PropTypes from 'prop-types'
import React from 'react'
import { Button, Segment } from 'goustouicomponents'
import Image from 'Image'
import config from 'config/boxprices'
import { BoxTypePrices } from '../BoxTypePrices/BoxTypePrices'
import css from './BoxType.css'

class BoxType extends React.PureComponent {
  clickBoxPriceGetStarted = () => {
    const { goToStep, basketNumPortionChange, numPersons } = this.props
    basketNumPortionChange(numPersons)
    goToStep('postcode')
  }

  render() {
    const { boxInfo, numPersons } = this.props
    const boxType = config.boxTypesRedesign[numPersons]

    return (
      <div className={css.container}>
        <Image media={boxType.image} size={0} />
        <div className={css.boxWrapper}>
          <h2 className={css.title}>
            {numPersons}
            people
          </h2>
          <p className={css.subtitle}>{boxType.description}</p>

          <div className={css.boxInfoList}>
            {boxInfo.map(info => (
              <BoxTypePrices
                key={`box-info-${numPersons}-${info.num_portions}`}
                numPortions={info.num_portions}
                totalPrice={info.total}
                numPersons={numPersons}
              />
            ))}
          </div>

          <p className={css.portionsSign}>
            {numPersons}
            portions per recipe
          </p>

          <ul className={css.list}>
            <li className={css.listItem}>
              <span className={css.tick} />
              New menu of 50+ recipes each week
            </li>
            <li className={css.listItem}>
              <span className={css.tick} />
              Delicious meals for every occasion
            </li>
            <li className={css.listItem}>
              <span className={css.tick} />
              All recipes triple-tested by our chefs
            </li>
          </ul>

          <Button width="full" data-testing={`boxPricefor${numPersons}Persons`}>
            <Segment onClick={this.clickBoxPriceGetStarted}>{config.ctaRedesign}</Segment>
          </Button>

          <p className={css.deliverySign}>Free delivery available</p>
        </div>
      </div>
    )
  }
}

BoxType.propTypes = {
  boxInfo: PropTypes.oneOfType([PropTypes.array]),
  numPersons: PropTypes.number,
  goToStep: PropTypes.func,
  basketNumPortionChange: PropTypes.func
}

BoxType.defaultProps = {
  boxInfo: [],
  numPersons: 2,
  goToStep: () => {},
  basketNumPortionChange: () => {}
}

export { BoxType }
