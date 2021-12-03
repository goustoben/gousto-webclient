import React from 'react'
import Loading from 'Loading'
import css from './PageLoader.module.css'

function PageLoader() {
  return (
    <div className={css.loadingContainer}>
      <Loading className={css.loadingImage} />
    </div>
  )
}

export { PageLoader }
