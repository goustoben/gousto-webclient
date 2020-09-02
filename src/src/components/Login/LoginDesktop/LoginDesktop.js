import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const LoginDesktop = ({ children }) => (
  <div>
    {children}
  </div>
)

LoginDesktop.propTypes = propTypes

export {
  LoginDesktop
}
