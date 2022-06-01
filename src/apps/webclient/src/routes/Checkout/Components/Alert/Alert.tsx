import React, { ReactNode } from 'react'

import classNames from 'classnames'

import Svg from 'components/Svg'

import css from './Alert.css'

type Props = {
  severity?: 'error' | 'success'
  children: ReactNode
}

export const Alert = ({ severity = 'error', children }: Props) => {
  const iconFileName = severity === 'error' ? 'icon-danger' : 'icon-success'

  return (
    <div
      className={classNames(css.alert, {
        [css.error]: severity === 'error',
        [css.success]: severity === 'success',
      })}
    >
      <div className={css.iconContainer}>
        <Svg className={css.icon} fileName={iconFileName} />
      </div>
      <div className={css.content}>{children}</div>
    </div>
  )
}
