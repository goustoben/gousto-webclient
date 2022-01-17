import React from 'react'
import css from '../FiveRecipesModal.module.css'

export const EndOfJourneyNewUserModal = () => (
  <>
    <h4 className={css.subHeader}>Shh, let’s keep this between us</h4>
    <p className={css.content}>
      A 5th recipe is something we’re exploring, so it’s great to see you’re interested. You’re one
      of the select few who have seen it so far - thank you for helping us learn more.
    </p>

    <span className={css.happyWithChoiceCopy}>
      <strong>There are only 4 recipes in your box</strong>, so please check you're happy with them.
    </span>
  </>
)
