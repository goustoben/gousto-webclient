import PropTypes from 'prop-types'
import React from 'react'

import css from './ContentMask.css'

const ContentMask = ({ className, children }) => (
  <div className={className}>
    <div className={css.container}>
      <div className={css.content}>
        {children}
      </div>
    </div>
  </div>
)

ContentMask.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

ContentMask.defaultProps = {
  className: ''
}

export { ContentMask }
