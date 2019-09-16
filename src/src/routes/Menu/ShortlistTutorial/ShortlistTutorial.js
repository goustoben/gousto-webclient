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
    contentStyle: {},
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
    const { style, arrow, arrowStyle, contentStyle } = !!stepSelector && getTooltipProperties(stepSelector)

    if (shouldUpdate) {
      this.setState((prevState) => {
        return {
          ...prevState,
          arrow,
          style,
          arrowStyle,
          contentStyle,
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
    const { stepSelectorVisible, style, arrow, arrowStyle, contentStyle } = this.state
    const { show, step } = this.props

    const shouldShowTutorial = show && (stepSelectorVisible)

    return (shouldShowTutorial) ? (
      <div className={css.tooltip}>
        <Tooltip arrow={arrow} onClose={(e) => this.onCloseTutorial(e)} style={style} arrowStyle={arrowStyle} contentStyle={contentStyle}>
          {
            step === 1 ?
              (
                <div className={css.tooltipBody}>
                  <p className={css.title}>Try shortlisting a recipe! <Svg fileName={'icon_shortlist_heart_selected'} className={css.heartIcon} /></p>
                </div>
              ) :
              (step === 2 &&

                <div className={css.tooltipBody}>
                  <p className={css.title}>Now open your box to compare recipes and make your choices</p>
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
