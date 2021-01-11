import React from 'react'
import PropTypes from 'prop-types'
import { Card, Heading, LayoutPageWrapper } from 'goustouicomponents'
import { CTABack } from 'zest/CTABack'
import css from './GetHelpLayout2.css'

const GetHelpLayout2 = ({
  children,
  headingText,
  backUrl,
}) => (
  <LayoutPageWrapper>
    <div className={css.wrapperWide}>
      <div className={css.wrapperBack}>
        <CTABack url={backUrl} testingSelector="CTABack" />
      </div>
      <div className={css.wrapper}>
        <div className={css.heading}>
          <Heading size="fontStyleXL">
            {headingText}
          </Heading>
        </div>
        <Card>
          {children}
        </Card>
      </div>
    </div>
  </LayoutPageWrapper>
)

GetHelpLayout2.propTypes = {
  backUrl: PropTypes.string,
  children: PropTypes.node.isRequired,
  headingText: PropTypes.node.isRequired,
}

GetHelpLayout2.defaultProps = {
  backUrl: null,
}

export { GetHelpLayout2 }
