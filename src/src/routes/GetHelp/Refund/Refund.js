import React, { PropTypes, PureComponent } from 'react'
import Loading from 'Loading'
import BottomBar from 'BottomBar'
import BottomButton from '../components/BottomButton'
import GetHelpLayout from 'layouts/GetHelpLayout'

import { Button } from 'goustouicomponents'
import { client as routes } from 'config/routes'
import { redirect } from 'utils/window'
import { setComplaint } from 'apis/complaints'
import { replaceWithValues } from 'utils/text'
import { fetchRefundAmount } from 'apis/getHelp'

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
	}

	state = {
		refundAmount: 0,
		isFetchingAmount: true,
		didFetchAmountError: false,
		setComplainError: null,
	}

	formatErrors(errors) {
		if (Array.isArray(errors)) {
			return errors.reduce((str, error) => `${str} ${error.message}`, '')
		}

		return errors
	}

	getRefund = async () => {
		const responseHandler = (updatedState) => {
			const newState = {
				...this.state,
				...updatedState
			}
			this.setState(newState)
		}

		try {
			const response = await fetchRefundAmount()

			responseHandler({
				refundAmount: response.data.refundValue,
				isFetchingAmount: false,
			})
		} catch (err) {
			responseHandler({
				didFetchAmountError: true,
				isFetchingAmount: false,
			})
		}
	}

	componentDidMount() {
		this.getRefund()
	}

	onAcceptOffer = async () => {
		const category = {
			id: 3,
			name: 'Missing Ingredients',
			department_id: 1,
			tags: 'Picking Errors|Ingredients',
			choosable: true,
			attribute_types: [{
				id: 3,
				name: 'Missing Recipe Ingredient',
				type: 'OrderIngredient',
			}]
		}
		const attribute = {
			name: '1 seasonal British apple',
			net_weight: 0.1350,
			sub_ingredients: '',
			has_allergens: false,
			tags: 'Paprika Pork Burger, Apple Salad & Wedges',
			type_id: 3,
			reference: 21,
		}
		const { user } = this.props

		try {
			const response = await setComplaint(user.accessToken, {
				description: 'test',
				channel_id: 3,
				user_id: user.id,
				order_id: 6078374,
				issues: [{
					category,
					attributes: [attribute],
				}]
			})

			redirect(routes.getHelp.confirmation)

			return response
		} catch (err) {
			this.setState({
				...this.state,
				setComplainError: this.formatErrors(err)
			})
		}
	}

	render() {
		const { content } = this.props
		const { index, contact } = routes.getHelp
		const {
			refundAmount,
			setComplainError,
			isFetchingAmount,
			didFetchAmountError
		} = this.state
		const infoBodyWithAmount = replaceWithValues(content.infoBody, {
			refundAmount: refundAmount.toFixed(2)
		})
		const button2WithAmount = replaceWithValues(content.button2, {
			refundAmount: refundAmount.toFixed(2)
		})
		const getHelpLayoutbody = (isFetchingAmount || didFetchAmountError)
			? ''
			:  infoBodyWithAmount

		return (
			<GetHelpLayout
				title={content.title}
				body={getHelpLayoutbody}
				fullWidthContent
			>
				{(isFetchingAmount)
					? <div className={css.center}>
						<Loading className={css.loading} />
					</div>
					: <div>
						<p>{(didFetchAmountError)
							? content.errorBody
							: content.confirmationBody}
						</p>
						{setComplainError && <p>{setComplainError}</p>}
						<BottomBar>
							<BottomButton
								color="secondary"
								url={`${index}/${contact}`}
								clientRouted
							>
								{content.button1}
							</BottomButton>
							{(didFetchAmountError)
								? null
								: <Button
									className={css.button}
									color="primary"
									onClick={() => {
										this.onAcceptOffer()
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
