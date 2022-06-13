import React from 'react'

import { render } from '@testing-library/react'

import { NewTag } from './NewTag'

describe('<NewTag />', () => {
  test('Should render with text', () => {
    const { getByText } = render(<NewTag text="Some text" />)

    expect(getByText('Some text')).toBeInTheDocument()
  })

  test('Should render with NEW', () => {
    const { getByText } = render(<NewTag />)

    expect(getByText('NEW')).toBeInTheDocument()
  })
})
