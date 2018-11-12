import React from 'react'
import Immutable from 'immutable'
import config from 'config/checkout'
/* eslint-disable new-cap */
import BoxDetails from './BoxDetails'
import AboutYou from './AboutYou'
import Delivery from './Delivery'
import Payment from './Payment'
import Summary from './Summary'
import Subscription from './Subscription'
import PromoCode from './PromoCode'
import CheckoutButton from './CheckoutButton'
import PartialContainer from './PartialContainer'

class Steps extends React.PureComponent {

	static propTypes = {
	  step: React.PropTypes.string,
	  order: React.PropTypes.instanceOf(Immutable.List),
	  currentStep: React.PropTypes.string,
	  onStepChange: React.PropTypes.func,
	  nextStepName: React.PropTypes.string,
	  browser: React.PropTypes.string,
	}

	static defaultProps = {
	  currentStep: '',
	  onStepChange: () => {},
	  nextStepName: '',
	}

	isVisibleMobile = (step) => {
	  const stepConfig = config.steps.find(obj => obj.step === step)

	  return stepConfig && stepConfig.visible && stepConfig.visible.includes(config.mobileSteps[this.props.step])
	}

	render() {
	  const { onStepChange, nextStepName } = this.props
	  // to do: refactor using react.createelement
	  const stepMapping = {
	    aboutyou: key => (<AboutYou key={key} onStepChange={onStepChange} nextStepName={nextStepName} />),
	    payment: key => (<Payment key={key} onSubmit={onStepChange} nextStepName={nextStepName} />),
	    delivery: key => (<Delivery key={key} onStepChange={onStepChange} nextStepName={nextStepName} />),
	    boxdetails: key => (<BoxDetails key={key} onSubmit={onStepChange} nextStepName={nextStepName} />),
	    summary: key => (<Summary key={key} currentStep={this.props.currentStep} onSubmit={onStepChange} nextStepName={nextStepName} />),
	    subscription: key => (<Subscription key={key} onSubmit={onStepChange} nextStepName={nextStepName} />),
	    promocode: key => (<PromoCode key={key} onSubmit={onStepChange} nextStepName={nextStepName} />),
	    cta: key => (<CheckoutButton key={key} stepName={nextStepName} onClick={onStepChange} />),
	  }

	  return (
			<div>
				{this.props.order ? this.props.order.map((step, index) => (
					<PartialContainer
					  visible={(this.props.browser === 'mobile') ? this.isVisibleMobile(step) : (step === this.props.step)}
					  key={step}
					>
						{(stepMapping[step]) ? stepMapping[step](index) : null}
					</PartialContainer>
				)) : null}
			</div>
	  )
	}
}

export default Steps
