import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SimplifiedRecipeListContainer } from '../SimplifiedRecipeList'
import DetailOverlay from '../../DetailOverlay'
import Loading from '../../Loading'
import css from './SimplifiedMenuRecipesPage.css'
import { VerticalCollectionsNavContainer } from '../VerticalCollectionsNav'

class SimplifiedMenuRecipesPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      shouldShowOverlay: false,
    }
  }

  componentDidMount() {
    this.setState({ shouldShowOverlay: true })
  }

  render() {
    const { shouldShowOverlay } = this.state
    const { showLoading, stateRecipeCount } = this.props
    const fadeCss = (showLoading) ? css.fadeOut : css.willFade

    return (
      <div className={fadeCss} data-testing="menuRecipes">
        <Loading loading={showLoading} />
        <VerticalCollectionsNavContainer />
        {stateRecipeCount && <SimplifiedRecipeListContainer />}
        <DetailOverlay
          showOverlay={shouldShowOverlay}
        />
      </div>
    )
  }
}

SimplifiedMenuRecipesPage.propTypes = {
  showLoading: PropTypes.bool.isRequired,
  stateRecipeCount: PropTypes.number.isRequired
}

export { SimplifiedMenuRecipesPage }
