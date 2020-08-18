import React from 'react'
import PropTypes from 'prop-types'
import { BottomFixedContent } from 'goustouicomponents'
import css from './BottomFixedContentWrapper.css'

const BottomFixedContentWrapper = ({ children }) => (
  <BottomFixedContent>
    <div className={css.bottomFixedContentWrapper}>
      {children}
    </div>
  </BottomFixedContent>
)

BottomFixedContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export { BottomFixedContentWrapper }
