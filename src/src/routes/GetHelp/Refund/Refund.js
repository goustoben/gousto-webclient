import React, { PropTypes, PureComponent } from 'react'
import { replaceWithValues } from 'utils/text'

import BottomBar from 'BottomBar'
import BottomButton from '../components/BottomButton'

import GetHelpLayout from 'layouts/GetHelpLayout'
import Loading from 'Loading'

import { client as routes } from 'config/routes'
import { fetchRefundAmount } from 'apis/getHelp'

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

	static defaultProps = {
		orderIssues: [],
	}

	state = {
		refundAmount: 0,
		isFetchingAmount: true,
		didFetchAmountErrored: false,
	}

	componentDidMount() {
		this.setState({ isFetchingAmount: true, didFetchAmountErrored: false })
		fetchRefundAmount().then(response => {
			this.setState({
				refundAmount: response.data.refundValue,
				isFetchingAmount: false,
			})
		}).catch(() => {
			this.setState({ didFetchAmountErrored: true, isFetchingAmount: false })
		})
	}

	render() {
		const { refundAmount, isFetchingAmount, didFetchAmountErrored } = this.state
		const {
			content: {
				title,
				infoBody,
				confirmationBody,
				errorBody,
				button1,
				button2,
			}
		} = this.props
		const { index, contact } = routes.getHelp
		const contactUrl = `${index}/${contact}`
		const infoBodyWithAmount = replaceWithValues(infoBody, {
			refundAmount: refundAmount.toFixed(2)
		})
		const button2WithAmount = replaceWithValues(button2, {
			refundAmount: refundAmount.toFixed(2)
		})

		const getHelpLayoutbody = (isFetchingAmount || didFetchAmountErrored) ? '' :  infoBodyWithAmount

		return (
			<GetHelpLayout
				title={title}
				body={getHelpLayoutbody}
				fullWidthContent
			>
				{isFetchingAmount ?
					<Loading/>
				:
					<div>
						<p>{didFetchAmountErrored ? errorBody : confirmationBody}</p>
						<BottomBar>
							<BottomButton color="secondary" url={contactUrl} clientRouted>
								{button1}
							</BottomButton>
							<BottomButton color="primary" url={contactUrl} clientRouted>
								{button2WithAmount}
							</BottomButton>
						</BottomBar>
					</div>
				}
			</GetHelpLayout>
		)
	}
}

export default Refund
