import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import Helmet from 'react-helmet'

import PrivacyStatement from '../PrivacyStatement'

describe('PrivacyStatement', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')

    ReactDOM.render(
      <PrivacyStatement />,
      div
    )
  })

  describe('when mounted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(<PrivacyStatement />)
    })

    describe('the layout', () => {
      test('renders <PrivacyStatement />', () => {
        expect(wrapper.find('PrivacyStatement')).toHaveLength(1)
      })

      test('has a <Helmet /> child', () => {
        expect(wrapper.find(Helmet)).toHaveLength(1)
      })

      test('contains two section', () => {
        expect(wrapper.find('section').length).toEqual(2)
      })

      test('contains Privacy statement section', () => {
        expect(wrapper.find('section').first().text()).toContain('Privacy Statement')
      })

      test('contains Cookies Policy section', () => {
        expect(wrapper.find('section').last().text()).toContain('Cookies Policy')
      })
    })
  })
})
