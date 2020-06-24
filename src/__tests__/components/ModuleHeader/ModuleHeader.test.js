import React from 'react'
import { shallow } from 'enzyme'

import { ModuleHeader } from 'components/ModuleHeader'

describe('ModuleHeader', () => {
  let wrapper

  test('should render a <h2>', () => {
    wrapper = shallow(<ModuleHeader />)

    expect(wrapper.find('h2')).toHaveLength(1)
  })

  test('should render a <h2>', () => {
    wrapper = shallow(<ModuleHeader>Test ModuleHeader...</ModuleHeader>)

    expect(wrapper.find('h2').text()).toBe('Test ModuleHeader...')
  })

  describe('homepageRedesign', () => {
    wrapper = shallow(<ModuleHeader />)
    describe('Given home page redesign is disabled', () => {
      describe('When isHomePageRedesignEnabled set to false/default', () => {
        beforeEach(() => {
          wrapper.setProps({ isHomePageRedesignEnabled: false })
        })
        test('Then ModuleHeader should be rendered without homepageRedesign class attribute', () => {
          expect(wrapper.hasClass('homepageRedesign')).toBeFalsy()
        })
      })
    })

    describe('Given home page redesign is enabled', () => {
      describe('When isHomePageRedesignEnabled set to true', () => {
        beforeEach(() => {
          wrapper.setProps({ isHomePageRedesignEnabled: true })
        })
        test('Then ModuleHeader should be rendered with homepageRedesign class attribute', () => {
          expect(wrapper.hasClass('homepageRedesign')).toBeTruthy()
        })
      })
    })
  })
})
