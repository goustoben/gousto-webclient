import React from 'react'
import { InputRadio } from 'goustouicomponents'
import PropTypes from 'prop-types'
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
    const { recipeVariants, selectedRecipe } = this.props
    const { checkedValue } = this.state

    return (
      <div className={css.dropdownList} role="button" tabIndex={-1} onClick={this.preventPropagation} onKeyPress={this.preventPropagation}>
        <ul className={css.dropdownListText}>
          <li className={css.listItem} key={selectedRecipe.coreRecipeId}>
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
            <li className={css.listItem} key={variant.coreRecipeId}>
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
}

DropdownRecipeList.defaultProps = {
  recipeVariants: [],
  selectedRecipe: {},
}
export { DropdownRecipeList }
