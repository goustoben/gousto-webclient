import React from 'react'
import PropTypes from 'prop-types'
import { LayoutContentWrapper, LayoutPageWrapper } from 'goustouicomponents'
import css from './OrderAddOnsFooter.css'

const propTypes = {
  children: PropTypes.node.isRequired,
}

function OrderAddOnsFooter({ children }) {
  return (
    <div className={css.footer}>
      <LayoutPageWrapper>
        <LayoutContentWrapper paddingHorizontal={false}>
          <div className={css.footerContent}>{children}</div>
        </LayoutContentWrapper>
      </LayoutPageWrapper>
    </div>
  )
}

OrderAddOnsFooter.propTypes = propTypes

export { OrderAddOnsFooter }
