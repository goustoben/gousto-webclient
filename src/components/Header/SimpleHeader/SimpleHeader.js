import PropTypes from 'prop-types'
import React from 'react'
import Svg from 'Svg'
import Link from 'Link'
import classNames from 'classnames'
import PromoModal from 'PromoModal'
import { H1 } from 'Page/Header'
import css from '../Header.css'

const SimpleHeader = ({ serverError, className, homeUrl, title, small }) => (
  <span id={serverError ? 'mobileMenu' : null}>
    <a className={className} href={serverError ? '#' : null} />
    <header className={classNames(css.header, { [css.smallContainer]: small })}>
      <div>
        <div className={css.container}>
          <div className={css.mainBar}>
            <div className={css.mainContent}>
              <Link to={homeUrl} className={css.logoLink} clientRouted>
                <span>
                  <Svg fileName="gousto_logo" className={css.logoDesktop} />
                </span>
              </Link>
              {title ? <H1 className={css.mobileTitle}>{title}</H1> : null}
            </div>
          </div>
        </div>
      </div>
    </header>
    <PromoModal />
  </span>
)

SimpleHeader.propTypes = {
  serverError: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  homeUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  small: PropTypes.bool,
}

SimpleHeader.defaultProps = {
  title: '',
}

export default SimpleHeader
