import React from 'react'
import ModalPanel from 'Modal/ModalPanel'
import PromoModalBody from './PromoModalBody'
import css from './PromoModal.css'
import Button from 'Button'
import AgeVerify from './AgeVerify'

const PromoModal = ({ text, title, error, buttonText, promoApply, close, needsAgeVerification, isAgeVerified, pending, justApplied }) => (
	<ModalPanel closePortal={(error || justApplied) ? close : promoApply} closePortalFromButton={(error || justApplied) ? close : promoApply} disableOverlay>
		<div className={css.body} data-testing="promoModal">
			<PromoModalBody title={title} text={text} error={error} />
			<span className={css.buttonContainer}>
				{needsAgeVerification && !error ? <AgeVerify /> : null}
				<Button
					className={css.buttonSegment}
					data-testing="promoModalButton"
					disabled={(needsAgeVerification && !isAgeVerified && !error) || pending}
					onClick={(error || justApplied) ? close : promoApply}
					pending={pending}
				>
					{buttonText}
				</Button>
			</span>
		</div>
	</ModalPanel>
)

PromoModal.propTypes = {
	text: React.PropTypes.string,
	title: React.PropTypes.string,
	error: React.PropTypes.string,
	promoApply: React.PropTypes.func,
	close: React.PropTypes.func,
	needsAgeVerification: React.PropTypes.bool,
	isAgeVerified: React.PropTypes.bool,
	buttonText: React.PropTypes.string,
	pending: React.PropTypes.bool,
	justApplied: React.PropTypes.bool,
}

export default PromoModal
