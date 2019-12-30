import React from 'react'
import PropTypes from 'prop-types'
import { Alert, LayoutContentWrapper, LayoutPageWrapper } from 'goustouicomponents'
import routes from 'config/routes'
import css from './OrderAddOnsFooter.css'

const propTypes = {
  children: PropTypes.node.isRequired,
  showError: PropTypes.bool,
}

const defaultProps = {
  showError: false,
}

function OrderAddOnsFooter({ children, showError }) {
  return (
    <div className={css.footer}>
      <LayoutPageWrapper>
        <LayoutContentWrapper paddingHorizontal={false}>
          <div className={css.footerContentWrapper}>
            {(showError) && (
              <div className={css.footerErrorMessage}>
                <Alert type="danger">
                  <p>
                    Sorry, we were unable to add item(s) to your confirmed order.
                    Please try again or contact us.
                  </p>
                  <a href={routes.zendesk.contactUs}>Get in touch</a>
                </Alert>
              </div>
            )}
            <div className={css.footerContent}>
              {children}
            </div>
          </div>
        </LayoutContentWrapper>
      </LayoutPageWrapper>
    </div>
  )
}

OrderAddOnsFooter.defaultProps = defaultProps
OrderAddOnsFooter.propTypes = propTypes

export { OrderAddOnsFooter }
