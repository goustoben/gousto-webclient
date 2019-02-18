import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import { PageContent, PageHeader } from 'Page'
import BottomBar from 'BottomBar'

import css from './GetHelpLayout.css'

const propTypes = {
  body: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  fullWidthContent: PropTypes.bool,
}

const defaultProps = {
  fullWidthContent: false,
  body: '',
}

const GetHelpLayout = ({ title, body, children, fullWidthContent }) => {
  const bodyContent = []
  const footerContent = []
  const bodyContentCss = classnames(css.bodyContent, {
    [css.bodyContentFullWidth]: fullWidthContent
  })

  React.Children.forEach(children, child => {
    if (child.type === BottomBar) {
      footerContent.push(child)
    } else {
      bodyContent.push(child)
    }
  })

  return (
    <div className={css.rootContainer}>
      <div className={css.header}>
        <PageHeader title={title} />
      </div>
      <PageContent className={css.pageContent}>
        <p className={css.bodyDescription}>
          {body}
        </p>
        <div className={bodyContentCss}>
          {bodyContent}
        </div>
        {footerContent}
      </PageContent>
    </div>
  )
}

GetHelpLayout.propTypes = propTypes
GetHelpLayout.defaultProps = defaultProps

export default GetHelpLayout
