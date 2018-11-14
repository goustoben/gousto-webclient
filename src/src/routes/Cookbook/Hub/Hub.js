import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import redirectActions from 'actions/redirect'
import collectionActions from 'actions/collections'
import cookbookActions from 'actions/cookbook'
import actionTypes from 'actions/actionTypes'
import routesConfig from 'config/routes'
import templateConfig from 'config/template'
import logger from 'utils/logger'
import recipeUtils from 'utils/recipe'

import Helmet from 'react-helmet'
import { H1 } from 'Page/Header'
import { PageContent, PageHeader } from 'Page'
import { Div, Section } from 'Page/Elements'
import { Col, Row } from 'Page/Grid'
import { LoadingOverlay } from 'Loading'
import Link from 'Link'
import LoadMoreLink from 'LoadMoreLink'
import Image from 'Recipe/Image'
import Info from 'Recipe/Info'
import Rating from 'Recipe/Rating'
import Tag from 'Recipe/Tag'
import Title from 'Recipe/Title'
import CookingTime from 'Recipe/CookingTime'

import css from './Hub.css'

function gatherRecipeKeywords(recipes = []) {
  let cuisines = Immutable.Set([])
  let keywords = Immutable.Set(templateConfig.head.keywords.split(',') || [])

  recipes.forEach(recipe => {
    const { base, cuisine, dishType, protein, tags = [] } = recipe.toJS()

    tags.forEach(tag => { keywords = keywords.add(tag) })
    keywords = base ? keywords.add(base) : keywords
    keywords = dishType ? keywords.add(dishType) : keywords
    keywords = protein ? keywords.add(protein) : keywords
    cuisines = cuisine ? cuisines.add(cuisine) : cuisines
  })

  if (cuisines.size && cuisines.size < 6) {
    cuisines.forEach(cuisine => { keywords = keywords.add(cuisine) })
  }

  return keywords
}

class Hub extends React.PureComponent {
	static contextTypes = {
	  store: PropTypes.object.isRequired,
	}

	static limit = 20

	static propTypes = {
	  collection: PropTypes.instanceOf(Immutable.Map),
	  endSet: PropTypes.number.isRequired,
	  fetchSetData: PropTypes.func.isRequired,
	  isLoading: PropTypes.bool,
	  limit: PropTypes.number.isRequired,
	  loadedRecipesCollectionId: PropTypes.string,
	  loadSets: PropTypes.func.isRequired,
	  loadNextSet: PropTypes.func.isRequired,
	  mobileFullWidth: PropTypes.bool,
	  params: PropTypes.object.isRequired,
	  recipes: PropTypes.instanceOf(Immutable.List),
	  recipesCollection: PropTypes.string,
	  resetSets: PropTypes.func.isRequired,
	  startSet: PropTypes.number.isRequired,
	  stock: PropTypes.number,
	  totalSets: PropTypes.number.isRequired,
	}

	static defaultProps = {
	  collection: Immutable.Map({}),
	  mobileFullWidth: true,
	  recipes: Immutable.List([]),
	}

	static async fetchData({ store, params, setNum = 1 }) {
	  await store.dispatch(collectionActions.collectionsLoadCollectionBySlug(params.collectionSlug))

	  if (store.getState().error.get(actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS)) {
	    logger.error(`Cookbook hub not available for collection slug: ${params.collectionSlug}`)

	    return store.dispatch(redirectActions.redirect(routesConfig.client.cookbook))
	  }

	  return Hub.fetchRecipes({ store, params, setNum })
	}

	static fetchRecipes({ store, params, setNum = 1 }) {
	  const loadedCollection = store.getState().collections.find(collection => collection.get('slug') === params.collectionSlug)

	  return store.dispatch(cookbookActions.cookbookLoadCollectionRecipes(loadedCollection.get('id'), { limit: Hub.limit, setNum }))
	}

	async componentDidMount() {
	  const store = this.context.store
	  const { collection, fetchSetData, params, recipesCollection, resetSets, startSet } = this.props

	  if (collection.get('slug') !== params.collectionSlug || collection.get('id') !== recipesCollection) {
	    resetSets()
	    await Hub.fetchData({ store, params, setNum: startSet })
	  }

	  // preload next set data
	  return fetchSetData(startSet + 1)
	}

