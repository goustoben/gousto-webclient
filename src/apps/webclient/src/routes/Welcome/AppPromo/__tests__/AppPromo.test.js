import React from 'react'
import { shallow } from 'enzyme'
import { AppPromo } from '..'

describe('AppPromo', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<AppPromo />)
  })

  it('should render a ticklist', () => {
    expect(wrapper.find('TickList').length).toEqual(1)
  })

  it('should render a cta and show if device is mobile', () => {
    wrapper = shallow(<AppPromo device="mobile" />)

    expect(wrapper.find('CTA').length).toEqual(1)
    expect(wrapper.find('.mobileAppLink.hideElement').length).toEqual(0)
  })

  it('should render app store links and show them if device is desktop', () => {
    wrapper = shallow(<AppPromo device="desktop" />)

    expect(wrapper.find('AppStoreLinks').length).toEqual(1)
    expect(wrapper.find('.desktopAppLink.hideElement').length).toEqual(0)
  })

  it('should render app store links and show them if device is tablet', () => {
    wrapper = shallow(<AppPromo device="tablet" />)

    expect(wrapper.find('AppStoreLinks').length).toEqual(1)
    expect(wrapper.find('.desktopAppLink.hideElement').length).toEqual(0)
  })
})
