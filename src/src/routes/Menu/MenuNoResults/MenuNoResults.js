import PropTypes from 'prop-types'
import React from 'react'
import NoResultsPage from 'NoResultsPage'
import Content from 'containers/Content'
import css from './MenuNoResults.css'

const getNoResultsPageProps = () => {
  const imageName = '0-result'
  const title = (<Content contentKeys="recipesNoResultTitle">
		<span>Oh Crumbs! No recipes found</span>
                 </Content>)
  const description = (<Content contentKeys="recipesNoResultDescription">
		<span>Due to the filters you applied, we do not have any recipes that fit your dietary preferences. Clear filters to see all results.</span>
                       </Content>)

  return {
    imageName,
    title,
    description,
  }
}

class MenuNoResults extends React.PureComponent {
	static propTypes = {
	  hasFilters: PropTypes.bool,
	  clearAllFilters: PropTypes.func,
	  filtersMenuVisible: PropTypes.bool,
	  trackRecipeOrderDisplayed: PropTypes.func,
	}

	componentDidMount() {
	  this.props.trackRecipeOrderDisplayed([], [])
	}

	componentDidUpdate() {
	  this.props.trackRecipeOrderDisplayed([], [])
	}

	render() {
	  const { clearAllFilters, hasFilters } = this.props
	  const noResultsAtributs = getNoResultsPageProps()

	  return (
	    (hasFilters) ? <div>
				<NoResultsPage
				  imageName={noResultsAtributs.imageName}
				  title={noResultsAtributs.title}
				  description={noResultsAtributs.description}
				/>
				<span className={css.clearAllFilters} onClick={() => clearAllFilters()}>Clear filters</span>
                    </div> : null
	  )
	}
}

export default MenuNoResults
