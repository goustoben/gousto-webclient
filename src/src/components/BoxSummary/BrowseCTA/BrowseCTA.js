import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'goustouicomponents'
import css from './BrowseCTA.css'

const handleClick = (menuBrowseCTAVisibilityChange, boxDetailsVisibilityChange, view) => ((e) => {
  e.preventDefault()
  e.stopPropagation()

  menuBrowseCTAVisibilityChange(false)
  boxDetailsVisibilityChange(true, view)
})

const BrowseCTA = ({ menuBrowseCTAShow, boxDetailsVisibilityChange, menuBrowseCTAVisibilityChange, view }) => (
  <div className={menuBrowseCTAShow ? css[`container-${view}`] : css[`containerHidden-${view}`]} onClick={handleClick(menuBrowseCTAVisibilityChange, boxDetailsVisibilityChange, view)}>
    <div className={menuBrowseCTAShow ? css[`show-${view}`] : css.hidden}>
      <div className={css.textContainer}>
        <p className={css.header}>Ready to choose some recipes?</p>
        <p className={css.text}>Please tell us where and when you'd like your box so we can show you the latest recipes</p>
        <div className={css.button}>
          <Button width="full">
            Get Started
          </Button>
        </div>
      </div>
      <span className={css.arrow} />
    </div>
  </div>
)

BrowseCTA.propTypes = {
  menuBrowseCTAShow: PropTypes.bool,
  boxDetailsVisibilityChange: PropTypes.func,
  menuBrowseCTAVisibilityChange: PropTypes.func,
  view: PropTypes.string,
}

export default BrowseCTA
