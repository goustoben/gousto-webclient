import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { Button, Alert } from 'goustouicomponents'
import Loading from 'Loading'
import { PlanOption } from './PlanOption'
import { subscription, transactional, transactionalPromoCode } from './config'
import css from './ChoosePlan.css'

class ChoosePlan extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      subscriptionOption: null
    }
  }

  static propTypes = {
    choosePlanContinue: PropTypes.func,
    clearTempPromoCode: PropTypes.func,
    stashTempPromoCode: PropTypes.func,
    trackSubscriptionOptionSelected: PropTypes.func,
    promoCode: PropTypes.string,
    tempPromoCode: PropTypes.string,
    extrasIncluded: PropTypes.bool,
    pricingRequest: PropTypes.func,
    isLoading: PropTypes.bool,
    subscriptionPrices: PropTypes.shape({
      totalPrice: PropTypes.string,
      totalPriceDiscounted: PropTypes.string,
      pricePerPortion: PropTypes.string,
    }),
    transactionalPrices: PropTypes.shape({
      totalPrice: PropTypes.string,
      totalPriceDiscounted: PropTypes.string,
      pricePerPortion: PropTypes.string,
    })
  }

  static defaultProps = {
    choosePlanContinue: () => {},
    pricingRequest: () => {},
    subscriptionPrices: {},
    transactionalPrices: {}
  }

  componentDidMount() {
    const { pricingRequest } = this.props
    pricingRequest()
  }

  setSubscription(option) {
    const { trackSubscriptionOptionSelected } = this.props
    this.setState({ subscriptionOption: option })
    trackSubscriptionOptionSelected(option)
  }

  handleContinue() {
    const { promoCode, tempPromoCode, choosePlanContinue, clearTempPromoCode, stashTempPromoCode } = this.props
    const { subscriptionOption } = this.state
    const subscriptionPromoCode = tempPromoCode || promoCode
    let chosenPromoCode

    if(subscriptionOption === 'transactional') {
      chosenPromoCode = transactionalPromoCode
      stashTempPromoCode(subscriptionPromoCode)
    } else {
      chosenPromoCode = subscriptionPromoCode
      clearTempPromoCode()
    }

    choosePlanContinue(subscriptionOption, chosenPromoCode)
  }

  render() {
    const { isLoading, subscriptionPrices, transactionalPrices, extrasIncluded } = this.props
    const { subscriptionOption } = this.state

    const subscriptionDetails = { ...subscription, ...subscriptionPrices}
    const transactionalDetails = { ...transactional, ...transactionalPrices}

    return (
      <div className={css.choosePlanPage}>
        <Helmet
          style={[
            {
              cssText: `
                #react-root {
                  height: 100%;
                }
              `
            }
          ]}
        />
        <div className={css.choosePlanWrapper}>
          <h1 className={css.title}>Your Gousto subscription</h1>
            <p className={css.subtitle}>
              Get a weekly box delivered at a discount or try a one-off box without a subscription
            </p>
            { isLoading ? (
            <div className={css.loadingContainer}>
              <Loading loading />
            </div>
            ) : (
            <div>
              <PlanOption
                selected={subscriptionOption === 'subscription'}
                title={subscriptionDetails.title}
                totalPrice={subscriptionDetails.totalPrice}
                totalPriceDiscounted={subscriptionDetails.totalPriceDiscounted}
                pricePerPortion={subscriptionDetails.pricePerPortion}
                priceBoxTypeMessage={subscriptionDetails.priceBoxTypeMessage}
                benefits={subscriptionDetails.benefits}
                showExclExtras={extrasIncluded}
                handleSelect={() => this.setSubscription('subscription')}
              />
              <PlanOption
                selected={subscriptionOption === 'transactional'}
                title={transactionalDetails.title}
                totalPrice={transactionalDetails.totalPrice}
                totalPriceDiscounted={transactionalDetails.totalPriceDiscounted}
                pricePerPortion={transactionalDetails.pricePerPortion}
                priceBoxTypeMessage={transactionalDetails.priceBoxTypeMessage}
                benefits={transactionalDetails.benefits}
                showExclExtras={extrasIncluded}
                handleSelect={() => this.setSubscription('transactional')}
              />
              {extrasIncluded && (
                <Alert type="info">
                  The prices shown above don&#39;t include optional extras, such as
                  premium delivery or premium recipe surcharges.
                </Alert>
              )}
            </div>
            )}
          <Button
            onClick={() => this.handleContinue()}
            disabled={!subscriptionOption || isLoading}
            width="full"
          >
            Continue
          </Button>
        </div>

      </div>

    )

  }
}
export { ChoosePlan }
