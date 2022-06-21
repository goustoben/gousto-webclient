import React from 'react'

import { Box, Overflow } from '@gousto-internal/citrus-react'
import Slider from 'react-slick'

import { SimpleRecipeTile } from './SimpleRecipeTile'
import { useIsHighlightChoiceFeatureEnabled } from './highlightChoiceHooks'
import { RECIPE_DATA } from './recipeData'

export const HighlightChoice = () => {
  const isHighlightChoiceFeatureEnabled = useIsHighlightChoiceFeatureEnabled()

  if (!isHighlightChoiceFeatureEnabled) {
    return null
  }

  return (
    <Box
      width="100%"
      paddingV={0}
      paddingBottom={[6, 8, 8, 8]}
      overflowX={Overflow.Hidden}
      data-testid="HighlightChoiceContainer"
    >
      <Slider
        dots={false}
        adaptiveHeight={false}
        infinite
        speed={400}
        slidesToShow={11}
        slidesToScroll={1}
        centerMode
        focusOnSelect
        swipeToSlide
        lazyLoad="progressive"
        responsive={[
          { breakpoint: 375, settings: { slidesToShow: 3 } },
          { breakpoint: 639, settings: { slidesToShow: 5 } },
          { breakpoint: 959, settings: { slidesToShow: 7 } },
          { breakpoint: 1199, settings: { slidesToShow: 8 } },
        ]}
      >
        {RECIPE_DATA.map((recipe) => (
          <SimpleRecipeTile
            key={recipe.name.replace(/(\s|,)/gm, '-')}
            name={recipe.name}
            imageUrl={recipe.imageUrl}
            type={recipe.type}
          />
        ))}
      </Slider>
    </Box>
  )
}
