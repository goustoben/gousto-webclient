import React from 'react'
import css from './Perks.css'
import PerkCircle from './PerkCircle'
import Content from 'containers/Content'

const Perks = () => (
  <div className={css.container}>
    <div>
      <h2 className={css.preHeader}>
        <Content
          contentKeys="jobsPerksHeaderPretitle"
        >
          <span>The Perks</span>
        </Content>
      </h2>
      <h1 className={css.header}>
        <Content
          contentKeys="jobsPerksHeaderTitle"
        >
          <span>Working at Gousto</span>
        </Content>
      </h1>
    </div>
    <div className={css.perkRow}>
      <p className={css.perkCopy}>
        <Content
          contentKeys="jobsPerksHeaderMessage1"
        >
          <span>Our team wants to change the world for the better. Gousto is leading a shift in how people shop, cook and eat food at home – it’s an incredibly exciting time to join our friendly team!</span>
        </Content>
      </p>
      <p className={css.perkCopy}>
        <Content
          contentKeys="jobsPerksHeaderMessage2"
        >
          <span>Most people at Gousto really love two things: food (unsurprisingly!) and data. We expect applicants for most roles to be passionate about at least one of these.</span>
        </Content>
      </p>
      <p className={css.perkCopy}>
        <Content
          contentKeys="jobsPerksHeaderMessage3"
        >
          <span>Every day brings new things to learn, new challenges and often new recipes to test as well! Who says there’s no such thing as a free lunch…</span>
        </Content>
      </p>
    </div>
    <PerkCircle />
  </div>
)

export default Perks
