import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { onEnter } from 'utils/accessibility'
import css from './ModalPanel.css'

class ModalPanel extends React.Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseClickOutside)
  }

  isNodeInRoot = (node, root) => {
    let parent = node
    while (parent) {
      if (parent === root) {
        return true
      }
      parent = parent.parentNode
    }

    return false
  }

  handleMouseClickOutside = (e) => {
    const { closePortal, disableClickOutside } = this.props

    if (disableClickOutside) {
      return
    }
    if (this.isNodeInRoot(e.target, ReactDOM.findDOMNode(this.refs.content))) {
      return
    }
    e.stopPropagation()
    closePortal()
  }

  renderBackButton = () => {
    const { onGoBack } = this.props

    if (onGoBack) {
      return (
        <div
          className={css.leftControl}
          role="button"
          tabIndex="0"
          onClick={onGoBack}
          onKeyDown={e => onEnter(e, onGoBack)}
        >
          <span className={css.back} />
          Back
        </div>
      )
    }

    return null
  }

  render() {
    const {
      children,
      className,
      closePortal,
      closePortalFromButton,
      containerClassName,
      disableOverlay,
      isNarrow,
    } = this.props

    const modalClasses = classNames(
      className,
      css.modal,
      {
        [css.narrow]: isNarrow,
      }
    )

    const closeModal = closePortalFromButton || closePortal

    return (
      <div className={containerClassName}>
        {!disableOverlay && <div className={css.modalOverlay} />}
        <div className={modalClasses} ref="content">
          {this.renderBackButton()}
          <div
            className={css.rightControl}
            role="button"
            tabIndex="0"
            onClick={closeModal}
            onKeyDown={e => onEnter(e, closeModal)}
            data-testing="modalClose"
          >
            <span className={css.close} />
          </div>
          {children}
        </div>
      </div>
    )
  }
}

ModalPanel.propTypes = {
  children: PropTypes.node,
  closePortal: PropTypes.func,
  closePortalFromButton: PropTypes.func,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  disableOverlay: PropTypes.bool,
  disableClickOutside: PropTypes.bool,
  isNarrow: PropTypes.bool,
  onGoBack: PropTypes.func,
}

ModalPanel.defaultProps = {
  children: null,
  closePortal: () => {},
  closePortalFromButton: null,
  className: '',
  containerClassName: '',
  disableOverlay: false,
  disableClickOutside: false,
  isNarrow: false,
  onGoBack: null,
}

export default ModalPanel
