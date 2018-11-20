import React, { PropTypes, PureComponent } from 'react'
import BottomBar from 'BottomBar'
import GetHelpLayout from 'layouts/GetHelpLayout'
import Loading from 'Loading'
import { Button } from 'goustouicomponents'
import { BottomButton } from '../components/BottomButton'
import { client as routes } from 'config/routes'
import { redirect } from 'utils/window'
import { replaceWithValues } from 'utils/text'
import { fetchRefundAmount, setComplaint } from 'apis/getHelp'

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
    }),
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      accessToken: PropTypes.string.isRequired,
    }),
    order: PropTypes.shape({
      id: PropTypes.string.isRequired,
      ingredientIds: PropTypes.arrayOf(
        PropTypes.string.isRequired
      ),
    })
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
    const { user, order } = this.props

    try {
      const response = await fetchRefundAmount({
        customer_id: Number(user.id),
        order_id: Number(order.id),
        ingredientIds: order.ingredientIds
      })
      const { value, type } = response.data

      this.setState({
        ...this.state,
        isFetching: false,
        refund: {
          type,
          value
        }
      })
    } catch (err) {
      this.requestFailure()
    }
  }

  onAcceptOffer = async () => {
    const { user, order } = this.props
    const { refund } = this.state

    const issues = order.ingredientIds.map((ingredientId) => (
      { ingredient_id: ingredientId, category_id: 98 }
    ))

    try {
      const response = await setComplaint(user.accessToken, {
        customer_id: Number(user.id),
        order_id: Number(order.id),
        type: refund.type,
        value: refund.value,
        issues
      })

      redirect(routes.getHelp.confirmation)

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
