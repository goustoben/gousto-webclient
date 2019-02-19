import PropTypes from 'prop-types'
import React from 'react'
import ModalPanel from 'Modal/ModalPanel'
import { Button } from 'goustouicomponents'
import PromoModalBody from './PromoModalBody'
import css from './PromoModal.css'
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
  text: PropTypes.string,
  title: PropTypes.string,
  error: PropTypes.string,
  promoApply: PropTypes.func,
  close: PropTypes.func,
  needsAgeVerification: PropTypes.bool,
  isAgeVerified: PropTypes.bool,
  buttonText: PropTypes.string,
  pending: PropTypes.bool,
  justApplied: PropTypes.bool,
}

export default PromoModal
