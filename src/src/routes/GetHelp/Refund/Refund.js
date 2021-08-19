import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import Loading from 'Loading'
import { Button } from 'goustouicomponents'
import { client as routes } from 'config/routes'
import { sanitize } from 'utils/sanitizer'
import { replaceWithValues } from 'utils/text'
import { fetchRefundAmount, setComplaint } from 'apis/getHelp'
import { appendFeatureToRequest } from '../utils/appendFeatureToRequest'
import { GetHelpLayout } from '../layouts/GetHelpLayout'
import { BottomFixedContentWrapper } from '../components/BottomFixedContentWrapper'
import { BottomButton } from '../components/BottomButton'
import { orderPropType } from '../getHelpPropTypes'

import css from './Refund.css'

const propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    infoBody: PropTypes.string.isRequired,
    confirmationBody: PropTypes.string.isRequired,
    errorBody: PropTypes.string.isRequired,
    button1: PropTypes.string.isRequired,
    button2: PropTypes.string.isRequired,
  }).isRequired,
  featureShorterCompensationPeriod: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
  }).isRequired,
  order: orderPropType.isRequired,
  selectedIngredients: PropTypes.objectOf(PropTypes.shape({
    ingredientUuid: PropTypes.string.isRequired,
    issueDescription: PropTypes.string.isRequired,
    issueId: PropTypes.string.isRequired,
    recipeGoustoReference: PropTypes.string.isRequired,
    recipeId: PropTypes.string.isRequired,
  })).isRequired,
  trackAcceptIngredientsRefund: PropTypes.func.isRequired,
  trackRejectRefund: PropTypes.func.isRequired,
}

class Refund extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      refund: { value: 0, type: 'credit' },
      isFetching: true,
      didFetchError: false,
    }
  }

  componentDidMount() {
    this.getRefund()
  }

  getRefund = async () => {
    const { featureShorterCompensationPeriod, user, order, selectedIngredients } = this.props

    const fetchRefundAmountParams = [
      user.accessToken,
      appendFeatureToRequest({
        body: {
          customer_id: Number(user.id),
          order_id: Number(order.id),
          ingredient_ids: Object.keys(selectedIngredients).map(
            key => selectedIngredients[key].ingredientUuid
          ),
        },
        featureShorterCompensationPeriod,
      })
    ]

    try {
      const response = await fetchRefundAmount(...fetchRefundAmountParams)

      const { value, type } = response.data

      this.setState(prevState => ({
        ...prevState,
        isFetching: false,
        refund: {
          ...prevState.refund,
          type,
          value,
        }
      }))
    } catch (err) {
      this.requestFailure()
    }
  }

  onAcceptOffer = async () => {
    const { refund } = this.state
    const {
      featureShorterCompensationPeriod,
      user,
      order,
      selectedIngredients,
      trackAcceptIngredientsRefund,
    } = this.props

    const issues = Object.keys(selectedIngredients).map(key => {
      const {
        issueId,
        ingredientUuid,
        issueDescription,
        recipeGoustoReference,
      } = selectedIngredients[key]

      return {
        category_id: Number(issueId),
        ingredient_id: ingredientUuid,
        description: sanitize(issueDescription),
        recipe_gousto_reference: recipeGoustoReference,
      }
    })

    const setComplaintParams = [
      user.accessToken,
      appendFeatureToRequest({
        body: {
          customer_id: Number(user.id),
          order_id: Number(order.id),
          type: refund.type,
          value: refund.value,
          issues
        },
        featureShorterCompensationPeriod,
      })
    ]

    try {
      const response = await setComplaint(...setComplaintParams)

      trackAcceptIngredientsRefund(refund.value)
      browserHistory.push(`${routes.getHelp.index}/${routes.getHelp.confirmation}`)

      return response
    } catch (err) {
      return this.requestFailure()
    }
  }

  requestFailure = () => {
    this.setState({
      isFetching: false,
      didFetchError: true
    })
  }

  render() {
    const { content, trackRejectRefund } = this.props
    const {
      isFetching,
      refund,
      didFetchError,
    } = this.state

    const infoBodyWithAmount = replaceWithValues(
      content.infoBody, {
        refundAmount: refund.value.toFixed(2)
      }
    )
    const button2WithAmount = replaceWithValues(
      content.button2, {
        refundAmount: refund.value.toFixed(2)
      }
    )
    const getHelpLayoutbody = (isFetching || didFetchError)
      ? ''
      : infoBodyWithAmount
    const confirmationContent = (didFetchError)
      ? content.errorBody
      : content.confirmationBody
    const acceptButton = (didFetchError)
      ? null
      : (
        <Button
          className={css.button}
          color="primary"
          onClick={() => this.onAcceptOffer()}
        >
          {button2WithAmount}
        </Button>
      )

    return (
      <GetHelpLayout
        title={content.title}
      >
        {(isFetching)
          ? (
            <div className={css.center}>
              <Loading className={css.loading} />
            </div>
          )
          : (
            <div>
              <p className={css.confirmationBody}>{getHelpLayoutbody}</p>
              <p className={css.confirmationQuestion}>{confirmationContent}</p>
              <BottomFixedContentWrapper>
                <BottomButton
                  color="secondary"
                  url={`${routes.getHelp.index}/${routes.getHelp.contact}`}
                  clientRouted
                  onClick={() => trackRejectRefund(refund.value)}
                >
                  {content.button1}
                </BottomButton>
                {acceptButton}
              </BottomFixedContentWrapper>
            </div>
          )}
      </GetHelpLayout>
    )
  }
}

Refund.propTypes = propTypes

export {
  Refund
}
