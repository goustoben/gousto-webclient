import React, { PropTypes } from 'react'
import { propType } from 'graphql-anywhere'
import css from './BoxPrices.css'
import config from 'config/boxprices'
import Loading from 'Loading'
import Hero from 'Hero'

import boxPriceQuery from './boxprices.gql'
import BoxPricesList from './BoxPricesList'
import BoxPricesContent from './BoxPricesContent'

class BoxPrices extends React.PureComponent {
	static propTypes = {
		data: PropTypes.shape({
			...propType(boxPriceQuery),
			loading: PropTypes.boolean,
			error: PropTypes.object,
		}),
	}

	static defaultProps = {}

	render() {
		const { boxPrices, loading, error } = this.props.data

		return (
			<div>
				{loading && <div className={css.loadingOverlay}><Loading /></div>}
				<div className={loading && css.loading}>
					<Hero
						style={{ backgroundPosition: '0 66%', backgroundSize: 'cover' }}
						imageUrl={config.hero.image}
						headerText={config.hero.header}
					/>
					{!loading && <BoxPricesList boxPrices={boxPrices || []} type="gourmet" error={error} />}
					<BoxPricesContent />
				</div>
			</div>
		)
	}
}

export default BoxPrices
