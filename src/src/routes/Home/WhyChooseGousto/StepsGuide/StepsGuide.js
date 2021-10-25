import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getWhyGoustoConfig } from 'config/home'
import css from './StepsGuide.css'

class StepsGuide extends PureComponent {
  renderListItem = (listItem, itemOrder) => (
    <li key={itemOrder} className={css.listItem}>
      <div className={css.tick} />
      {listItem}
    </li>
  )

  renderStep = (step, order) => {
    const { title, img, list } = step

    return (
      <div key={order} className={css.stepContainer}>
        <img src={img} alt={title} className={css.stepImage} />
        <p className={css.stepTitle}>{title}</p>
        <ul className={css.listContainer}>
          {list.map((listItem, itemOrder) => this.renderListItem(listItem, itemOrder))}
        </ul>
      </div>
    )
  }

  render() {
    const { isHomeJpgEnabled } = this.props
    const { steps } = getWhyGoustoConfig(isHomeJpgEnabled)

    return (
      <div className={css.container}>
        {steps.map((step, order) => this.renderStep(step, order))}
      </div>
    )
  }
}

StepsGuide.propTypes = {
  isHomeJpgEnabled: PropTypes.bool,
}

StepsGuide.defaultProps = {
  isHomeJpgEnabled: false,
}

export { StepsGuide }
