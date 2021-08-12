import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { CTA } from 'goustouicomponents'
import { boxTypesRedesign } from 'routes/BoxPrices/boxPricesConfig'
import { BoxDescriptorsPropType } from '../boxPricesPropTypes'
import { Offer } from './Offer'
import css from './BoxPriceBlock.css'

class BoxPriceBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
    }
  }

  render() {
    const { boxInfo, numPersons, boxPricesBoxSizeSelected, selectedBox } = this.props
    const { selected } = this.state
    const boxType = boxTypesRedesign[numPersons]
    const ctaTitle = `Choose ${boxType.type}`

    function titleCase(string) {
      return string[0].toUpperCase() + string.slice(1).toLowerCase()
    }

    return (
      <div className={numPersons === selectedBox ? css.containerRedesignActive : css.containerRedesign}>
        <div className={css.carouselItem}>
          <h2 className={css.itemHeading}>{titleCase(boxType.type)}</h2>
          <p className={css.suitableTitle}>{boxType.description}</p>
          <ul className={css.list}>
            {boxType.suitable.map((label) => (
              <li key={`for-${label.charAt(0)}`} className={css.listItem}>
                {label}
              </li>
            ))}
          </ul>
          <p className={css.suitableTitle}>Select number of recipes</p>
          <div className={css.buttonGroup}>
            {
              boxInfo.map((item, index) => (
                <button
                  key={item.num_portions}
                  type="button"
                  onClick={() => this.setState({
                    selected: index,
                  })}
                  className={selected === index ? css.boxSizeButtonActive : css.boxSizeButton}
                >
                  {item.num_portions}
                </button>
              ))
            }
          </div>
          {
            (2 - selected > 0) ? (
              <div className={css.selectDescription}>
                {`Select ${2 - selected} more recipe${selected === 1 ? '' : 's'} for the best price`}
              </div>
            ) : (
              <div className={css.selectDescriptionSuccess}>
                You’ve got the best price per portion!
              </div>
            )
          }
          <div className={css.select}>
            <div className={css.selectItem}>
              <span className={css.amount}>
                £
                {boxInfo[selected].total}
              </span>
              <br />
              per box
            </div>
            <div className={css.selectItem}>
              <span className={css.amount}>
                £
                {boxInfo[selected].price_per_portion}
              </span>
              <br />
              per portion
            </div>
          </div>
          <Offer
            icon="truckIcon"
            detailText="Free UK delivery"
            text=", 7 days a week"
          />
          <CTA
            isFullWidth
            onClick={() => boxPricesBoxSizeSelected(numPersons)}
          >
            {ctaTitle}
          </CTA>
          <Offer
            icon="lockInIcon"
            detailText="No lock in"
            text=": pause or cancel for free anytime"
          />
        </div>
      </div>
    )
  }
}

BoxPriceBlock.propTypes = {
  boxInfo: BoxDescriptorsPropType.isRequired,
  numPersons: PropTypes.number.isRequired,
  boxPricesBoxSizeSelected: PropTypes.func,
  selectedBox: PropTypes.number.isRequired,
}

BoxPriceBlock.defaultProps = {
  boxPricesBoxSizeSelected: () => {},
}

export { BoxPriceBlock }
