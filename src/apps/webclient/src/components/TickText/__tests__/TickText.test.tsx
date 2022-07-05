import React from 'react'

import { render, RenderResult } from '@testing-library/react'

import { TickText } from '../TickText'

describe('TickText', () => {
  const highlightedText = 'Nice!'
  const ordinaryText = 'You get free delivery on your first box (usually £1.99) as a welcome treat.'
  let rendered: RenderResult

  beforeEach(() => {
    rendered = render(<TickText highlightedText={highlightedText} ordinaryText={ordinaryText} />)
  })

  it('should render a highlighted text', () => {
    const { getByText } = rendered
    expect(getByText(highlightedText)).toBeDefined()
  })

  it('should render an ordinary text', () => {
    const { getByText } = rendered
    expect(getByText(ordinaryText)).toBeDefined()
  })

  it('should render a tick icon', () => {
    const tickIcon = rendered.findByTestId('tick')
    expect(tickIcon).toBeDefined()
  })

  it('should render a container element', () => {
    const containerEl = rendered.findByTestId('container')
    expect(containerEl).toBeDefined()
  })

  it('should render a highlighted text element', () => {
    const highlightedEl = rendered.findByTestId('highlighted')
    expect(highlightedEl).toBeDefined()
  })
})
