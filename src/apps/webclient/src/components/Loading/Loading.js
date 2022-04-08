import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Div } from 'Page/Elements'
import Image from 'Image'

import css from './Loading.css'

const getImage = (fileName) => require(`media/images/${fileName}`) // eslint-disable-line global-require

export const LoadingOverlay = () => (
  <Div
    fixed
    w-100
    style={{ zIndex: 100, top: 0, left: 0 }}
  >
    <Div
      d-block
      margin={{
        top: 'XXL',
        right: 'auto',
        left: 'auto',
      }}
      style={{
        width: '100px',
        pointerEvents: 'none',
      }}
    >
      <Loading />
    </Div>
  </Div>
)

const Loading = ({ className }) => (
  <Image media={getImage('Loading-Icon.gif')} className={classNames(css.gif, className)} />
)

Loading.propTypes = {
  className: PropTypes.string,
}

Loading.defaultProps = {
  className: null,
}

export default Loading
