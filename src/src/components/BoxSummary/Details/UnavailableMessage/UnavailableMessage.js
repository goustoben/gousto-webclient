import React from 'react'
import { PropTypes } from 'prop-types'
import Immutable from 'immutable'
import css from '../Details.css'

const UnavailableMessage = ({ unavailableRecipeList, menuFetchPending, orderSaveError, clearSlot, basketRestorePreviousDate }) => {
  const plural = unavailableRecipeList.size > 1

  return (unavailableRecipeList.size > 0 && !menuFetchPending) ?
    <span className={css.notAvailableText}>
      <span className={css.warningIcon}></span>
      The following {plural ? 'recipes are' : 'recipe is'} no longer available. Please choose {plural ? 'different recipes' : 'another recipe'}, or&nbsp;
      {
        orderSaveError === 'no-stock'
          ? <button type='button' className={css.undoLink} onClick={clearSlot}>choose a later date</button>
          : <button type='button' className={css.undoLink} onClick={basketRestorePreviousDate}>undo your date change</button>
      }
    </span> :
    null
}

UnavailableMessage.propTypes = {
  unavailableRecipeList: PropTypes.instanceOf(Immutable.Map),
  menuFetchPending: PropTypes.bool,
  orderSaveError: PropTypes.string,
  clearSlot: PropTypes.func,
  basketRestorePreviousDate: PropTypes.func,
}

export { UnavailableMessage }
