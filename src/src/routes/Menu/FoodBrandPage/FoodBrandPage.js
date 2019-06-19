import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import css from './FoodBrandPage.css'

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  borderColor: PropTypes.string,
}
class FoodBrandPage extends PureComponent {
  getFoodBrangeColor = (borderColor) => ({
    borderBottom: `1px solid ${borderColor}`,
  })
  
  render() {
    const { title, description, borderColor } = this.props

    return (
      <section className={css.foodBrandContainer}>
        <div style={this.getFoodBrangeColor(borderColor)}>
          <div className={css.foodBrandTitleContainer}>
            <span>&#60; Back to All Recipes</span>
            <h1>{title}</h1>
          </div>
          <p className={css.foodBrandDescription}>{description}</p>
        </div>
      </section>
    )
  }
}
FoodBrandPage.propTypes = propTypes

export { FoodBrandPage }
