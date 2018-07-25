const React = require('react')
const CONFIG = require('@fe/gousto-config')
const CONSTANTS = CONFIG.BOX_PRICES
const Gousto = require('@fe/gousto-generic')
const Cookie = require('cookies-js')

const BoxType = require('./BoxType')
const BoxInfo = require('./BoxInfo')

class BoxPricesList extends React.Component {
	constructor() {
		super()

		this.state = {
			boxPrices: null,
		}
	}

	componentDidMount() {
		const url = `${CONFIG.ENDPOINTS.BASE}/boxPrices`
		let args = {}
		let tariffId

		const authCookie = Cookie.get(`${CONFIG.STATE_COOKIE_VERSION}oauth_token`)
		const authToken = JSON.parse(authCookie || '{}').access_token

		if (!authToken) {
			const featuresCookie = Cookie.get(`${CONFIG.STATE_COOKIE_VERSION}goustoStateStore_features`)
			const features = JSON.parse(JSON.parse(featuresCookie || '"{}"'))
			tariffId = features.checkoutTariff ? features.checkoutTariff.value : undefined

			if (tariffId) {
				args = {
					tariff_id: tariffId,
				}
			}
		}

		Gousto.ajaxCall(url, 'GET', args, (data) => {
			const prices = {}
			Object
				.keys(data)
				.filter(key => key !== '8')
				.forEach((key) => {
					prices[key] = data[key]
				})
			this.setState({
				boxPrices: prices,
			})
		}, undefined, undefined, undefined, authToken)
	}

	render() {
		const boxPrices = this.state.boxPrices

		if (boxPrices === null) {
			return (<div></div>)
		}

		return (
			<div className="box-prices-box-type-container flex-center-all container">
				{Object.keys(boxPrices).map(boxType => {
					const imgClassName = `box-prices-box-img box-prices-box-size`

					return (
						<div className="col-xs-12 col-sm-5 box-prices-box-container" key={boxType} >
							<BoxType boxType={boxType} className="heading">
								<p>{CONSTANTS.BOX_STRAPLINES[boxType]}</p>
								<Gousto.Image src={Gousto.Image.imagePath(CONSTANTS.BOX_IMAGES[boxType])} className={imgClassName} />
								<p>Recipes in your box</p>
								{Object.keys(boxPrices[boxType]).map(portionsPerMeal => (
									<div className="col-xs-12 col-sm-4 box-prices-info" key={portionsPerMeal} >
										<BoxInfo
											portionsPerMeal={portionsPerMeal}
											totalPrice={boxPrices[boxType][portionsPerMeal][CONSTANTS.DEFAULT_BOX_TYPE].total}
											pricePerPortion={boxPrices[boxType][portionsPerMeal][CONSTANTS.DEFAULT_BOX_TYPE].price_per_portion}
										/>
									</div>
								))}
								<div className="col-xs-12 box-prices-actions">
									<div className="icon-container">
										<Gousto.Image src={Gousto.Image.imagePath(CONSTANTS.BOX_ICONS[boxType])} className="box-prices-box-icon" />
									</div>
									<p className="text"> Delivery is <span className="strong">FREE</span></p>
									<Gousto.LinkButton type="primary" href={CONSTANTS.BOX_LINKS[boxType]}>
										Build My Box
									</Gousto.LinkButton>
								</div>
							</BoxType>
						</div>
					)
				})}
			</div>
		)
	}
}

module.exports = BoxPricesList
