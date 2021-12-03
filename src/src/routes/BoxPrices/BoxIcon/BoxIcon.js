import PropTypes from 'prop-types'
import React from 'react'

import { icons } from 'routes/BoxPrices/boxPricesConfig'
import css from './BoxIcon.module.css'

class BoxIcon extends React.PureComponent {
  render() {
    const { numPersons, numPortions } = this.props
    const icon = icons.find(
      (configIcon) => configIcon.numPersons === numPersons && configIcon.numPortions === numPortions
    )

    return icon && icon.image ? (
      <div className={css.container}>
        <img className={css.icon} src={icon.image} alt={icon.alt} />
      </div>
    ) : null
  }
}

BoxIcon.propTypes = {
  numPersons: PropTypes.number.isRequired,
  numPortions: PropTypes.number.isRequired,
}

export { BoxIcon }
