import React from 'react'
import config from 'config/routes'
import Content from 'containers/Content'
import css from './Hero.css'
import Button from './Button/Button'

const Hero = () => (
  <div className={css.container}>
    <div className={css.textContainer}>
      <h1 className={css.header}>
        <Content
          contentKeys="jobsHeaderHeroTitle"
        >
          <span>Join Gousto</span>
        </Content>
      </h1>
      <Button link={config.jobs.openings}>
        <Content
          contentKeys="jobsHeaderHeroButton"
        >
          <span>See Openings</span>
        </Content>
      </Button>
    </div>
  </div>
)

export default Hero
