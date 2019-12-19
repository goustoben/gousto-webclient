import React from 'react'
import { shallow } from 'enzyme'

import { Banner } from '../index'

jest.mock('utils/menu', () => ({
  getImage: jest.fn().mockReturnValue('test-image-file')
}))

describe('Banner', () => {
  let wrapper

  test('should render a banner with no gels if no imageName and fileName', () => {
    wrapper = shallow(<Banner type={'test-css'} />)
    expect(wrapper.find('.test-css')).toHaveLength(1)
  })

  test('should render the banner and the imageName gel only', () => {
    wrapper = shallow(<Banner imageName={'test.jpg'} type={'banner-with-image'} />)
    expect(wrapper.find('.banner-with-image')).toHaveLength(1)
  })

  test('should render the banner with click', () => {
    wrapper = shallow(<Banner type={'banner-with-image'} collectionSlug={'collection-slug'} setThematic={() => { }} />)
    expect(wrapper.find('[role="button"]')).toHaveLength(1)
  })
})
