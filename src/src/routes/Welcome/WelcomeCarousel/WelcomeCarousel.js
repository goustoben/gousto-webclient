import React from 'react'
import Carousel from 'Carousel'
import Image from 'Image'
import SectionHeader from 'SectionHeader'
import Content from 'containers/Content'
import css from './WelcomeCarousel.css'

const WelcomeCarousel = () => {
  const getImage = (fileName) => require(`media/images/${fileName}`) // eslint-disable-line global-require

  return (
    <article>
      <section className={css.content}>
        <Content
          contentKeys="welcome.welcome_body.welcome_carousel.welcome_carousel_title"
          propNames="title"
        >
          <SectionHeader title="Why Gousto" type="article">
            <Content
              contentKeys="welcome.welcome_body.welcome_carousel.welcome_carousel_message"
            >
              <p className={css.contentInner}>
                We’re big believers in ‘lifestyle liberation’ (or, “making things that little bit easier”).
                Our customers keep coming back because the benefits of our boxes are so much more than a clever
                way to shop for food – they represent a better way to live.
              </p>
            </Content>
          </SectionHeader>
        </Content>
        <div className={css.carouselContainer}>
          <Carousel>
            <div>
              <Image media={getImage('Onboarding-images--welcome-page-stoprepetition.jpg')} />
              <Content
                contentKeys="welcome.welcome_body.welcome_carousel.welcome_carousel_slide_1_message"
              >
                <p>
                  With a new menu full of delicious recipes each week, you’ll liberate yourself from cooking
                  the same go-to dishes day after day
                </p>
              </Content>
            </div>
            <div>
              <Image media={getImage('Onboarding-images--welcome-page-avoidsupermarket.jpg')} />
              <Content
                contentKeys="welcome.welcome_body.welcome_carousel.welcome_carousel_slide_2_message"
              >
                <p>
                  If you’re sick of travelling to supermarkets to scour the shelves for obscure ingredients,
                  getting tricked into buying more than you need, and getting stuck with faulty self-service
                  checkout machines…once your first box arrives, this’ll be a thing of the past!
                </p>
              </Content>
            </div>
            <div>
              <Image media={getImage('Onboarding-images--welcome-page-discoverfood.jpg')} />
              <Content
                contentKeys="welcome.welcome_body.welcome_carousel.welcome_carousel_slide_3_message"
              >
                <p>
                  There is a whole world of recipes to discover with Gousto, from Southeast Asian pad Thais
                  and biryanis to sticky pomegranate Persian halloumi and Mexican chipotle & chilli recipes
                  (and everything in-between). It’s time to take your tastebuds travelling!
                </p>
              </Content>
            </div>
            <div>
              <Image media={getImage('Onboarding-images--welcome-page-forgetfoodwaste.jpg')} />
              <Content
                contentKeys="welcome.welcome_body.welcome_carousel.welcome_carousel_slide_4_message"
              >
                <p>
                  About 40% of food in the UK goes to waste. Our perfectly portioned ingredients and close
                  relationships with farmers and suppliers mean that, from field to fork, your food waste
                  will be nearly 0%! Also you’re not wasting time in supermarkets and meal planning, so you
                  can finally take up that extreme knitting class you’ve been talking about…
                </p>
              </Content>
            </div>
          </Carousel>
        </div>
      </section>
    </article>
  )
}

export default WelcomeCarousel
