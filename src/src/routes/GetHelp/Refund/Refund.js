import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import BottomBar from 'BottomBar'
import GetHelpLayout from 'layouts/GetHelpLayout'
import Loading from 'Loading'
import { Button } from 'goustouicomponents'
import { client as routes } from 'config/routes'
import { sanitize } from 'utils/sanitizer'
import { replaceWithValues } from 'utils/text'
import { fetchRefundAmount, setComplaint } from 'apis/getHelp'
import { BottomButton } from '../components/BottomButton'

import css from './Refund.css'

class Refund extends PureComponent {
  static propTypes = {
    content: PropTypes.shape({
      title: PropTypes.string.isRequired,
      infoBody: PropTypes.string.isRequired,
      confirmationBody: PropTypes.string.isRequired,
      errorBody: PropTypes.string.isRequired,
      button1: PropTypes.string.isRequired,
      button2: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      accessToken: PropTypes.string.isRequired,
    }).isRequired,
    order: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    selectedIngredients: PropTypes.objectOf(PropTypes.shape({
      ingredientId: PropTypes.string.isRequired,
      issueDescription: PropTypes.string.isRequired,
      issueId: PropTypes.string.isRequired,
      recipeId: PropTypes.string.isRequired,
    })).isRequired,
    trackAcceptRefund: PropTypes.func.isRequired,
    trackUserCannotGetCompensation: PropTypes.func.isRequired,
  }

  state = {
    refund: { value: 0, type: 'credit' },
    isFetching: true,
    didFetchError: false,
  }

  componentDidMount() {
    this.getRefund()
  }

  getRefund = async () => {
    const { user, order, selectedIngredients } = this.props
    const fetchRefundAmountParams = [
      user.accessToken,
      {
        customer_id: Number(user.id),
        order_id: Number(order.id),
        ingredient_ids: Object.keys(selectedIngredients).map(
          key => selectedIngredients[key].ingredientId
        ),
      }
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
      user,
      order,
      selectedIngredients,
      trackAcceptRefund,
      trackUserCannotGetCompensation,
    } = this.props
    const issues = Object.keys(selectedIngredients).map(key => (
      {
        category_id: Number(selectedIngredients[key].issueId),
        ingredient_id: selectedIngredients[key].ingredientId,
        description: sanitize(selectedIngredients[key].issueDescription),
      }
    ))
    const setComplaintParams = [
      user.accessToken,
      {
        customer_id: Number(user.id),
        order_id: Number(order.id),
        type: refund.type,
        value: refund.value,
        issues
      }
    ]

    try {
      const response = await setComplaint(...setComplaintParams)

      trackAcceptRefund(refund.value)
      browserHistory.push(`${routes.getHelp.index}/${routes.getHelp.confirmation}`)

      return response
    } catch (err) {
      const { errors } = err

      if (errors && errors.criteria) {
        const { daysSinceLastCompensation } = errors.criteria

        trackUserCannotGetCompensation(daysSinceLastCompensation)
      }

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
    const { content } = this.props
    const {
      isFetching,
      refund,
      didFetchError
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
        fullWidthContent
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
              <BottomBar>
                <BottomButton
                  color="secondary"
                  url={`${routes.getHelp.index}/${routes.getHelp.contact}`}
                  clientRouted
                >
                  {content.button1}
                </BottomButton>
                {acceptButton}
              </BottomBar>
            </div>
          )}
      </GetHelpLayout>
    )
  }
}

export default Refund
