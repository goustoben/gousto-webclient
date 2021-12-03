import PropTypes from 'prop-types'
import React from 'react'
import css from './Partial.module.css'

class PartialContainer extends React.PureComponent {
  render() {
    const { visible, children } = this.props

    return <div className={css.container}>{visible && children}</div>
  }
}

PartialContainer.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

export { PartialContainer }
