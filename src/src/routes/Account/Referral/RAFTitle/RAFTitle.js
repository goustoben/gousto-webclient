import React from 'react'
import Content from 'containers/Content'
import css from './RAFTitle.css'

const RAFTitle = () => (
  <div className={css.rafTitle}>
    <Content contentKeys="rafPageTitle">
      <span>Invite your friends to try out Gousto!</span>
    </Content>
  </div>
)

export { RAFTitle }
