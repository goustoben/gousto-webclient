import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { CTABack } from 'zest/CTABack'
import { Card, Heading, LayoutPageWrapper } from 'goustouicomponents'
import { BottomFixedContentWrapper } from '../../components/BottomFixedContentWrapper'
import css from './GetHelpLayout.css'

const propTypes = {
  body: PropTypes.string,
  children: PropTypes.node.isRequired,
  ctaBackUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
}

const defaultProps = {
  body: '',
  ctaBackUrl: null,
}

const GetHelpLayout = ({
  body,
  children,
  ctaBackUrl,
  title,
}) => {
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
    <LayoutPageWrapper>
      <div className={css.getHelpContainer}>
        <CTABack url={ctaBackUrl} />
        <Helmet
          style={[{
            cssText: '#react-root { height: 100%; }',
          }]}
        />
        <div className={css.getHelpContent}>
          <div className={css.pageHeader}>
            <Heading size="fontStyleXL">{title}</Heading>
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
      </div>
    </LayoutPageWrapper>

  )
}

GetHelpLayout.propTypes = propTypes
GetHelpLayout.defaultProps = defaultProps

export { GetHelpLayout }
