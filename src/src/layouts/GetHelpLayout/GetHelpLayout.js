import PropTypes from 'prop-types'
import React from 'react'

import { Card, Heading } from 'goustouicomponents'
import { BottomFixedContentWrapper } from '../../routes/GetHelp/components/BottomFixedContentWrapper'
import css from './GetHelpLayout.css'

const propTypes = {
  body: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const defaultProps = {
  body: '',
}

const GetHelpLayout = ({ title, body, children }) => {
  const bodyContent = []
  const footerContent = []

  React.Children.forEach(children, child => {
    if (child.type === BottomFixedContentWrapper) {
      footerContent.push(child)
    } else {
      bodyContent.push(child)
    }
  })

  return (
    <div>
      <div className={css.pageHeader}>
        <Heading size="fontStyleL">{title}</Heading>
      </div>
      <Card>
        <p className={css.bodyDescription}>
          {body}
        </p>
        <div className={css.bodyContent}>
          {bodyContent}
        </div>
        <div className={css.footerContent}>
          {footerContent}
        </div>
      </Card>
    </div>
  )
}

GetHelpLayout.propTypes = propTypes
GetHelpLayout.defaultProps = defaultProps

export { GetHelpLayout }
