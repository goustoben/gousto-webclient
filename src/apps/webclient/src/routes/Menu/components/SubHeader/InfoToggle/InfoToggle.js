import React from 'react'

import { Tooltip } from 'goustouicomponents'
import PropTypes from 'prop-types'

import css from './InfoToggle.css'

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export class InfoToggle extends React.Component {
  constructor() {
    super()

    this.state = {
      visible: false,
    }
  }

  toggleVisibility = (visible) => {
    this.setState({ visible })
  }

  message = () => {
    const { children } = this.props

    return (
      <div className={css.message}>
        <span className={css.close} onClick={() => this.toggleVisibility(false)} />
        {children[1]}
      </div>
    )
  }

  render() {
    const { visible } = this.state
    const { children } = this.props

    return (
      <Tooltip
        placement="bottom"
        message={this.message()}
        visible={visible}
        onVisibleChange={this.toggleVisibility}
        triggers={['click']}
      >
        <span className={css.title}>{children[0]}</span>
      </Tooltip>
    )
  }
}

InfoToggle.propTypes = propTypes
