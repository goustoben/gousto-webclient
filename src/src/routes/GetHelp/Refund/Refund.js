import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import BottomBar from 'BottomBar'
import { BottomButton } from '../components/BottomButton'

import GetHelpLayout from 'layouts/GetHelpLayout'
import Loading from 'Loading'

import { Button } from 'goustouicomponents'
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
			id: PropTypes.string.isRequired
		}),
	}

	state = {
		refundAmount: 0,
		isFetching: true,
		didFetchError: false,
	}

	componentDidMount() {
		this.getRefund()
	}

	getRefund = async () => {
		try {
			const response = await fetchRefundAmount()

			this.setState({
				...this.state,
				isFetching: false,
				refundAmount: response.data.refundValue
			})
		} catch (err) {
			this.requestFailure()
		}
	}

	onAcceptOffer = async ({ user, order }) => {
		try {
			const response = await setComplaint(user.accessToken, {
				user_id: user.id,
				order_id: order.id,
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
			refundAmount,
			didFetchError
		} = this.state
		const infoBodyWithAmount = replaceWithValues(
			content.infoBody, {
				refundAmount: refundAmount.toFixed(2)
			}
		)
		const button2WithAmount = replaceWithValues(
			content.button2, {
				refundAmount: refundAmount.toFixed(2)
			}
		)
		const getHelpLayoutbody = (isFetching || didFetchError)
			? ''
			:  infoBodyWithAmount
		const confirmationContent = (didFetchError)
			? content.errorBody
			: content.confirmationBody
		const acceptButton = (didFetchError)
			? null
			: <Button
				className={css.button}
				color="primary"
				onClick={() => this.onAcceptOffer(this.props)}
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
