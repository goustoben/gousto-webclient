import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { Button, Alert } from 'goustouicomponents'
import Loading from 'Loading'
import { PlanOption } from './PlanOption'
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
    subscriptionOption: PropTypes.shape({
      title: PropTypes.string,
      totalPrice: PropTypes.string,
      totalPriceDiscounted: PropTypes.string,
      pricePerPortion: PropTypes.string,
      pricePerPortionDiscounted: PropTypes.string,
      priceBoxTypeMessage: PropTypes.string,
      benefits: PropTypes.arrayOf(PropTypes.string),

    }),
    transactionalOption: PropTypes.shape({
      title: PropTypes.string,
      totalPrice: PropTypes.string,
      totalPriceDiscounted: PropTypes.string,
      pricePerPortion: PropTypes.string,
      pricePerPortionDiscounted: PropTypes.string,
      priceBoxTypeMessage: PropTypes.string,
      benefits: PropTypes.arrayOf(PropTypes.string),
    })
  }

  static defaultProps = {
    choosePlanContinue: () => {},
    subscriptionOption: {},
    transactionalOption: {}
  }

  componentDidMount() {
    const { pricingRequest } = this.props
    pricingRequest()
  }

  render() {
    const { choosePlanContinue, isLoading, subscriptionOption, transactionalOption, extrasIncluded } = this.props

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
                handleSelect={
                  () => console.log('Option 1 clicked!') /*eslint-disable-line*/
                }
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
                handleSelect={
                  () =>
                    console.log('Hi, you clicked Option 2') /*eslint-disable-line*/
                }
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
