import React from 'react'
import Loading from 'Loading'
import css from './LoadingWrapper.css'

const LoadingWrapper = () => (
  <div className={css.loading__container}>
    <div className={css.loading__item}>
      <Loading className={css.loading__image} />
    </div>
  </div>
)

export {
  LoadingWrapper
}
