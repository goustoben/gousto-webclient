import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FloatCardPresentation } from './FloatCard.presentation'

const propTypes = {
  closeIcon: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['small-screens-only']),
  ]),
  children: PropTypes.node.isRequired,
  onCloseIconClick: PropTypes.func,
  offsetVertical: PropTypes.string,
}

const defaultProps = {
  closeIcon: true,
  onCloseIconClick: () => {},
  offsetVertical: '1rem',
}

class FloatCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isHidden: false,
    }
  }

  onClick = (onCloseIconClick) => {
    this.setState({ isHidden: true })

    onCloseIconClick()
  }

  render() {
    const {
      closeIcon, children, onCloseIconClick, offsetVertical,
    } = this.props
    const { isHidden } = this.state

    return (
      <FloatCardPresentation
        closeIcon={closeIcon}
        isHidden={isHidden}
        offsetVertical={offsetVertical}
        onClick={() => { this.onClick(onCloseIconClick) }}
      >
        {children}
      </FloatCardPresentation>
    )
  }
}

FloatCard.defaultProps = defaultProps
FloatCard.propTypes = propTypes

export {
  FloatCard,
}