	renderMetaData = () => {
	  const { collection, recipes } = this.props
	  const metaData = []
	  const metaTitle = collection.get('metaTitle')
	  const metaDescription = collection.get('metaDescription')
	  const imageUrls = collection.getIn(['media', 'images', 'urls'])
	  const imageSrc = imageUrls && imageUrls.size ? imageUrls.last().get('src') : undefined

	  if (recipes) {
	    metaData.push(
	      {
	        name: 'keywords',
	        content: gatherRecipeKeywords(recipes.slice(0, this.limit)).join(','),
	      },
	    )
	  }

	  if (metaTitle) {
	    metaData.push(
	      {
	        property: 'og:title',
	        content: metaTitle,
	      },
	      {
	        name: 'twitter:title',
	        content: metaTitle,
	      },
	    )
	  }

	  if (metaDescription) {
	    metaData.push(
	      {
	        name: 'description',
	        content: metaDescription,
	      },
	      {
	        property: 'og:description',
	        content: metaDescription,
	      },
	      {
	        name: 'twitter:description',
	        content: metaDescription,
	      },
	    )
	  }

	  if (imageSrc) {
	    metaData.push(
	      {
	        property: 'og:image',
	        content: imageSrc,
	      },
	      {
	        name: 'twitter:image',
	        content: imageSrc,
	      },
	    )
	  }

	  return (
			<Helmet
			  title={metaTitle}
			  meta={metaData}
			/>
	  )
	}

	renderRecipe(recipe) {
	  const { cookingTime, rating = {}, title, url } = recipe.toJS()
	  const tag = recipeUtils.getLowStockTag(this.props.stock, rating.count)
	  const media = recipe.getIn(['media', 'images'], Immutable.List([])).find(obj => obj && (obj.get('type') === 'mood-image'))
	  const urls = media ? media.get('urls') : Immutable.List([])

	  return (
			<div className={classNames(css.recipe)}>
				<Link to={url} className={css.cookbookLink} clientRouted={false}>
					<Image
					  view="simple"
					  media={urls}
					  alt={title}
					/>
					<Info regular>
						{<div className={css.recipeInfo}>
							<Title
							  title={title}
							  linkUnderlined
							  headlineFont
							/>
							<span>
								<Tag
								  tag={tag}
								  centered={false}
								  spaced={false}
								/>
								<Rating
								  view="simple"
								  average={rating.average}
								  count={rating.count}
								/>
								<CookingTime
								  time={cookingTime}
								/>
							</span>
						</div>}
					</Info>
				</Link>
			</div>
	  )
	}

	renderRecipes = () => (
	  this.props.recipes.map(recipe => (
			<Col
			  key={recipe.get('id')}
			  col-xs-12
			  col-sm-6
			  col-xl-4
			>
				{this.renderRecipe(recipe)}
			</Col>
	  ))
	)

	render() {
	  const { collection, endSet, isLoading, loadNextSet, mobileFullWidth, totalSets } = this.props

	  return (
			<Section>
				{this.renderMetaData()}
				{collection && (
					<PageHeader title={collection.get('shortTitle')}>
						<p>{collection.get('description')}</p>
					</PageHeader>
				)}
				{isLoading && <LoadingOverlay />}
				<PageContent
				  fadeOut={isLoading}
				>
					<Row fullBleedMobile={mobileFullWidth}>
						<Col
						  col-xs-12
						  col-lg-8
						  col-xl-9
						>
							<Row className={css.recipeContainer}>
								{this.renderRecipes()}
							</Row>

							{endSet < totalSets &&
								<Div margin={{ top: 'XXL', bottom: 'XXL' }}>
									<LoadMoreLink onClick={loadNextSet} />
								</Div>
							}
						</Col>
						<Col
						  col-xs-12
						  col-lg-4
						  col-xl-3
						  className={classNames(css.tips)}
						>
							<Div padding={{ left: 'MD', right: 'MD' }}>
								<H1 headlineFont>{collection.get('tipsTitle')}</H1>
								<p>{collection.get('tips')}</p>
							</Div>
						</Col>
					</Row>
				</PageContent>
			</Section>
	  )
	}
}

export default Hub
export const fetchData = Hub.fetchData
export const fetchSetData = Hub.fetchRecipes
export const limit = Hub.limit
