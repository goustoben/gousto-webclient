import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './CommunicationPanel.module.css'

const propTypes = {
  showIcon: PropTypes.bool,
  level: PropTypes.oneOf([
    'info',
  ]).isRequired,
  title: PropTypes.string,
  body: PropTypes.string.isRequired,
}

const defaultProps = {
  showIcon: false,
  title: '',
}

const CommunicationPanel = ({
  showIcon, level, title, body,
}) => {
  const panelWrapperCss = classnames(
    css[level],
    { [css.showIcon]: showIcon },
  )

  return (
    <div className={panelWrapperCss}>
      {(showIcon) && (
        <span className={css[`icon-${level}`]} />
      )}
      {(title) && (
        <h1 className={css.panelTitle}>{title}</h1>
      )}
      <div className={css.panelBody}>
        {body}
      </div>
    </div>
  )
}

CommunicationPanel.propTypes = propTypes
CommunicationPanel.defaultProps = defaultProps

export {
  CommunicationPanel,
}
