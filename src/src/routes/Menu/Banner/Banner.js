import React from 'react'

import Gel from 'Gel'
import Svg from 'Svg'
import Image from 'Image'
import css from './Banner.css'

const getImage = (fileName) => require(`media/images/${fileName}`) // eslint-disable-line global-require

export const Banner = ({imageName, type, color, fileName}) => (
  <div className={css[type]}>
    <div className={css.content}>
      <div className={css.gelPortrait}>
        <Image className={css.gelPortrait__image} media={getImage(imageName)} />
      </div>
       <Gel className={css.gelText} size="large" color={color}>
        <Svg className={css.gelText__svg} fileName={fileName} />
       </Gel> 
    </div>
  </div>
)
