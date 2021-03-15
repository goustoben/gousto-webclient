import React from 'react'
import { shallow } from 'enzyme'
import { SellThePropositionPage } from '../SellThePropositionPage'

describe('SellThePropositionPage', () => {
  let wrapper
  const signupGoToMenu = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<SellThePropositionPage signupGoToMenu={signupGoToMenu} />)
  })

  test('renders correctly', () => {
    const mobileContainer = wrapper.find('.mobileContainer')
    expect(mobileContainer.exists()).toBe(true)
    expect(mobileContainer.find('[src="mobile-tablet-top.jpg"]').exists()).toBe(true)
    expect(mobileContainer.find('TextFrame').exists()).toBe(true)
    expect(mobileContainer.find('[src="tablet-bottom.jpg"]').exists()).toBe(true)

    const desktopContainer = wrapper.find('.desktopContainer')
    expect(desktopContainer.exists()).toBe(true)
    expect(desktopContainer.find('[src="desktop-image.jpg"]').exists()).toBe(true)
    expect(desktopContainer.find('TextFrame').exists()).toBe(true)
  })
})
