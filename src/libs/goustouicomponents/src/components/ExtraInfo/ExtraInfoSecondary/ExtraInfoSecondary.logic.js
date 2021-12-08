import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { LayoutContentWrapper } from '../../LayoutContentWrapper'
import css from './ExtraInfoSecondary.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

class ExtraInfoSecondary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isShowingMoreInfo: false,
    }
  }

  setMoreInfoBtnRef = (el, type) => {
    this[`${type}MoreInfoBtn`] = el
  }

  focusElement = (isShowingMoreInfo) => {
    const focusElement = isShowingMoreInfo ? 'hideMoreInfoBtn' : 'showMoreInfoBtn'

    if (this[focusElement]) {
      this[focusElement].focus()
    }
  }

  onClick = (isShowingMoreInfo) => {
    this.focusElement(isShowingMoreInfo)
    this.setState({ isShowingMoreInfo })
  }

  render() {
    const { isShowingMoreInfo } = this.state
    const { children, label, title } = this.props
    const classes = classnames(css.secondaryContent, { [css.isExpanded]: isShowingMoreInfo })

    return (
      <div className={css.secondaryWrapper}>
        <div className={classes}>
          <button
            ref={(el) => this.setMoreInfoBtnRef(el, 'hide')}
            className={css.hideMoreInfoBtn}
            type="button"
            onClick={() => this.onClick(false)}
            tabIndex={isShowingMoreInfo ? '0' : '-1'}
          />
          <div>{children}</div>
        </div>
        <button
          ref={(el) => this.setMoreInfoBtnRef(el, 'show')}
          className={css.showMoreInfoBtn}
          type="button"
          onClick={() => this.onClick(true)}
          tabIndex={isShowingMoreInfo ? '-1' : '0'}
        >
          <LayoutContentWrapper>
            <span className={css.labelRow}>
              {label}
              <span className={css.iconQuestion} />
            </span>
            <span className={css.secondaryTitle}>{title}</span>
          </LayoutContentWrapper>
        </button>
      </div>
    )
  }
}

ExtraInfoSecondary.propTypes = propTypes

export {
  ExtraInfoSecondary,
}
