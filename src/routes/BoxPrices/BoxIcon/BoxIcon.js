import PropTypes from 'prop-types'
import React from 'react'

import config from 'config/boxprices'
import css from './BoxIcon.css'

class BoxIcon extends React.PureComponent {
  static propTypes = {
    numPersons: PropTypes.number,
    numPortions: PropTypes.number,
  }

  render() {
    const { numPersons, numPortions } = this.props
    const icon = config.icons.find((configIcon) =>
      configIcon.numPersons === numPersons && configIcon.numPortions === numPortions
    )

    return icon && icon.image ? (
      <div className={css.container}>
        <img className={css.icon} src={icon.image} alt={icon.alt} />
      </div>
    ) : null
  }
}

export default BoxIcon
