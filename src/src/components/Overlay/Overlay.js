import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import globals from 'config/globals'
import { forceCheck } from 'react-lazyload'
import css from './Overlay.css'

let __scrollFromTop // eslint-disable-line no-underscore-dangle
let __bodyPrevStyle // eslint-disable-line no-underscore-dangle

class Overlay extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    from: PropTypes.string,
    legacy: PropTypes.bool,
    resetScroll: PropTypes.bool,
  }

  static defaultProps = {
    rootId: 'react-root',
    from: 'right',
    resetScroll: false,
  }

  static forceCloseAll() {
    if (globals.client) {
      const nodes = document.querySelectorAll('.__goustoOverlayContainer__')
      if (nodes.length > 0) {
        nodes.forEach(node => {
          Overlay.closeOverlay(node)
        })
      }
    }
  }

  static closeOverlay(nodeOverride) {
    const node = this.node || nodeOverride
    const reactRoot = nodeOverride ? document.getElementById('react-root') : this.reactRoot

    if (reactRoot) {
      reactRoot.setAttribute('style', '')
      reactRoot.className = ''
      if (this.reactRoot) {
        this.reactRoot = null
      }
    }

    if (node) {
      ReactDOM.unmountComponentAtNode(node)
      document.body.removeChild(node)
      if (this.node) {
        this.node = null
      }
    }

    const scrollFromTop = nodeOverride ? __scrollFromTop : this.scrollFromTop
    const bodyPrevStyle = nodeOverride ? __bodyPrevStyle : this.bodyPrevStyle

    document.body.setAttribute('style', bodyPrevStyle)
    document.body.removeAttribute('data-gousto-overlay-open')
    if (this.resetScroll) {
      window.scrollTo(0, 0)
      forceCheck()
    } else {
      window.scrollTo(0, scrollFromTop)
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.open !== newProps.open) {
      if (newProps.open) {
        this.renderOverlay(newProps)
      } else {
        this.fadeOut()
      }
    }
  }

  getDocumentHeight = () => {
    const body = document.body
    const html = document.documentElement

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
  }

  getWindowHeight = () => (window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight)

  fadeOut = () => {
    const overlay = (
      <div className={classNames(this.props.className, css.overlayContainer)}>
        <div className={css.greyFadeOut}>&nbsp;</div>
        <div
          className={classNames(this.props.contentClassName, css[`contentSlideOutFrom${this.props.from}`], css.overlayContent)}
        >
          {this.children}
        </div>
      </div>
    )

    ReactDOM.unstable_renderSubtreeIntoContainer(this, overlay, this.node)
    if (this.reactRoot) {
      this.reactRoot.className = css.reactRootOverlayBlurIn
    }

    setTimeout(Overlay.closeOverlay.bind(this), 500)
  }

  renderOverlay = (props) => {
    if (!this.node) {
      this.scrollFromTop = window.pageYOffset
      this.bodyPrevStyle = document.body.getAttribute('style') || ''
      this.resetScroll = props.resetScroll

      __scrollFromTop = this.scrollFromTop
      __bodyPrevStyle = this.bodyPrevStyle

      if (this.getWindowHeight() < this.getDocumentHeight()) {
        document.body.setAttribute('style', `${this.bodyPrevStyle}; overflow-y: scroll; overflow-x: hidden;`)
      }

      this.reactRoot = document.getElementById(props.rootId)
      if (this.reactRoot) {
        this.reactRoot.className = css.reactRootOverlay
        this.reactRoot.setAttribute('style', `top: -${this.scrollFromTop}px`)
      }

      this.children = props.children

      this.node = document.createElement('div')
      this.node.className = '__goustoOverlayContainer__'
      document.body.setAttribute('data-gousto-overlay-open', 'true')
      document.body.appendChild(this.node)
      const overlay = (
        <div className={classNames(props.className, css.overlayContainer)}>
          <div className={css.grey}>&nbsp;</div>
          <div
            className={classNames(props.contentClassName, css[`contentFrom${this.props.from}`], css.overlayContent)}
          >
            {props.children ? props.children : <span />}
          </div>
        </div>
      )

      ReactDOM.unstable_renderSubtreeIntoContainer(this, overlay, this.node)
      window.scrollTo(0, 0)
    }
  }

  render() {
    return null
  }
}

export default Overlay
