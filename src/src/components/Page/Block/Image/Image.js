import React from 'react'
import Image from 'Image'

import css from './Image.css'

const BlockImage = (props) => (
  <div className={css.container}>
    <Image
      className={css.image}
      {...props}
    />
  </div>
)

export default BlockImage
