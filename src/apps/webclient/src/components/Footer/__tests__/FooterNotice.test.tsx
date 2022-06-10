import React from 'react'

import { render, screen } from '@testing-library/react'

import { FooterNotice } from '../FooterNotice'

describe('Given: FooterNotice component', () => {
  describe('When: user sees component on a anywhere on the page', () => {
    beforeEach(() => {
      render(
        <FooterNotice>
          This is fake text <button type="button">fake button</button> and this is{' '}
          <a href="https://fake.com">fake link</a>
        </FooterNotice>,
      )
    })

    test('It: should render whatever children put in it', () => {
      expect(screen.getByText(/this is fake text and this is/i)).toBeDefined()
      expect(screen.getByRole('button', { name: /fake button/i })).toBeDefined()
      expect(screen.getByRole('link', { name: /fake link/i })).toBeDefined()
    })
  })
})
