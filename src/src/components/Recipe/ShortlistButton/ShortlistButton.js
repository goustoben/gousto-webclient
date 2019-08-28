import React from 'react'
import Svg from 'Svg'
import css from './ShortlistButton.css'

const ShortlistButton = () => {

  return (
    <div role="button" className={css.blueHeartButton}>
      <Svg fileName={"icon_shortlist_heart_deselected"} className={css.heartIcon}/>
    </div>
  )
}

export { ShortlistButton }
