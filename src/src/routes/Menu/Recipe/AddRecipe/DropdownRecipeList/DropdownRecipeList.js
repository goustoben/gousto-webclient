import React from 'react'
import { InputRadio } from 'goustouicomponents'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './DropdownRecipeList.css'

class DropdownRecipeList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checkedValue: ''
    }
  }

  componentDidMount() {
    const { selectedRecipe: { coreRecipeId } } = this.props
    this.setState({
      checkedValue: coreRecipeId,
    })
  }

  changeCheckedRecipe = (e) => {
    this.setState({
      checkedValue: e.target.value,
    })
  }

  preventPropagation = (e) => {
    e.stopPropagation()
  }

  render() {
    const { recipeVariants, selectedRecipe, isOnDetailScreen } = this.props
    const { checkedValue } = this.state
    const itemClassName = (isChecked) => (classnames(
      { [css.listItem]: !isOnDetailScreen },
      { [css.listItemWithBorder]: isOnDetailScreen },
      { [css.listItemWithBlueBorder]: isChecked && isOnDetailScreen}
    ))

    if (!recipeVariants || recipeVariants.length === 0) {
      return null
    }

    return (
      <div className={css.dropdownList} role="button" tabIndex={-1} onClick={this.preventPropagation} onKeyPress={this.preventPropagation}>
        {isOnDetailScreen && <h2 className={css.variantsTitle}>Variants available</h2>}
        <ul className={css.dropdownListText}>
          <li className={itemClassName(checkedValue === selectedRecipe.coreRecipeId)} key={selectedRecipe.coreRecipeId}>
            <InputRadio
              id={selectedRecipe.coreRecipeId}
              name="variantList"
              value={selectedRecipe.coreRecipeId}
              onChange={this.changeCheckedRecipe}
              isChecked={checkedValue === selectedRecipe.coreRecipeId}
            >
              <span>{selectedRecipe.displayName}</span>
            </InputRadio>
          </li>
          {recipeVariants.map((variant) => (
            <li className={itemClassName(checkedValue === variant.coreRecipeId)} key={variant.coreRecipeId}>
              <InputRadio
                id={variant.coreRecipeId}
                name="variantList"
                value={variant.coreRecipeId}
                onChange={this.changeCheckedRecipe}
                isChecked={checkedValue === variant.coreRecipeId}
              >
                <span>{variant.displayName}</span>
              </InputRadio>
            </li>
          )) }
        </ul>
      </div>
    )
  }
}

DropdownRecipeList.propTypes = {
  recipeVariants: PropTypes.arrayOf(PropTypes.shape),
  selectedRecipe: PropTypes.shape({
    coreRecipeId: PropTypes.string,
    displayName: PropTypes.string
  }),
  isOnDetailScreen: PropTypes.bool,
}

DropdownRecipeList.defaultProps = {
  recipeVariants: [],
  selectedRecipe: {},
  isOnDetailScreen: false
}
export { DropdownRecipeList }
