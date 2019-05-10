import React from 'react'
import Helmet from 'react-helmet'
import css from './Storystream.css'

const Storystream = () => (<div>
  <Helmet
    script={[
      {
        src: 'https://s3-eu-west-1.amazonaws.com/apps.storystream.it/widget/js/677867864.js',
        type: 'text/javascript',
      },
    ]}
  />
  <div className={css.storystreamContainer}>
    <div id="StoryStreamWidgetApp" className="stry-widget" />
  </div>
</div>)

export default Storystream
