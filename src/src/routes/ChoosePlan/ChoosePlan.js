import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { Button, Alert } from 'goustouicomponents'
import Loading from 'Loading'
import { PlanOption } from './PlanOption'
import { subscription, transactional } from './config'
import css from './ChoosePlan.css'

class ChoosePlan extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    choosePlanContinue: PropTypes.func,
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

  render() {
    const { choosePlanContinue, isLoading, subscriptionPrices, transactionalPrices, extrasIncluded } = this.props

    const subscriptionOption = { ...subscription, ...subscriptionPrices}
    const transactionalOption = { ...transactional, ...transactionalPrices}

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
                title={subscriptionOption.title}
                totalPrice={subscriptionOption.totalPrice}
                totalPriceDiscounted={subscriptionOption.totalPriceDiscounted}
                pricePerPortion={subscriptionOption.pricePerPortion}
                priceBoxTypeMessage={subscriptionOption.priceBoxTypeMessage}
                benefits={subscriptionOption.benefits}
                showExclExtras={extrasIncluded}
                handleSelect={() => {}}
              />
              <PlanOption
                selected
                title={transactionalOption.title}
                totalPrice={transactionalOption.totalPrice}
                totalPriceDiscounted={transactionalOption.totalPriceDiscounted}
                pricePerPortion={transactionalOption.pricePerPortion}
                priceBoxTypeMessage={transactionalOption.priceBoxTypeMessage}
                benefits={transactionalOption.benefits}
                showExclExtras={extrasIncluded}
                handleSelect={() => {}}
              />
              {extrasIncluded && (
                <Alert type="info">
                  The prices shown above don&#39;t include optional extras, such as
                  premium delivery or premium recipe surcharges.
                </Alert>
              )}
            </div>
            )}
          <Button onClick={choosePlanContinue} disabled={isLoading} width="full">
            Continue
          </Button>
        </div>

      </div>

    )

  }
}
export { ChoosePlan }
