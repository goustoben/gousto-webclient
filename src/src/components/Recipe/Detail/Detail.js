import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import Helmet from 'react-helmet'
import DefaultDetail from 'Recipe/Detail/DefaultDetail'
import FineDineInDetail from 'Recipe/Detail/FineDineInDetail'
import { config } from './config'
import css from './Detail.css'

export const detailPropTypes = {
  media: PropTypes.instanceOf(Immutable.List),
  title: PropTypes.string,
  view: PropTypes.string,
  tag: PropTypes.string,
  count: PropTypes.number,
  average: PropTypes.number,
  per100Grams: PropTypes.instanceOf(Immutable.Map),
  perPortion: PropTypes.instanceOf(Immutable.Map),
  ingredients: PropTypes.instanceOf(Immutable.List),
  allergens: PropTypes.instanceOf(Immutable.List),

  stock: PropTypes.number,
  inBasket: PropTypes.bool,
  id: PropTypes.string,
  useWithin: PropTypes.string.isRequired,
  cookingTime: PropTypes.number.isRequired,
  availability: PropTypes.instanceOf(Immutable.List),
  cutoffDate: PropTypes.string,
  description: PropTypes.string,
  youWillNeed: PropTypes.instanceOf(Immutable.List),
  cuisine: PropTypes.string,
  diet: PropTypes.string,
  equipment: PropTypes.instanceOf(Immutable.List),

  menuRecipeDetailVisibilityChange: PropTypes.func,
  scrolledPastPoint: PropTypes.bool,
  restrictedView: PropTypes.bool,
  surcharge: PropTypes.number,
  range: PropTypes.instanceOf(Immutable.Map),
}

class Detail extends React.Component {
	static propTypes = detailPropTypes

	static defaultProps = {
	  restrictedView: false,
	}

	constructor(props) {
	  super(props)
	  this.state = { scrolledPastPoint: false }
	}

	componentDidMount() {
	  window.addEventListener('scroll', this.onScroll)
	}

	componentWillUnmount() {
	  window.removeEventListener('scroll', this.onScroll)
	}

	onScroll = () => {
	  const threshold = 295

	  if (window.pageYOffset < threshold && this.state.scrolledPastPoint) {
	    this.setState({ scrolledPastPoint: false })
	  }
	  if (window.pageYOffset >= threshold && !this.state.scrolledPastPoint) {
	    this.setState({ scrolledPastPoint: true })
	  }
	}

	getImageLink = () => {
	  const { media } = this.props
	  const image = media && media.find(imageProps => imageProps.get('width') == 700)

	  return image ? image.get('src') : config.defaultImageLink
	}

	get detailComponent() {
	  switch (this.props.view) {
	  case 'fineDineInDetail':
	    return <FineDineInDetail {...this.props} scrolledPastPoint={this.state.scrolledPastPoint} />
	  default:
	    return <DefaultDetail {...this.props} scrolledPastPoint={this.state.scrolledPastPoint} />
	  }
	}

	render() {
	  const { menuRecipeDetailVisibilityChange, title, description, range, id, surcharge } = this.props
	  const defaultPrice = config.price

	  const metaUrl = `https://www.gousto.co.uk/menu?recipeDetailId=${id}`
	  const metaImage = this.getImageLink()
	  const metaBrand = range.get('name')
	  const metaPrice = surcharge ? (defaultPrice + surcharge / 4).toFixed(2) : defaultPrice

	  return (
			<div onClick={() => { menuRecipeDetailVisibilityChange(false) }}>
				<div className={css.container} onClick={(e) => { e.stopPropagation() }}>
					<Helmet
					  meta={[
					    {
					      name: 'og:title',
					      content: title,
					    },
					    {
					      name: 'og:description',
					      content: description,
					    },
					    {
					      name: 'og:url',
					      content: metaUrl,
					    },
					    {
					      name: 'og:image',
					      content: metaImage,
					    },
					    {
					      name: 'product:brand',
					      content: metaBrand,
					    },
					    {
					      name: 'product:condition',
					      content: 'new',
					    },
					    {
					      name: 'product:price:amount',
					      content: metaPrice,
					    },
					    {
					      name: 'product:price:currency',
					      content: 'GBP',
					    },
					    {
					      name: 'product:retailer_item_id',
					      content: id,
					    },
					  ]}
					/>
					{this.detailComponent}
				</div>
			</div>
	  )
	}
}

export default Detail
