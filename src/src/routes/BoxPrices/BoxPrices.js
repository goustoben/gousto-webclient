import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { propType } from 'graphql-anywhere'
import config from 'config/boxprices'
import Loading from 'Loading'
import Hero from 'Hero'
import css from './BoxPrices.css'

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
				<Helmet
				  title="Gousto Prices | Try Our Food Box Delivery Now | Gousto"
				  meta={[
				    {
				      name: 'description',
				      content: "Food delivery is simple with Gousto's popular recipe kits. Find the prices for our 2-person box or our family box here. Order your first box now!",
				    },
				    {
				      name: 'keywords',
				      content: 'Gousto, recipe delivery, price, fresh, healthy food, cooking, recipe box',
				    },
				  ]}
				/>
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
