import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { CloseIcon } from '../CloseIcon'
import { LayoutContentWrapper } from '../LayoutContentWrapper'
import css from './InfoTip.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
  isCloseIconVisible: PropTypes.bool,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  position: PropTypes.oneOf(['absolute', 'relative']),
  color: PropTypes.oneOf(['darkGrey', 'lightGrey']),
}

const defaultProps = {
  isCloseIconVisible: false,
  maxWidth: 'none',
  minWidth: 'none',
  position: 'absolute',
  color: 'darkGrey',
}

class InfoTip extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isHidden: false,
    }
  }

  addHiddenClass = () => {
    this.setState({ isHidden: true })
  }

  render() {
    const {
      children,
      isCloseIconVisible,
      maxWidth,
      minWidth,
      position,
      color,
    } = this.props
    const { isHidden } = this.state
    const classes = classnames(
      css.infoTipWrapper,
      {
        [css.isHidden]: isHidden,
        [css.positionAbsolute]: position === 'absolute',
        [css.positionRelative]: position === 'relative',
        [css.darkGrey]: color === 'darkGrey',
        [css.lightGrey]: color === 'lightGrey',
      },
    )

    return (
      <div className={classes} style={{ maxWidth, minWidth }}>
        <LayoutContentWrapper>
          { children }
          { isCloseIconVisible && <CloseIcon onClick={this.addHiddenClass} position="top-right" /> }
        </LayoutContentWrapper>
      </div>
    )
  }
}

InfoTip.defaultProps = defaultProps
InfoTip.propTypes = propTypes

export { InfoTip }
