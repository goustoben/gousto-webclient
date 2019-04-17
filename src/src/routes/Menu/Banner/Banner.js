import React from 'react'

import Gel from 'Gel'
import Svg from 'Svg'
import Image from 'Image'
import { getImage } from 'utils/menu'
import css from './Banner.css'

export const Banner = ({imageName, type, color, fileName }) => (
  <div className={css[type]}>
    <div className={css.content}>
      {(imageName) ? (
        <div className={css.gelPortrait}>
          <Image className={css.gelPortrait__image} media={getImage(imageName)} />
        </div>
      ) : null}
      {(fileName) ? (
        <Gel className={css.gelText} size="large" color={color}>
          <Svg className={css.gelText__svg} fileName={fileName} />
        </Gel>
      ) : null}
    </div>
  </div>
)
