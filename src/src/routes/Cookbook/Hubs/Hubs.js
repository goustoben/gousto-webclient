import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import cookbookActions from 'actions/cookbook'

import Helmet from 'react-helmet'
import { Div, Section } from 'Page/Elements'
import { PageContent, PageHeader } from 'Page'
import { LoadingOverlay } from 'Loading'
import LoadMoreLink from 'LoadMoreLink'
import Content from 'containers/Content'
import CollectionList from './CollectionListContainer'

class Hubs extends React.PureComponent {
  static PropTypes = {
    collectionSets: PropTypes.instanceOf(Immutable.Map),
    endSet: PropTypes.number.isRequired,
    fetchSetData: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    loadSets: PropTypes.func.isRequired,
    loadNextSet: PropTypes.func.isRequired,
    startSet: PropTypes.number.isRequired,
    totalSets: PropTypes.number.isRequired,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static fetchData({ store, setNum = 1 }) {
    return store.dispatch(cookbookActions.cookbookLoadCollections({ limit: Hubs.limit, setNum }))
  }

  static limit = 20

  async componentDidMount() {
    const store = this.context.store
    const { collectionSets, fetchSetData, startSet } = this.props

    if (!collectionSets.get(startSet)) {
      await Hubs.fetchData({ store, setNum: startSet })
    }

    // preload next set data
    return fetchSetData(startSet + 1)
  }

  renderMetaData = () => {
    const metaTitle = 'Recipes | Quick and Easy Dinner Ideas | Gousto'
    const metaDescription = 'Quick and easy dinner recipes to cook at home. Explore our online cookbook of recipe ideas, with a wide range of tasty meals to choose from.'

    return (
      <Helmet
        title={metaTitle}
        meta={[
          {
            property: 'og:title',
            content: metaTitle,
          },
          {
            name: 'twitter:title',
            content: metaTitle,
          },
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
        ]}
      />
    )
  }

  render() {
    const { endSet, isLoading, loadNextSet, totalSets } = this.props
    const mainTitle = (
      <Content contentKeys="cookbookMainTitle">
        <span>Recipe ideas from the Gousto Cookbook</span>
      </Content>
    )

    return (
      <Section>
        {this.renderMetaData()}
        <PageHeader title={mainTitle}>
          <p>
            <Content contentKeys="cookbookMainDescription">
              <span>Browse our full collection of inspiring recipe ideas to cook at home.
              It's a virtual world tour of cuisines, from the adventurous to the
              familiar. You'll find quick meals, family favourites and lighter
              dishes too.
       </span>
            </Content>
          </p>
        </PageHeader>
        {isLoading && <LoadingOverlay />}
        <PageContent fadeOut={isLoading}>
          <CollectionList
            colSizes={{
              xs: 12,
              sm: 6,
              lg: 4,
              xl: 3,
            }}
            fullBleedMobile
          />
          {endSet < totalSets &&
            <Div margin={{ top: 'XXL', bottom: 'XXL' }}>
              <LoadMoreLink onClick={loadNextSet} />
            </Div>
          }
        </PageContent>
      </Section>
    )
  }
}

export default Hubs
export const fetchData = Hubs.fetchData
export const fetchSetData = Hubs.fetchData
export const limit = Hubs.limit
