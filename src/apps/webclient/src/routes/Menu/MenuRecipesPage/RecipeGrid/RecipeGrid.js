import React, { PureComponent } from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'

import { DetailOverlay } from '../../components/Detail'
import { RecipeListWrapper } from '../RecipeList'

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
    const { doubleDeckerExperimentEnabled } = this.props

    return (
      <div
        className={classnames(css.menuContainer, {
          [css.doubleDeckerMenuContainer]: doubleDeckerExperimentEnabled,
        })}
        data-testing="menuRecipesList"
      >
        <RecipeListWrapper />
        <DetailOverlay showOverlay={shouldShowOverlay} />
      </div>
    )
  }
}

RecipeGrid.propTypes = {
  query: PropTypes.shape({
    collection: PropTypes.string,
  }),
  doubleDeckerExperimentEnabled: PropTypes.bool,
}

RecipeGrid.defaultProps = {
  query: {},
  doubleDeckerExperimentEnabled: false,
}

export { RecipeGrid }
