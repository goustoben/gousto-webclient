import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import css from './ShortlistButton.css'

class ShortlistButton extends React.PureComponent {

  static propTypes = {
    shortlistLimitReached: PropTypes.bool,
    addToShortlist: PropTypes.func,
    removeFromShortlist: PropTypes.func,
    stock: PropTypes.number,
    id: PropTypes.string,
    position: PropTypes.number
  }

  constructor() {
    super()
    this.state = {
      recipeInShortlist: false
    }
  }

  onShortlistClick = () => {
    const { removeFromShortlist, id, shortlistLimitReached } = this.props
    const { recipeInShortlist } = this.state
    const remove = () => removeFromShortlist(id)

    if(recipeInShortlist) {
      remove()
      this.setState({
        recipeInShortlist: false,
      })
    } else if (!shortlistLimitReached && !recipeInShortlist) {
      this.handleAdd()
    }
  }

  handleAdd = () => {
    const { addToShortlist, id, position, stock } = this.props
    const positionObject = { position }

    const add = () => addToShortlist(id, false, positionObject)
    if (stock !== null) {
      add()
      this.setState({
        recipeInShortlist: true,
      })
    }
  }

  render() {
    const { recipeInShortlist } = this.state
    const heartIcon = recipeInShortlist ? "icon_shortlist_heart_selected" : "icon_shortlist_heart_deselected"
    const classNames = recipeInShortlist ? css.redHeartButton : css.blueHeartButton

    return (
      <div id='shortlistButton' role="button" onClick={this.onShortlistClick} onKeyPress={this.onShortlistClick} className={classNames} tabIndex={0}>
        <Svg fileName={heartIcon} className={css.heartIcon}/>
      </div>
    )
  }
}

export { ShortlistButton }
