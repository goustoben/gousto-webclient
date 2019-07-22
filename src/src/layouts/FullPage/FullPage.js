import PropTypes from 'prop-types'
import React from 'react'
import { Header } from 'Header'
import Footer from 'Footer'

import css from './FullPage.css'

const FullPage = ({ children, route }) => (
  <div className={css.container}>
    <Header />
    {children}
    <Footer type={route.footerType || 'medium'} copyright />
  </div>
)

FullPage.propTypes = {
  children: PropTypes.object.isRequired,
  route: PropTypes.object,
}

FullPage.defaultProps = {
  route: {},
}

export default FullPage
