import React from 'react'
import PropType from 'prop-types'
import { Div } from 'Page/Elements'
import Image from 'Image'

import css from './Loading.css'

const getImage = (fileName) => require(`media/images/${fileName}`) // eslint-disable-line global-require

export const LoadingTastePreferences = () => (
  <div>
    <Image
      media={getImage('Loading-Icon-building-menu.gif')}
      title="animation"
      className={css.tastePreferences}
    />
    <p className={css.tastePreferencesContent}><strong>Building your menu</strong></p>
  </div>
)

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
  <Image media={getImage('Loading-Icon.gif')} title="animation" className={`${css.gif} ${className}`} />
)

Loading.propTypes = {
  className: PropType.string,
}

export default Loading
