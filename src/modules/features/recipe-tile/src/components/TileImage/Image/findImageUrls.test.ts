import { Image } from '../../../model/recipe'
import { findImageUrls } from './findImageUrls'

describe('Recipe components > Image > findImage', () => {
  const moodImage: Image = {
    type: 'mood-image',
    title: 'Mood image',
    description: 'Some cool mood image',
    urls: [
      {
        src: 'https://s3-gousto-haricots-media.s3.amazonaws.com/cms/mood-image/324-x50.jpg',
        width: 50,
      },
    ],
  }

  const homePageImage: Image = {
    type: 'homepage-image',
    title: 'HomePage Image',
    description: 'Some cool image',
    urls: [
      {
        src: 'https://s3-gousto-haricots-media.s3.amazonaws.com/cms/homepage-image/324-x50.jpg',
        width: 50,
      },
    ],
  }

  let images: Image[]

  beforeEach(() => {
    images = [homePageImage, moodImage]
  })

  describe('when useHomepageImage prop is true', () => {
    const useHomepageImage = true
    test('should return the homepage image urls', () => {
      const result = findImageUrls(images, useHomepageImage)
      expect(result).toEqual(homePageImage.urls)
    })

    describe('when homepageImage has no urls', () => {
      beforeEach(() => {
        images = [{ ...homePageImage, urls: [] }, moodImage]
      })

      test('should return the mood image urls', () => {
        const result = findImageUrls(images, useHomepageImage)
        expect(result).toEqual(moodImage.urls)
      })
    })
  })

  describe.each([false, undefined])(
    'when useHomepageImage prop is falsy [%s]',
    (useHomepageImage) => {
      test('should return the mood image urls', () => {
        const result = findImageUrls(images, useHomepageImage)
        expect(result).toEqual(moodImage.urls)
      })

      describe('when there is no moodImage', () => {
        beforeEach(() => {
          images = [homePageImage]
        })

        test('should return the first urls from first image', () => {
          const result = findImageUrls(images, useHomepageImage)
          expect(result).toEqual(homePageImage.urls)
        })
      })
    },
  )
})
