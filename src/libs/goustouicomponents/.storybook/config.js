import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import css from './generalConfig.css'

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js|mdx$/), module);

addDecorator(withA11y)
addDecorator(withKnobs)
addDecorator((storyFn, context, ) => (
  <div className={`${css['wrap-out']} wrap-out--${context.story} wrap-out--${context.id}`}>
    <div className={css.canvasWrapper}>
      <div className={`${css['wrap-inner']} wrap-inner--${context.story} wrap-inner--${context.id}`}>
        {storyFn()}
      </div>
    </div>
  </div>
))
