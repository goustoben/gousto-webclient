import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import DOMPurify from 'dompurify'
import BottomBar from 'BottomBar'
import GetHelpLayout from 'layouts/GetHelpLayout'
import Loading from 'Loading'
import { Button } from 'goustouicomponents'
import { client as routes } from 'config/routes'
import { replaceWithValues } from 'utils/text'
import { fetchRefundAmount, fetchRefundAmountV2, setComplaint, setComplaintV2 } from 'apis/getHelp'
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
    featureSSRValidationV2: PropTypes.shape({
      value: PropTypes.bool,
      experiment: PropTypes.bool,
    }),
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
  }

  static defaultProps = {
    featureSSRValidationV2: {
      value: false,
      experiment: false,
    }
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
    const { featureSSRValidationV2, user, order, selectedIngredients } = this.props
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
      let response

      if (featureSSRValidationV2 && featureSSRValidationV2.value) {
        response = await fetchRefundAmountV2(...fetchRefundAmountParams)
      } else {
        response = await fetchRefundAmount(...fetchRefundAmountParams)
      }

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
      featureSSRValidationV2,
      user,
      order,
      selectedIngredients,
      trackAcceptRefund
    } = this.props
    const issues = Object.keys(selectedIngredients).map(key => (
      {
        category_id: Number(selectedIngredients[key].issueId),
        ingredient_id: selectedIngredients[key].ingredientId,
        description: DOMPurify.sanitize(selectedIngredients[key].issueDescription),
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
      let response

      if (featureSSRValidationV2 && featureSSRValidationV2.value) {
        response = await setComplaintV2(...setComplaintParams)
      } else {
        response = await setComplaint(...setComplaintParams)
      }

      trackAcceptRefund(refund.value)
      browserHistory.push(`${routes.getHelp.index}/${routes.getHelp.confirmation}`)

      return response
    } catch (err) {
      return this.requestFailure()
    }
  }

  requestFailure = () => {
    this.setState({
      ...this.state,
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
      : <Button
        className={css.button}
        color="primary"
        onClick={() => this.onAcceptOffer()}
      >
          {button2WithAmount}
        </Button>

    return (
      <GetHelpLayout
        title={content.title}
        body={getHelpLayoutbody}
        fullWidthContent
      >
        {(isFetching)
          ? <div className={css.center}>
              <Loading className={css.loading} />
            </div>
          : <div>
            <p>{confirmationContent}</p>
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
        }
      </GetHelpLayout>
    )
  }
}

export default Refund
