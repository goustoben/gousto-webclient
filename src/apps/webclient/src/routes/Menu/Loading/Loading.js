import PropTypes from 'prop-types'
import React from 'react'
import LoadingComponent from 'Loading'

import css from './Loading.css'

const propTypes = {
  loading: PropTypes.bool,
}

const defaultProps = {
  loading: false,
}

const Loading = ({ loading }) => {
  const loadingCss = css.loading

  return (
    (loading) ? (
      <div className={css.container}>
        <div className={loadingCss}>
          <LoadingComponent />
        </div>
      </div>
    ) : null
  )
}

Loading.propTypes = propTypes

Loading.defaultProps = defaultProps

export default Loading
