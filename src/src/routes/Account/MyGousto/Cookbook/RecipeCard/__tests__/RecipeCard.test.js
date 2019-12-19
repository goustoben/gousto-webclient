import React from 'react'
import { shallow } from 'enzyme'

import { RecipeCard } from '../RecipeCard'

const testLink = "test-link"
const testImages = "test-image"
const testTitle = "test title"

describe('RecipeCard', () => {
  it('renders an Image, title, and link', () => {
    const wrapper = shallow(<RecipeCard link={testLink} images={testImages} title={testTitle} />)

    expect(wrapper.find('p').text()).toContain(testTitle)
    expect(wrapper.find('a').prop('href')).toEqual(testLink)
    expect(wrapper.find('Image').prop('media')).toEqual(testImages)
  })
})
