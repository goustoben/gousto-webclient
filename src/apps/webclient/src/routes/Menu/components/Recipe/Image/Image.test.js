import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import LazyLoad from 'react-lazyload'
import * as recipeContext from '../../../context/recipeContext'
import { Image } from './Image'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
}))

describe('Recipe components > Image', () => {
  let recipe
  const useContextMock = jest.spyOn(React, 'useContext').mockImplementation(() => recipe)
  const useRecipeFieldMock = jest.spyOn(recipeContext, 'useRecipeField')

  const images = Immutable.fromJS([
    {
      type: 'homepage-image',
      urls: [
        {
          src: 'image-1-x150.jpg',
          width: 150,
        },
        {
          src: 'image-1-x50.jpg',
          width: 50,
        },
        {
          src: 'image-1-x300.jpg',
          width: 300,
        },
      ],
    }
  ])

  beforeEach(() => {
    recipe = Immutable.fromJS({
      id: '1234',
      title: 'A Really Nice Recipe',
      media: { images }
    })
    useContextMock.mockClear()
    useRecipeFieldMock.mockClear()
  })

  test('should call useRecipeField with ["media", "images"] as selector and empty Immutable.List as default', () => {
    shallow(<Image />)

    expect(useRecipeFieldMock).toHaveBeenCalledWith(['media', 'images'], Immutable.List())
  })

  describe('when recipe has no media', () => {
    beforeEach(() => {
      recipe = recipe.setIn(['media', 'images'], Immutable.List())
    })

    test('should render null', () => {
      const wrapper = shallow(<Image />)
      expect(wrapper.get(0)).toEqual(null)
    })
  })

  describe('when recipe has media', () => {
    const className = 'some-cool-class'

    beforeEach(() => {
      recipe = recipe.setIn(['media', 'images'], images)
    })

    // these come from the values within `images`
    const expectedSrc = 'image-1-x150.jpg'
    const expectedSrcSet = 'image-1-x150.jpg 150w, image-1-x50.jpg 50w, image-1-x300.jpg 300w'

    test('should render an img component correctly', () => {
      const wrapper = shallow(<Image className={className} />)
      expect(wrapper.get(0)).toEqual(
        <img
          alt="A Really Nice Recipe"
          className={className}
          src={expectedSrc}
          srcSet={expectedSrcSet}
          sizes="(max-width: 500px) 400px, (max-width: 991px) 700px, 400px"
        />
      )
    })

    describe('when lazy is true', () => {
      const lazy = true

      test('should render an img component correctly inside LazyLoad', () => {
        const wrapper = shallow(<Image lazy={lazy} className={className} />)
        expect(wrapper.get(0)).toEqual(
          <LazyLoad once offset={200} height={0}>
            <img
              alt="A Really Nice Recipe"
              className={className}
              src={expectedSrc}
              srcSet={expectedSrcSet}
              sizes="(max-width: 500px) 400px, (max-width: 991px) 700px, 400px"
            />
          </LazyLoad>
        )
      })
    })
  })
})
