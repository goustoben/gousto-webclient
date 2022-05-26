import React from 'react'

import PropTypes from 'prop-types'

import LoadingComponent from 'components/Loading'

import css from './Loading.css'

const propTypes = {
  loading: PropTypes.bool,
}

const defaultProps = {
  loading: false,
}

const Loading = ({ loading }) => {
  const loadingCss = css.loading

  return loading ? (
    <div className={css.container}>
      <div className={loadingCss}>
        <LoadingComponent />
      </div>
    </div>
  ) : null
}

Loading.propTypes = propTypes

Loading.defaultProps = defaultProps

export default Loading
