import React from 'react'
import PropTypes from 'prop-types'
import Content from 'containers/Content'
import css from './RAFTitle.css'

const propTypes = {
  title: PropTypes.string,
}

const RAFTitle = ({title}) => (
  <div className={css.rafTitle}>
    <Content contentKeys="rafPageTitle">
      <span>{title}</span>
    </Content>
  </div>
)

RAFTitle.propTypes = propTypes

export { RAFTitle }
