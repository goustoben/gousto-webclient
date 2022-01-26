import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Heading, LayoutPageWrapper } from 'goustouicomponents'
import { CTABack } from 'zest/CTABack'
import css from './GetHelpLayout2.css'

const GetHelpLayout2 = ({
  children,
  hasBackButton,
  headingText,
  backUrl,
}) => (
  <div className={classnames(css.wrapperWide, {[css.noCTABack]: !hasBackButton})}>
    <LayoutPageWrapper>
      {hasBackButton && (
        <div className={css.wrapperBack}>
          <CTABack url={backUrl} testingSelector="CTABack" />
        </div>
      )}
      <div className={classnames(css.heading, css.wrapper)}>
        <Heading size="fontStyleXL">
          {headingText}
        </Heading>
      </div>
    </LayoutPageWrapper>
    <LayoutPageWrapper padding="large-screens-only">
      <div className={classnames(css.wrapper, css.contentWrapper)}>
        {children}
      </div>
    </LayoutPageWrapper>
  </div>
)

GetHelpLayout2.propTypes = {
  backUrl: PropTypes.string,
  children: PropTypes.node.isRequired,
  hasBackButton: PropTypes.bool,
  headingText: PropTypes.node.isRequired,
}

GetHelpLayout2.defaultProps = {
  backUrl: null,
  hasBackButton: true,
}

export { GetHelpLayout2 }
