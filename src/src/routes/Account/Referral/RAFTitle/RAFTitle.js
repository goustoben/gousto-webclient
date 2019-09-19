import React from 'react'
import PropTypes from 'prop-types'
import Content from 'containers/Content'
import css from './RAFTitle.css'

const RAFTitle = ({title}) => (
  <div className={css.rafTitle}>
    <Content contentKeys="rafPageTitle">
      <span>{title}</span>
    </Content>
  </div>
)

RAFTitle.propTypes = {
  title: PropTypes.string,
}

export { RAFTitle }
