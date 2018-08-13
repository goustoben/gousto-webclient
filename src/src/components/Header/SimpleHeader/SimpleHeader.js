import React from 'react'
import css from '../Header.css'
import config from 'config'
import Svg from 'Svg'
import Link from 'Link'
import classNames from 'classnames'
import PromoModal from 'PromoModal'
import { H1 } from 'Page/Header'

const SimpleHeader = ({ serverError, className, homeUrl, noContactBar, title, small }) => (
	<span id={serverError ? 'mobileMenu' : null}>
		<a className={className} href={serverError ? '#' : null} />
		<header className={`${noContactBar ? css.headerNoContactBar : css.header} ${classNames({ [css.smallContainer]: small })}`}>
			<div>
				<div className={css.container}>
					{!noContactBar ? <div className={css.contactBar}>
						<p className={css.contactContent}>
							<span className={css.info}>Free delivery </span>
							<span className={css.info}>{config.company.telephone.number}</span>
						</p>
					</div> : null}
					<div className={css.mainBar}>
						<div className={css.mainContent}>
							<Link to={homeUrl} className={css.logoLink} clientRouted>
								<span>
									<Svg fileName="icon-logo" className={css.logoDesktop} />
									<Svg fileName="icon-logo-g" className={css.logoMobile} />
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
	serverError: React.PropTypes.bool.isRequired,
	className: React.PropTypes.string.isRequired,
	homeUrl: React.PropTypes.string.isRequired,
	noContactBar: React.PropTypes.bool,
	title: React.PropTypes.string,
	small: React.PropTypes.bool,
}

SimpleHeader.defaultProps = {
	title: '',
}

export default SimpleHeader
