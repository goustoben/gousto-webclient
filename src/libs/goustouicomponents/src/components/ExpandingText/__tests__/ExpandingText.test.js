import React from 'react'
import { mount } from 'enzyme'
import { ExpandingText } from '../ExpandingText.logic'

describe('ExpandingText', () => {
  let wrapper

  const text = 'Succulent, juicy and always delicious, chicken breasts are a versatile meat that compliment a variety of cuisines. A firm fridge favourite, chicken breasts are easy to cook and work in everything from sizzling stir fries and warming curries to soups and sandwiches. So, whether you want to dice it, fry it or find a new way to try it - we’ve got the best chicken breast recipes to tickle your taste buds. Get the most out of this lean meat and learn new cooking techniques to enhance the flavour. Our chicken breast recipes include asian-inspired stir fries, where the meat is hit first to tenderise it, as well as firm staples like stringy pulled chicken in a juicy poutine sauce. It may be a staple to your diet, but this is chicken like you’ve never tasted before.'

  beforeEach(() => {
    wrapper = mount(<ExpandingText lines={3}>{text}</ExpandingText>)
  })

  test('renders a paragraph with the right class', () => {
    expect(wrapper.find('p').exists()).toBeTruthy()
    expect(wrapper.find('p').hasClass('readMoreWrapper')).toBeTruthy()
  })

  test('the wrapper does not have the isExpanded class on it', () => {
    expect(wrapper.find('.readMoreWrapper').hasClass('isExpanded')).toBeFalsy()
  })

  describe('when text fits on small screens', () => {
    beforeEach(() => {
      wrapper.setProps({ children: text.substr(0, 10) })
    })

    test('creates one chunk', () => {
      expect(wrapper.find('.chunk').length).toBe(1)
    })

    test('does not have a ReadMore', () => {
      expect(wrapper.find('.readMoreWrapButton').exists()).toBeFalsy()
    })
  })

  describe('when text does not fit on all screens', () => {
    describe('and there is a small amount of text', () => {
      beforeEach(() => {
        wrapper.setProps({ children: text.substr(0, 150) })
      })

      test('creates two chunks with corresponding classes', () => {
        const chunks = wrapper.find('.chunk')

        expect(chunks.length).toBe(2)

        chunks.forEach((chunk, index) => {
          expect(chunk.hasClass(`chunk-${index}`)).toBeTruthy()
        })
      })

      test('adds a ReadMore button with the corresponding class', () => {
        expect(wrapper.find('.readMoreWrapButton').exists()).toBeTruthy()
        expect(wrapper.find('.readMoreWrapButton').hasClass('readMoreWrapButtonChunk-2')).toBeTruthy()
      })
    })

    describe('and there is a medium amount of text', () => {
      beforeEach(() => {
        wrapper.setProps({ children: text.substr(0, 200) })
      })

      test('creates three chunks with corresponding classes', () => {
        const chunks = wrapper.find('.chunk')

        expect(chunks.length).toBe(3)

        chunks.forEach((chunk, index) => {
          expect(chunk.hasClass(`chunk-${index}`)).toBeTruthy()
        })
      })

      test('adds a ReadMore button with the corresponding class', () => {
        expect(wrapper.find('.readMoreWrapButton').exists()).toBeTruthy()
        expect(wrapper.find('.readMoreWrapButton').hasClass('readMoreWrapButtonChunk-3')).toBeTruthy()
      })
    })

    describe('and there is a large amount of text', () => {
      beforeEach(() => {
        wrapper.setProps({ children: text.substr(0, 250) })
      })

      test('creates four chunks with corresponding classes', () => {
        const chunks = wrapper.find('.chunk')

        expect(chunks.length).toBe(4)

        chunks.forEach((chunk, index) => {
          expect(chunk.hasClass(`chunk-${index}`)).toBeTruthy()
        })
      })

      test('adds a ReadMore button with the corresponding class', () => {
        expect(wrapper.find('.readMoreWrapButton').exists()).toBeTruthy()
        expect(wrapper.find('.readMoreWrapButton').hasClass('readMoreWrapButtonChunk-4')).toBeTruthy()
      })
    })

    describe('and there is a very large amount of text', () => {
      beforeEach(() => {
        wrapper.setProps({ children: text })
      })

      test('creates four chunks with corresponding classes', () => {
        const chunks = wrapper.find('.chunk')

        expect(chunks.length).toBe(5)

        chunks.forEach((chunk, index) => {
          expect(chunk.hasClass(`chunk-${index}`)).toBeTruthy()
        })
      })

      test('adds a ReadMore button with the corresponding class', () => {
        expect(wrapper.find('.readMoreWrapButton').exists()).toBeTruthy()
        expect(wrapper.find('.readMoreWrapButton').hasClass('readMoreWrapButtonChunk-5')).toBeTruthy()
      })

      describe('and the button is clicked', () => {
        beforeEach(() => {
          wrapper.find('.readMoreButton').simulate('click')
        })

        test('adds the isExpanded class on the wrapper', () => {
          expect(wrapper.find('.readMoreWrapper').hasClass('isExpanded')).toBeTruthy()
        })
      })
    })
  })
})
