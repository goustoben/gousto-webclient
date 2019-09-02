import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'

import { Tooltip } from 'Tutorial/Tooltip'

import Svg from 'Svg'
import { checkIfElementIsVisible, getTooltipProperties } from './helper'
import css from './ShortlistTutorial.css'

class ShortlistTutorial extends PureComponent {
  static propTypes = {
    step: PropTypes.number,
    stepSelector: PropTypes.string,
    show: PropTypes.bool,
    incrementTutorialViewed: PropTypes.func,
    tutorialTracking: PropTypes.func,
  }
  state = {
    style: {},
    arrowStyle: {},
    stepSelector: '',
    stepSelectorVisible: false
  }

  componentDidMount() {
    const { stepSelector } = this.props
    this.setState((prevState) => ({
      ...prevState,
      stepSelector
    }))
    this.checkElementPresent()
    window.addEventListener('scroll', this.checkElementPresent)
    window.addEventListener('resize', this.checkElementPresent)
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.checkElementPresent()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkElementPresent)
    window.removeEventListener('resize', this.checkElementPresents)
  }

  checkElementPresent = () => {
    const { stepSelector, stepSelectorVisible } = this.state
    const newSelectorVisible = checkIfElementIsVisible(stepSelector)
    const shouldUpdate = (!stepSelectorVisible && newSelectorVisible)
    const { style, arrow, arrowStyle } = !!stepSelector && getTooltipProperties(stepSelector)

    if (shouldUpdate) {
      this.setState((prevState) => {
        return {
          ...prevState,
          arrow,
          style,
          arrowStyle,
          stepSelectorVisible: newSelectorVisible,
        }
      })
      window.removeEventListener('scroll', this.checkElementPresent)
      window.removeEventListener('resize', this.checkElementPresents)
    }
  }

  onCloseTutorial(e) {
    e.stopPropagation()
    const { incrementTutorialViewed, tutorialTracking, step } = this.props
    const tutorialName = `shortlistStep${step}`
    incrementTutorialViewed(tutorialName)
    tutorialTracking(tutorialName, step - 1, true)
  }

  render() {
    const { stepSelectorVisible, style, arrow, arrowStyle } = this.state
    const { show, step } = this.props

    const shouldShowTutorial = show && (stepSelectorVisible)

    return (shouldShowTutorial) ? (
      <div className={css.tooltip}>
        <Tooltip arrow={arrow} onClose={(e) => this.onCloseTutorial(e)} style={style} arrowStyle={arrowStyle}>
          {
            step === 1 ?
              (
                <div className={css.tooltipBody}>
                  <p className={css.title}>You can now shortlist recipes! <Svg fileName={'icon_shortlist_heart_selected'} className={css.heartIcon} /></p>
                  <p className={css.text}>Open your box summary to compare recipes and move them in or out of your box.</p>
                </div>
              ) :
              (step === 2 &&

                <div className={css.tooltipBody}>
                  <p className={css.title}>You just added a recipe to your shortlist. Nicely done!</p>
                  <p className={css.text}>Open the box summary to compare recipes and make your final selection.</p>
                </div>
              )
          }
        </Tooltip>
      </div>
    ) :
      null
  }

}

export { ShortlistTutorial }
