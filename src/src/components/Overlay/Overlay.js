import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import globals from 'config/globals'
import { forceCheck } from 'react-lazyload'
import css from './Overlay.css'

let __scrollFromTop // eslint-disable-line no-underscore-dangle
let __bodyPrevStyle // eslint-disable-line no-underscore-dangle

/*
 * Warning - here be dragons
 *
 * This component does NOT update props correctly on its children. Please avoid using this.
 *
 * The example below will not work correctly:
 *
 * const Foo = ({ someValue }) => <Overlay><Bar someProp={someValue} /></Overlay>;
 *
 * <Bar /> will never re-render with an updated value for `someProp`.
 *
 */
class Overlay extends React.PureComponent {
  static closeOverlayForEachNode(nodeOverride) {
    const reactRoot = document.getElementById('react-root')
    reactRoot.setAttribute('style', '')
    reactRoot.className = ''
    if (this.reactRoot) {
      this.reactRoot = null
    }
    ReactDOM.unmountComponentAtNode(nodeOverride)
    document.body.removeChild(nodeOverride)
    if (this.node) {
      this.node = null
    }

    document.body.setAttribute('style', __bodyPrevStyle)
    document.body.removeAttribute('data-gousto-overlay-open')

    const scrollFromTop = this.resetScroll ? 0 : __scrollFromTop
    window.scrollTo(0, scrollFromTop)
    if (this.resetScroll) {
      forceCheck()
    }
  }

  static forceCloseAll() {
    if (globals.client) {
      const nodes = document.querySelectorAll('.__goustoOverlayContainer__')
      if (nodes.length > 0) {
        nodes.forEach(node => {
          Overlay.closeOverlayForEachNode(node)
        })
      }
    }
  }

  componentWillReceiveProps(newProps) {
    const { open } = this.props
    if (open !== newProps.open) {
      if (newProps.open) {
        this.renderOverlay(newProps)
      } else {
        this.fadeOut()
      }
    }
  }

  closeOverlay = () => {
    const { node, reactRoot, scrollFromTop, bodyPrevStyle, resetScroll } = this
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

    document.body.setAttribute('style', bodyPrevStyle)
    document.body.removeAttribute('data-gousto-overlay-open')

    const scrollFromTopValue = resetScroll ? 0 : scrollFromTop
    window.scrollTo(0, scrollFromTopValue)
    if (resetScroll) {
      forceCheck()
    }
  }

  getDocumentHeight = () => {
    const {body} = document
    const html = document.documentElement

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
  }

  getWindowHeight = () => (window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight)

  fadeOut = () => {
    const { className, contentClassName, from } = this.props
    const overlay = (
      <div className={classNames(className, css.overlayContainer)}>
        <div className={css.greyFadeOut}>&nbsp;</div>
        <div
          className={classNames(contentClassName, css[`contentSlideOutFrom${from}`], css.overlayContent)}
        >
          {this.children}
        </div>
      </div>
    )

    ReactDOM.unstable_renderSubtreeIntoContainer(this, overlay, this.node)
    if (this.reactRoot) {
      this.reactRoot.className = css.reactRootOverlayBlurIn
    }

    this.closeOverlay()
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
      const { from } = this.props
      const overlay = (
        <div className={classNames(props.className, css.overlayContainer)}>
          <div className={css.grey}>&nbsp;</div>
          <div
            className={classNames(props.contentClassName, css[`contentFrom${from}`], css.overlayContent)}
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

Overlay.propTypes = {
  open: PropTypes.bool.isRequired,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  from: PropTypes.string,
  resetScroll: PropTypes.bool,//eslint-disable-line
  rootId: PropTypes.string //eslint-disable-line
}

Overlay.defaultProps = {
  rootId: 'react-root',
  from: 'right',
  resetScroll: false,
  contentClassName: '',
  className: ''
}

export default Overlay
