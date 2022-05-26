import React from 'react'

import Loading from 'Loading'

import css from './LoadingWrapper.module.css'

const LoadingWrapper = () => (
  <div className={css.loading_container}>
    <div className={css.loading_image_container}>
      <Loading className={css.loading_image} />
    </div>
  </div>
)

export { LoadingWrapper }
