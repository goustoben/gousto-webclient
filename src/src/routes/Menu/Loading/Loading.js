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

const Loading = ({ loading }) => (
  (loading) ? (
    <div className={css.container}>
      <div className={css.loading}>
        <LoadingComponent />
      </div>
    </div>
  ) : null

)

Loading.propTypes = propTypes

Loading.defaultProps = defaultProps

export default Loading
