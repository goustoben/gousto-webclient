import { Component } from 'react'
import PropTypes from 'prop-types'

import {
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode,
} from 'react-dom'

export class SpotlightWrapper extends Component {
  node = null

  static propTypes = {
    children: PropTypes.element,
  }

  componentDidMount() {
    this.renderWrapper()
  }

  componentDidUnmount() {
    this.close()
  }

  renderWrapper() {
    const { children } = this.props
    const { node } = this

    if (!node) {
      this.node = document.createElement('div')
      this.node.className = '__goustoSpotlight__'
      document.body.appendChild(this.node)

      unstable_renderSubtreeIntoContainer(this, children, this.node)
    }
  }

  close() {
    const { node } = this

    if (node) {
      unmountComponentAtNode(node)
      document.body.removeChild(node)
      if (this.node) {
        this.node = null
      }
    }
  }

  render() {
    return null
  }
}
