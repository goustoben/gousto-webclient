import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { RecipeMeta } from '..'
import Helmet from 'react-helmet'

describe('RecipeMeta', () => {
  const recipe = Immutable.Map({
    id: '12345',
    title: 'test',
    description: 'test description',
    media: {
      images: [{
        urls: [{ src: 'test url', width: 700 }]
      }]
    },
    range: 'test range',
  })

  it('should render helmet component if recipe exists', () => {
    const wrapper = shallow(<RecipeMeta recipe={recipe} />)

    expect(wrapper.find(Helmet).length).toEqual(1)
  })

  it('should render nothing if recipe does not exist', () => {
    const wrapper = shallow(<RecipeMeta recipe={null} />)

    expect(wrapper.find(Helmet).length).toEqual(0)
  })
})