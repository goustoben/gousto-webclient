import React from 'react'
import ReactDOM from 'react-dom'
import { ExtraInfo, ExtraInfoMain, ExtraInfoSecondary } from '../index'

describe('ExtraInfo', () => {
  const EXTRA_INFO = (
    <ExtraInfo>
      <ExtraInfoMain>Content goes here for main</ExtraInfoMain>
      <ExtraInfoSecondary
        title="This is the title"
        label="This is the label"
      >
        Content goes here for secondary
      </ExtraInfoSecondary>
    </ExtraInfo>
  )

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(EXTRA_INFO, div)
  })
})
