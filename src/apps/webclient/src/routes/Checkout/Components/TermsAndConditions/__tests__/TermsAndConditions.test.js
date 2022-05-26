import React from 'react'

import { Link } from '@gousto-internal/citrus-react'
import { shallow } from 'enzyme'

import { TermsAndConditions } from 'routes/Checkout/Components/TermsAndConditions'

describe('TermsAndConditions', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<TermsAndConditions />)
    })

    test('should render the terms and conditions message', () => {
      expect(wrapper.text().includes('Terms and Conditions')).toBe(true)
    })

    test('should contain 1 <Link> components(s)', () => {
      expect(wrapper.find(Link).length).toEqual(1)
    })
  })
})
