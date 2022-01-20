import React from 'react'
import { mount } from 'enzyme'

import { AnimatedImage } from '../AnimatedImage'

jest.mock('react-transition-group', () => ({
  // eslint-disable-next-line
  Transition: ({ children }) => <div>{children('entered')}</div>,
}))

const mockProps = {
  shouldRenderImg: true,
  name: 'iOS'
}

let wrapper

const mountWrapper = (props = {}) => {
  wrapper = mount(<AnimatedImage {...mockProps} {...props} />)
}

describe('AnimatedImage', () => {
  it('should render iOS phone image if name is "apple"', () => {
    mountWrapper()

    const imageSrc = wrapper.find('img').prop('src')

    expect(imageSrc).toEqual('app-modal-iphone@2x.png')
  })

  it('should render android phone image if name is "android"', () => {
    mountWrapper({ name: 'Android' })

    const imageSrc = wrapper.find('img').prop('src')

    expect(imageSrc).toEqual('app-modal-android@2x.png')
  })
})
