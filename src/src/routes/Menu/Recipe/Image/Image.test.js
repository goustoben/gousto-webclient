import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { Image } from 'routes/Menu/Recipe/Image'
import GoustoImage from 'Image'
import { SoldOutOverlay } from 'routes/Menu/Recipe/SoldOutOverlay'

describe('<Image />', () => {
  let wrapper
  let media
  beforeEach(() => {
    media = Immutable.fromJS([
      {
        src: 'radish.small.jpg',
        width: 100,
      },
      {
        src: 'radish.medium.jpg',
        width: 150,
      },
      {
        src: 'radish.large.jpg',
        width: 200,
      },
      {
        src: 'radish.extraLarge.jpg',
        width: 250,
      },
    ])
  })

  it('shouldn\'t render a GoustoImage without media', () => {
    wrapper = shallow(<Image media={Immutable.List()} />)

    expect(wrapper.find(GoustoImage)).toHaveLength(0)
  })

  it('should render a GoustoImage with media', () => {
    wrapper = shallow(<Image media={media} />)

    expect(wrapper.find(GoustoImage)).toHaveLength(1)
  })

  test('should contain one SoldOutOverlay component', () => {
    expect(wrapper.find(SoldOutOverlay).length).toEqual(1)
  })
})

