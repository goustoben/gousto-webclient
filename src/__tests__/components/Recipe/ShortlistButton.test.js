import React from 'react'
import { shallow, mount } from 'enzyme'
import { ShortlistButton } from 'Recipe/ShortlistButton/ShortlistButton'

describe('<ShortlistButton />', () => {
  let wrapper
  const addToShortlistSpy = jest.fn()
  const removeFromShortlistSpy = jest.fn()
  const menuBrowseCTAVisibilityChangeSpy = jest.fn()
  const incrementTutorialViewedSpy = jest.fn()
  const tutorialTrackingSpy = jest.fn()
  const shortlistButtonProps = {
    shortlistLimitReached: false,
    addToShortlist: addToShortlistSpy,
    removeFromShortlist: removeFromShortlistSpy,
    menuBrowseCTAVisibilityChange: menuBrowseCTAVisibilityChangeSpy,
    incrementTutorialViewed: incrementTutorialViewedSpy,
    tutorialTracking: tutorialTrackingSpy,
    stock: 1000,
    id: '1234',
    position: 1
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Render', () => {
    test('should render correctly if recipeInShortlist is false', () => {
      wrapper = shallow(<ShortlistButton {...shortlistButtonProps} recipeInShortlist={false} />)

      expect(wrapper).toMatchSnapshot()
    })

    test('should show tick if recipeInShorlist is true', () => {
      wrapper = shallow(<ShortlistButton {...shortlistButtonProps} recipeInShortlist />)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('onShortlistClick', () => {
    wrapper = mount(<ShortlistButton {...shortlistButtonProps} />)

    test('should add recipe to shortlist if recipeInShortlist is false, shortlistLimitReached isnt reached and recipe is in stock - and change recipeInShortlist state', () => {
      wrapper.setProps({ recipeInShortlist: false })
      wrapper.find('button').simulate('click')

      expect(addToShortlistSpy).toHaveBeenCalledTimes(1)
    })

    test('should call menuBrowseCTAVisibilityChange if stock is null', () => {
      wrapper.setProps({ stock: null, recipeInShortlist: false })
      wrapper.find('button').simulate('click')

      expect(menuBrowseCTAVisibilityChangeSpy).toHaveBeenCalledTimes(1)
      expect(addToShortlistSpy).not.toHaveBeenCalled()
      expect(removeFromShortlistSpy).not.toHaveBeenCalled()
    })

    test('should NOT add recipe to shortlist if recipeInShortlist is false and shortlistLimitReached is reached', () => {
      wrapper.setProps({ stock: 1000, shortlistLimitReached: true, recipeInShortlist: false })

      wrapper.find('button').simulate('click')

      expect(addToShortlistSpy).not.toHaveBeenCalled()
      expect(removeFromShortlistSpy).not.toHaveBeenCalled()
    })

    test('should remove recipe from shortlist if recipeInShortlist is true - and change recipeInShortlist state', () => {
      wrapper.setProps({ recipeInShortlist: true })

      wrapper.find('button').simulate('click')

      expect(removeFromShortlistSpy).toHaveBeenCalledTimes(1)
      expect(addToShortlistSpy).not.toHaveBeenCalled()
    })

    test('should call closeTutorial if add first time recipe in shortlist and tutorial opened', () => {
      wrapper.setProps({ shortlistTutorialStep1Viewed: false, stock: 1000, shortlistLimitReached: false, recipeInShortlist: false })

      wrapper.find('button').simulate('click')

      expect(incrementTutorialViewedSpy).toHaveBeenCalledTimes(1)
      expect(tutorialTrackingSpy).toHaveBeenCalledTimes(1)
    })
  })
})
