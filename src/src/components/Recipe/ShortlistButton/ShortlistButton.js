import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import classnames from 'classnames'
import css from './ShortlistButton.css'

class ShortlistButton extends React.PureComponent {

  static propTypes = {
    shortlistLimitReached: PropTypes.bool,
    addToShortlist: PropTypes.func,
    removeFromShortlist: PropTypes.func,
    menuBrowseCTAVisibilityChange: PropTypes.func,
    stock: PropTypes.number,
    id: PropTypes.string,
    position: PropTypes.number,
    display: PropTypes.string
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
    const { addToShortlist, menuBrowseCTAVisibilityChange, id, position, stock } = this.props
    const positionObject = { position }

    const add = () => addToShortlist(id, false, positionObject)
    if (stock !== null) {
      add()
      this.setState({
        recipeInShortlist: true,
      })
    } else {
      menuBrowseCTAVisibilityChange(true)
    }
  }

  render() {
    const { shortlistLimitReached, display } = this.props
    const { recipeInShortlist } = this.state
    const heartIcon = recipeInShortlist ? "icon_shortlist_heart_selected" : "icon_shortlist_heart_deselected"
    const classes = classnames(
      (recipeInShortlist ? css.redHeartButton : (shortlistLimitReached ? css.greyHeartButton : css.blueHeartButton)),
      (display === 'detailOverlay' ? css.defaultDetailView : null)
    )

    return (
      <button id='shortlistButton' type="button" disabled={shortlistLimitReached &&!recipeInShortlist} onClick={this.onShortlistClick} onKeyPress={this.onShortlistClick} className={classes} tabIndex={0}>
        <Svg fileName={heartIcon} className={css.heartIcon}/>
      </button>
    )
  }
}

export { ShortlistButton }
