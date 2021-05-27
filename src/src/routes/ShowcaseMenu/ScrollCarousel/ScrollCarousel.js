import React, { useRef, useLayoutEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useScroll, useWindowSize } from 'react-use'
import { elementScroll, elementScrollTo } from 'utils/scrollUtils'
import { ArrowButton } from './ArrowButton'
import { useDebouncedCallback } from './useDebouncedCallback'
import css from './ScrollCarousel.css'

export const ScrollCarousel = ({ stepSizePx, children, trackScrollOneStep }) => {
  const carouselRef = useRef(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const { x: carouselScrollLeft } = useScroll(carouselRef)
  const { width: windowWidth } = useWindowSize()

  const updateArrowsVisibility = useDebouncedCallback(
    () => {
      const carouselDiv = carouselRef.current

      const { scrollLeft, offsetWidth, scrollWidth } = carouselDiv

      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft + offsetWidth < scrollWidth)
    },
    200,
    [carouselRef]
  )

  useLayoutEffect(() => {
    const carouselDiv = carouselRef.current
    elementScrollTo(carouselDiv, 0, 0)
    updateArrowsVisibility()
  }, [children, updateArrowsVisibility])

  useLayoutEffect(() => {
    updateArrowsVisibility()
  }, [carouselScrollLeft, windowWidth, updateArrowsVisibility])

  const scrollOneStep = useCallback(
    (direction) => {
      const carouselDiv = carouselRef.current
      const sign = direction === 'left' ? -1 : 1
      elementScroll(carouselDiv, {
        left: carouselDiv.scrollLeft + stepSizePx * sign,
        behavior: 'smooth',
      })
      trackScrollOneStep(direction)
    },
    [carouselRef, trackScrollOneStep, stepSizePx]
  )

  return (
    <div className={css.scrollCarouselContainer}>
      <div className={css.scrollCarousel} ref={carouselRef}>
        {children}
      </div>
      <ArrowButton
        buttonClassName={css.leftArrowButton}
        iconClassName={css.leftArrowIcon}
        onClick={() => scrollOneStep('left')}
        canScroll={canScrollLeft}
      />
      <ArrowButton
        buttonClassName={css.rightArrowButton}
        iconClassName={css.rightArrowIcon}
        onClick={() => scrollOneStep('right')}
        canScroll={canScrollRight}
      />
    </div>
  )
}

ScrollCarousel.propTypes = {
  stepSizePx: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  trackScrollOneStep: PropTypes.func.isRequired,
}
