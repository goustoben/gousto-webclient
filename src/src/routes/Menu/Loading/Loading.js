import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import LoadingComponent, { LoadingTastePreferences } from 'Loading'

import css from './Loading.css'

const propTypes = {
  loading: PropTypes.bool,
  showTastePreferencesLoading: PropTypes.bool,
}

const defaultProps = {
  loading: false,
  showTastePreferencesLoading: false,
}

const Loading = ({ loading, showTastePreferencesLoading }) => {
  const loadingCss = classnames(
    css.loading,
    { [css['loading--taste-preferences']]: showTastePreferencesLoading },
  )

  return (
    (loading) ? (
      <div className={css.container}>
        <div className={loadingCss}>
          {(showTastePreferencesLoading) ? <LoadingTastePreferences /> : <LoadingComponent />}
        </div>
      </div>
    ) : null
  )
}

Loading.propTypes = propTypes

Loading.defaultProps = defaultProps

export default Loading
