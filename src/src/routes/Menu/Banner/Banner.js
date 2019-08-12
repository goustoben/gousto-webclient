import React from 'react'
import PropTypes from 'prop-types'

import Gel from 'Gel'
import Svg from 'Svg'
import Image from 'Image'
import { getImage } from 'utils/menu'
import css from './Banner.css'

const propTypes = {
  imageName: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.oneOf(['white', 'bronze', 'red', 'blue', 'black', 'gold']),
  fileName: PropTypes.string,
  collectionSlug: PropTypes.string,
  setThematic: PropTypes.func
}

const Banner = ({imageName, type, color, fileName, collectionSlug, setThematic}) => (
  <div className={css[type]}>
    <div className={css.content}>
      {(imageName && collectionSlug) ? (
        <div role="button" tabIndex={0} className={css.gelPortrait} onClick={() => setThematic(collectionSlug, 'thematic', 'banner click')} onKeyPress={() => setThematic(collectionSlug, 'thematic')}>
          <Image className={css.gelPortrait__image} media={getImage(imageName)} />
        </div>
      ) : (
        imageName && (
          <div className={css.gelPortrait}>
            <Image className={css.gelPortrait__image} media={getImage(imageName)} />
          </div>
        )
      )}
      {(fileName) ? (
        <Gel className={css.gelText} size="large" color={color}>
          <Svg className={css.gelText__svg} fileName={fileName} />
        </Gel>
      ) : null}
    </div>
  </div>
)

Banner.propTypes = propTypes

export { Banner }
