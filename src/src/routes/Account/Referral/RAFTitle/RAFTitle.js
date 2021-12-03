import React from 'react'
import PropTypes from 'prop-types'
import Content from 'containers/Content'
import css from './RAFTitle.module.css'

const RAFTitle = ({title}) => (
  <div className={css.rafTitle}>
    <Content contentKeys="rafPageTitle">
      <h1 className={css.title}>{title}</h1>
    </Content>
  </div>
)

RAFTitle.propTypes = {
  title: PropTypes.string,
}

RAFTitle.defaultProps = {
  title: '',
}

export { RAFTitle }
