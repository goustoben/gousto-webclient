import React from 'react'

import Gel from 'Gel'
import Image from 'Image'
import css from './Banner.css'

const getImage = (fileName) => require(`media/images/${fileName}`) // eslint-disable-line global-require

export const Banner = ({imageName, children, type, color}) => (
  <div className={css[type]}>
    <div className={css.content}>
      <div className={css.gelPortrait}>
        <Image className={type === 'joe-wicks' ? css.gelPortrait__image : null } media={getImage(imageName)} />
      </div>
      <Gel className={css.gelText} size="large" color={color}>
        {/* <Svg className={css.gelText__svg} fileName="jw-partner-text" /> */}
        {children}
      </Gel>
    </div>
  </div>
)
