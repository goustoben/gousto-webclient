import PropTypes from 'prop-types'
import React from 'react'
import NoResultsPage from 'NoResultsPage'
import css from './MenuNoResults.css'

const getNoResultsPageProps = () => {
  const imageName = '0-result'
  const title = <span>Oh Crumbs! No recipes found</span>
  const description = <span>Either the link you clicked is out of date, or the URL has a mistake.</span>

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
      (hasFilters) ?
      <div>
        <NoResultsPage
          imageName={noResultsAtributs.imageName}
          title={noResultsAtributs.title}
          description={noResultsAtributs.description}
        />
        <span role="button" tabIndex={0} className={css.clearAllFilters} onClick={() => clearAllFilters()} onKeyPress={() => clearAllFilters()}>Show all recipes</span>
      </div> : null
    )
  }
}

export default MenuNoResults
