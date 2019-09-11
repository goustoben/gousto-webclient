import React from 'react'
import Carousel from 'Carousel'
import Image from 'Image'
import SectionHeader from 'SectionHeader'
import Content from 'containers/Content'
import css from './ExpectationsCarousel.css'
import Circle from './Circle'

class ExpectationsCarousel extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      currentSlide: 0,
    }
  }

  goToSlide = (index) => () => {
    this.slideChange(index)
  }

  slideChange = (index) => {
    this.setState({
      currentSlide: index,
    })
  }

  renderNavCircles() {
    const circles = [
      { content: 1, top: 27, left: 5 },
      { content: 2, top: 53, left: 28 },
      { content: 3, top: 24, left: 59 },
      { content: 4, top: 41, left: 77.5 },
      { content: 5, top: 48, left: 96 },
    ]
    const { currentSlide } = this.state

    return circles.map((circle, index) => (
      <Circle
        key={circle.content}
        {...circle}
        active={index === currentSlide}
        onClick={this.goToSlide(index)}
      />
    ))
  }

  render() {
    const getImage = (fileName) => require(`media/images/${fileName}`) // eslint-disable-line global-require
    const { currentSlide } = this.state

    return (
      <article data-testing="expectationsCarousel">
        <section className={css.content}>
          <Content
            contentKeys="welcomeCarouselTitle"
            propNames="title"
          >
            <SectionHeader title="Here's what you'll get." type="article">
              <Content
                contentKeys="welcomeImmediateCarouselMessage"
              >
                <p className={css.contentInner}>
                  Learn more about what's coming in your box
                </p>
              </Content>
            </SectionHeader>
          </Content>
          <div className={css.imageContainer}>
            {this.renderNavCircles()}
            <Image className={css.boxImage} media={getImage('gousto-welcome-journey-rollover.jpg')} />
          </div>
          <div className={css.carouselContainer}>
            <Carousel
              autoplaySpeed={10000}
              afterChange={this.slideChange}
              slickGoTo={currentSlide}
            >
              <div>
                <p className={css.slideContent}>
                  <Content
                    contentKeys="welcomeImmediateCarouselSlide1Title"
                  >
                    <span className={css.slideTitle}>A cool bag</span>
                  </Content>
                  <Content
                    contentKeys="welcomeImmediateCarouselSlide1Message"
                  >
                    <span className={css.slideCopy}>Our sustainable Woolcool insulation and reusable ice packs keep your food chilled if you're not home.</span>
                  </Content>
                </p>
              </div>
              <div>
                <p className={css.slideContent}>
                  <Content
                    contentKeys="welcomeImmediateCarouselSlide2Title"
                  >
                    <span className={css.slideTitle}>Quality ingredients</span>
                  </Content>
                  <Content
                    contentKeys="welcomeImmediateCarouselSlide2Message"
                  >
                    <span className={css.slideCopy}>Fresh produce from trusted farms and suppliers: 100% British meat, responsibly sourced fish, organic yoghurt, freshly baked ciabatta, bespoke spice blends and more.</span>
                  </Content>
                </p>
              </div>
              <div>
                <p className={css.slideContent}>
                  <Content
                    contentKeys="welcomeImmediateCarouselSlide3Title"
                  >
                    <span className={css.slideTitle}>Your Gousto Box</span>
                  </Content>
                  <Content
                    contentKeys="welcomeImmediateCarouselSlide3Message"
                  >
                    <span className={css.slideCopy}>You can tweak your order up to noon, three days before your delivery day – that’s when we start preparing your box.</span>
                  </Content>
                </p>
              </div>
              <div>
                <p className={css.slideContent}>
                  <Content
                    contentKeys="welcomeImmediateCarouselSlide4Title"
                  >
                    <span className={css.slideTitle}>Little extras</span>
                  </Content>
                  <Content
                    contentKeys="welcomeImmediateCarouselSlide4Message"
                  >
                    <span className={css.slideCopy}>In the Gousto Market, you can add lovely wines, craft beers, delicious desserts, cooking staples, handy kitchen tools, and treats from artisan suppliers.</span>
                  </Content>
                </p>
              </div>
              <div>
                <p className={css.slideContent}>
                  <Content
                    contentKeys="welcomeImmediateCarouselSlide5Title"
                  >
                    <span className={css.slideTitle}>Recipe Cards</span>
                  </Content>
                  <Content
                    contentKeys="welcomeImmediateCarouselSlide5Message"
                  >
                    <span className={css.slideCopy}>Our easy-to-follow recipe cards (with helpful photos) guide you step by step to a delicious meal.</span>
                  </Content>
                </p>
              </div>
            </Carousel>
          </div>
        </section>
      </article>
    )
  }
}

export default ExpectationsCarousel
