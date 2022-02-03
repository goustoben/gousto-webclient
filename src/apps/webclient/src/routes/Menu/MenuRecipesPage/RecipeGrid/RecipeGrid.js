import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { RecipeListWrapper } from '../RecipeList'
import { DetailOverlay } from '../../components/Detail'

import css from '../../Menu.css'

class RecipeGrid extends PureComponent {
  constructor() {
    super()
    this.state = {
      shouldShowOverlay: false,
    }
  }

  componentDidMount() {
    this.setState({ shouldShowOverlay: true })
  }

  render() {
    const { shouldShowOverlay } = this.state

    return (
      <div
        className={css.menuContainer}
        data-testing="menuRecipesList"
      >
        <RecipeListWrapper />
        <DetailOverlay
          showOverlay={shouldShowOverlay}
        />
      </div>
    )
  }
}

RecipeGrid.propTypes = {
  query: PropTypes.shape({
    collection: PropTypes.string,
  }),
}

RecipeGrid.defaultProps = {
  query: {}
}

export { RecipeGrid }
