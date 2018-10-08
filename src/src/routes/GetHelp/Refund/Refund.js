import React, { PropTypes, PureComponent } from 'react'
import Loading from 'Loading'
import BottomBar from 'BottomBar'
import BottomButton from '../components/BottomButton'
import GetHelpLayout from 'layouts/GetHelpLayout'

import { Button } from 'goustouicomponents'
import { client as routes } from 'config/routes'
import { redirect } from 'utils/window'
import { replaceWithValues } from 'utils/text'
import { fetchRefundAmount, setComplaint } from 'apis/getHelp'

import css from './Refund.css'

const getRefund = async () => (
	new Promise(async (resolve, reject) => {
		try {
			const response = await fetchRefundAmount()

			return resolve({ error: null, result: response.data })
		} catch (error) {
			return reject({ error })
		}
	})
)

const sendAcceptedOffer = async ({ user, order }) => (
	new Promise(async (resolve, reject) => {
		try {
			const response = await setComplaint(user.accessToken, {
				user_id: user.id,
				order_id: order.id,
			})

			return resolve({ error: null, result: response.data })
		} catch (error) {
			return reject({ error })
		}
	})
)

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
			id: PropTypes.number.isRequired
		}),
	}

	state = {
		refundAmount: 0,
		isFetching: true,
		didFetchError: false,
	}

	componentDidMount() {
		const tryGetRefund = async () => {
			const { error, result } = await getRefund()

			if (error) {
				return this.requestFailure()
			}

			return this.setState({
				...this.state,
				isFetching: false,
				refundAmount: result.refundValue
			})
		}

		tryGetRefund()
	}

	onAcceptOffer = async () => {
		const { error } = await sendAcceptedOffer(this.props)

		if (error) {
			return this.requestFailure()
		}

		return redirect(routes.getHelp.confirmation)
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
		const { refundAmount, isFetching, didFetchError } = this.state
		const infoBodyWithAmount = replaceWithValues(content.infoBody, {
			refundAmount: refundAmount.toFixed(2)
		})
		const button2WithAmount = replaceWithValues(content.button2, {
			refundAmount: refundAmount.toFixed(2)
		})
		const getHelpLayoutbody = (isFetching || didFetchError)
			? ''
			:  infoBodyWithAmount


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
						<p>{(didFetchError)
							? content.errorBody
							: content.confirmationBody}
						</p>
						<BottomBar>
							<BottomButton
								color="secondary"
								url={`${routes.getHelp.index}/${routes.getHelp.contact}`}
								clientRouted
							>
								{content.button1}
							</BottomButton>
							{(didFetchError)
								? null
								: <Button
									className={css.button}
									color="primary"
									onClick={() => {
										this.onAcceptOffer(this.props)
									}}
								>
									{button2WithAmount}
								</Button>
							}
						</BottomBar>
					</div>
				}
			</GetHelpLayout>
		)
	}
}

export default Refund
