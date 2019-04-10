import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import config from 'config'
import classNames from 'classnames'

import Svg from 'components/Svg'
import Link from 'Link'
import css from './Footer.css'
import AppStoreLinks from './AppStoreLinks/index'

const Footer = ({ simple, type, copyright }) => {
  const clientRoutes = config.routes.client

  const renderTermsLink = () => (
		<li className={css.menuItem}>
			Terms
			(<Link to={clientRoutes.termsOfUse} data-selid="footer-terms-of-use" title="Terms &amp; Conditions" clientRouted={false} secondary>Website</Link>)
			(<Link to={clientRoutes.termsAndConditions} data-selid="footer-terms-and-conditions" title="Terms &amp; Conditions for Sale of Goods" clientRouted={false} secondary>Sale</Link>)
		</li>
  )

  const renderPrivacyLink = () => (
		<li className={css.menuItem}>
			<Link to={clientRoutes.privacyPolicy} data-selid="footer-privacy-statement" title="Privacy Policy" clientRouted={false} secondary>Privacy Policy</Link>
		</li>
  )

  const renderSimpleList = () => (
		<ul className={css.menuList}>
			{renderTermsLink()}
			{renderPrivacyLink()}
		</ul>
  )

  const renderFullList = () => (
		<ul className={css.menuList}>
			<li className={classNames(css.mobileHide, css.menuItem)}>
				<Link to={clientRoutes.home} data-selid="footer-home" title="Home" clientRouted={false} secondary>Home</Link>
			</li>
			<li className={classNames(css.mobileHide, css.menuItem)}>
				<Link to={clientRoutes.menu} data-selid="footer-this-weeks-recipes" title="This Week's Recipes" clientRouted={false} secondary>This Week's Recipes</Link>
			</li>
			<li className={css.menuItem}>
				<Link to={clientRoutes.help} data-selid="footer-learn-more" title="Help" clientRouted={false} secondary>Help</Link>
			</li>
			{renderTermsLink()}
			<li className={css.menuItem}>
				<Link data-selid="footer-cookbook" to={clientRoutes.cookbook} title="Cookbook" clientRouted={false} secondary>Cookbook</Link>
			</li>
			<li className={css.menuItem}>
				<Link to={clientRoutes.jobs} data-selid="footer-jobs" title="Jobs" clientRouted={false} secondary>Jobs</Link>
			</li>
			<li className={css.menuItem}>
				<Link to={clientRoutes.weCare} data-selid="footer-we-care" title="We Care" clientRouted={false} secondary>We Care</Link>
			</li>
			<li className={css.menuItem}>
				<Link to={clientRoutes.blog} data-selid="footer-blog" title="Blog" clientRouted={false} secondary>Blog</Link>
			</li>
			<li className={classNames(css.mobileHide, css.menuItem)}>
				<Link to={clientRoutes.ourSuppliers} data-selid="footer-our-suppliers" title="Our Suppliers" clientRouted={false} secondary>Our Suppliers</Link>
			</li>
			{renderPrivacyLink()}
		</ul>
  )

  const renderSocial = () => (
		<div className={css.appLinks}>
			<ul className={css.links}>
				<li className={css.link}>
					<Link to="http://www.facebook.com/goustocooking" data-selid="footer-facebook" clientRouted={false} secondary><span className={css.facebook} /></Link>
				</li>
				<li className={css.link}>
					<Link to="https://twitter.com/goustocooking" data-selid="footer-twitter" clientRouted={false} secondary><span className={css.twitter} /></Link>
				</li>
				<li className={css.link}>
					<Link to="https://www.youtube.com/UKGousto/" data-selid="footer-youtube" clientRouted={false} secondary><span className={css.youtube} /></Link>
				</li>
				<li className={css.link}>
					<Link to="http://instagram.com/goustocooking" data-selid="footer-instagram" clientRouted={false} secondary><span className={css.instagram} /></Link>
				</li>
			</ul>
			<AppStoreLinks appStoreId={config.apps.appStoreId} playStoreId={config.apps.playStoreId} />
		</div>
  )

  const copyrightText = <p>&copy; Gousto {moment().format('YYYY')}. All rights reserved.</p>

  const renderCopyright = () => (
		<div id="copyright" className={css.copyright}>
			{copyrightText}
		</div>
  )

  const renderSimpleFooter = () => (
		<div>
			{renderSimpleList()}
			{renderCopyright()}
		</div>
  )

  const renderMediumFooter = () => (
		<div>
			{renderSocial()}
			{renderFullList()}
			{copyright && renderCopyright()}
		</div>
  )

  const renderLargeFooter = () => (
		<div>
			{renderMediumFooter()}
		</div>
  )

  const renderCheckoutFooter = () => (
		<div className={css.checkoutFooterContainer}>
			<div className={css.footerFlexContainer}>
				<div className={css.greatValue}>
					<h3 className={css.greatValueTitle}>9 / 10</h3>
					<Svg fileName="icon-5-stars-trustpilot" className={css.icon5Stars} />
					<div className={css.greatValueDescription}>Based on 2500+ reviews</div>
				</div>
				<div className={css.trustpilotContainer}>
					<Svg fileName="icon-trustpilot-logo-darkbg" className={css.iconTrustpilot} />
				</div>
				<div className={css.copyrightCheckout}>
					{copyrightText}
				</div>
			</div>
		</div>
  )

  const renderFooter = () => {
    let footer = null

    if (simple) {
      // Back compatibility of simple prop
      return renderSimpleFooter()
    }

    switch (type) {
    case 'simple':
      footer = renderSimpleFooter()
      break
    case 'medium':
      footer = renderMediumFooter()
      break
    case 'large':
      footer = renderLargeFooter()
      break
    case 'checkout':
      footer = renderCheckoutFooter()
      break
    default: {
      footer = renderMediumFooter()
      break
    }
    }

    return footer
  }

  return (
		<div className={css.footer}>
			{renderFooter()}
		</div>
  )
}

Footer.propTypes = {
  simple: PropTypes.bool,
  type: PropTypes.string,
  copyright: PropTypes.bool,
}

Footer.defaultProps = {
  simple: false,
  type: 'medium',
  copyright: true,
}

export default Footer
