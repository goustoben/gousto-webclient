import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import { Header } from '../Header'

describe('Header', () => {
  let wrapper

  describe('with no feature flag set', () => {
    test('should render fallback', () => {
      wrapper = mount(<Header featureFlag={false} />)

      expect(wrapper.find('.spacer')).toHaveLength(1)
    })
  })

  describe('with no offer', () => {
    test('should render fallback', () => {
      wrapper = mount(<Header offer={null} />)

      expect(wrapper.find('.spacer')).toHaveLength(1)
    })
  })

  describe('with an offer and feature flag', () => {
    test('should match snapshot', () => {
      const offer = {
        formattedValue: '10%',
      }
      const tree = renderer.create(
        <Header
          offer={offer}
          featureFlag
        />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
