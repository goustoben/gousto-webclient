import React from 'react'
import { shallow } from 'enzyme'

import { Banner } from '../index'

jest.mock('utils/menu', () => ({
  getImage: jest.fn().mockReturnValue('test-image-file')
}))

describe('Banner', () => {
  let wrapper

  test('should render a banner with no gels if no imageName and fileName', () => {
    wrapper = shallow(<Banner type={'test-css'}/>)
    expect(wrapper.find('.test-css')).toHaveLength(1)
    expect(wrapper.find('.gelPortrait')).toHaveLength(0)
    expect(wrapper.find('.gelText')).toHaveLength(0)
  })

  test('should render the banner and the imageName gel only', () => {
    wrapper = shallow(<Banner imageName={'test.jpg'} type={'banner-with-image'}/>)
    expect(wrapper.find('.banner-with-image')).toHaveLength(1)
    expect(wrapper.find('.gelPortrait')).toHaveLength(1)
    expect(wrapper.find('.gelText')).toHaveLength(0)
  })
  
  test('should render the banner and both imageName gel and fileName gels', () => {
    wrapper = shallow(<Banner imageName={'test.jpg'} type={'banner-with-gel'} color='red' fileName="gel-text"/>)
    expect(wrapper.find('.banner-with-gel')).toHaveLength(1)
    expect(wrapper.find('.gelPortrait')).toHaveLength(1)
    expect(wrapper.find('.gelText')).toHaveLength(1)
  })
})
