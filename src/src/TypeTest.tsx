/* eslint-disable react/destructuring-assignment */
import React, { FC } from 'react'

export interface TypeTestProps {
    name: string
}

export const TypeTest: FC<TypeTestProps> = (props: TypeTestProps) => (
  <div>
    <h1>
      Hello Typed &nbsp;
      { props.name }
    </h1>
  </div>
)
