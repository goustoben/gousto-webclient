import Immutable from 'immutable'
import { findImageUrls } from './findImageUrls'

describe('Recipe components > Image > findImage', () => {
  const moodImage = Immutable.fromJS({
    type: 'mood-image',
    urls: [
      {
        src: 'https://s3-gousto-haricots-media.s3.amazonaws.com/cms/mood-image/324-x50.jpg',
        width: 50,
      },
    ],
  })

  const homePageImage = Immutable.fromJS({
    type: 'homepage-image',
    urls: [
      {
        src: 'https://s3-gousto-haricots-media.s3.amazonaws.com/cms/homepage-image/324-x50.jpg',
        width: 50,
      },
    ],
  })

  let images

  beforeEach(() => {
    images = Immutable.List([homePageImage, moodImage])
  })

  describe('when useHomepageImage prop is true', () => {
    const useHomepageImage = true
    test('should return the homepage image urls', () => {
      const result = findImageUrls(images, useHomepageImage)
      expect(result).toEqual(homePageImage.get('urls'))
    })

    describe('when homepageImage has no urls', () => {
      beforeEach(() => {
        images = Immutable.List([
          homePageImage.set('urls', Immutable.List()),
          moodImage
        ])
      })

      test('should return the mood image urls', () => {
        const result = findImageUrls(images, useHomepageImage)
        expect(result).toEqual(moodImage.get('urls'))
      })
    })
  })

  describe.each([
    false, undefined
  ])('when useHomepageImage prop is falsy [%s]', (useHomepageImage) => {
    test('should return the mood image urls', () => {
      const result = findImageUrls(images, useHomepageImage)
      expect(result).toEqual(moodImage.get('urls'))
    })

    describe('when there is no moodImage', () => {
      beforeEach(() => {
        images = Immutable.List([homePageImage])
      })

      test('should return the first urls from first image', () => {
        const result = findImageUrls(images, useHomepageImage)
        expect(result).toEqual(homePageImage.get('urls'))
      })
    })
  })
})
