import React from 'react'
import PropTypes from 'prop-types'
import image0 from '../../media/images/food/cauli-mac-cheese.jpg'
import image1 from '../../media/images/food/jamaican-squash-coconut-stew.jpg'
import image2 from '../../media/images/food/sweet-potato-dal.jpg'
import image3 from '../../media/images/food/sweet-potato-sag-aloo.jpg'
import css from './ScrollCarousel.stories.css'

const images = [image0, image1, image2, image3]

export const TestHeader = () => (
  <header className={css.testHeader}>
    <b>Vegan recipes</b>
    <div>See all</div>
  </header>
)

export const TestFooter = () => (
  <footer className={css.testFooter}>
    Actual colors may vary.
  </footer>
)

const TestCard = ({ src }) => (
  <div className={css.testCard}>
    <img src={src} alt="test recipe" />
  </div>
)

TestCard.propTypes = {
  src: PropTypes.string.isRequired,
}

export const TestCards = () => (
  <div className={css.testCards}>
    {images.map((image) => (
      <TestCard key={image} src={image} />
    ))}
  </div>
)
