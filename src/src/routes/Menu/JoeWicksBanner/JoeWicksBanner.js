import React from 'react'

import Gel from 'Gel'
import Svg from 'Svg'
import Image from 'Image'
import css from './JoeWicksBanner.css'

const getImage = (fileName) => require(`media/images/${fileName}`) // eslint-disable-line global-require

export const JoeWicksBanner = () => (
  <div className={css.container}>
    <div className={css.content}>
      <div className={css.gelPortrait}>
        <Image className={css.gelPortrait__image} media={getImage('menu/jw-portrait.jpg')} />
      </div>
      <Gel className={css.gelText} size="large" color="white">
        <Svg className={css.gelText__svg} fileName="jw-partner-text" />
      </Gel>
    </div>
  </div>
)
