import React from 'react'
import AirbnbPropTypes from 'airbnb-prop-types'
import css from './Grid.module.css'

const Grid = ({ children }) => (
  <section className={css.grid}>
    {children}
  </section>
)

Grid.propTypes = {
  children: AirbnbPropTypes.componentWithName('Column').isRequired,
}
export { Grid }
