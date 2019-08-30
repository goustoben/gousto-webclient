import React from 'react'
import { shallow, mount } from 'enzyme'
import { ShortlistButton } from 'Recipe/ShortlistButton/ShortlistButton'

describe('<ShortlistButton />', () => {
  let wrapper
  const addToShortlistSpy = jest.fn()
  const removeFromShortlistSpy = jest.fn()
  const menuBrowseCTAVisibilityChangeSpy = jest.fn()
  const shortlistButtonProps = {
    shortlistLimitReached: false,
    addToShortlist: addToShortlistSpy,
    removeFromShortlist: removeFromShortlistSpy,
    menuBrowseCTAVisibilityChange: menuBrowseCTAVisibilityChangeSpy,
    stock: 1000,
    id: '1234',
    position: 1
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Render', () => {
    test('should show SVG when renders', () => {
      wrapper = shallow(<ShortlistButton {...shortlistButtonProps} />)

      expect(wrapper.find('Svg').length).toBe(1)
    })

    test('should show blue heart (deseleted) if recipeInShorlist is false', () => {
      wrapper = shallow(<ShortlistButton {...shortlistButtonProps} />)
      wrapper.setState({recipeInShortlist: false})

      expect(wrapper.find("[fileName='icon_shortlist_heart_deselected']").length).toBe(1)
      expect(wrapper.find('.blueHeartButton').length).toBe(1)
    })

    test('should show red heart (seleted) if recipeInShorlist is true', () => {
      wrapper = shallow(<ShortlistButton {...shortlistButtonProps} />)
      wrapper.setProps({recipeInShortlist: true})

      expect(wrapper.find("[fileName='icon_shortlist_heart_selected']").length).toBe(1)
      expect(wrapper.find('.redHeartButton').length).toBe(1)
    })

    test('should include defaultDetailView css if display is detailOverview', () => {
      wrapper = shallow(<ShortlistButton {...shortlistButtonProps} />)
      wrapper.setProps({display: 'detailOverlay'})

      expect(wrapper.find('.defaultDetailView').length).toBe(1)
    })
  })

  describe('onShortlistClick', () => {
    wrapper = mount(<ShortlistButton {...shortlistButtonProps }/>)

    test('should add recipe to shortlist if recipeInShortlist is false, shortlistLimitReached isnt reached and recipe is in stock - and change recipeInShortlist state', () => {
      wrapper.setProps({recipeInShortlist: false})
      wrapper.find('button').simulate('click')

      expect(addToShortlistSpy).toHaveBeenCalledTimes(1)
    })

    test('should call menuBrowseCTAVisibilityChange if stock is null', () => {
      wrapper.setProps({stock: null, recipeInShortlist: false})
      wrapper.find('button').simulate('click')

      expect(menuBrowseCTAVisibilityChangeSpy).toHaveBeenCalledTimes(1)
      expect(addToShortlistSpy).not.toHaveBeenCalled()
      expect(removeFromShortlistSpy).not.toHaveBeenCalled()
    })

    test('should NOT add recipe to shortlist if recipeInShortlist is false and shortlistLimitReached is reached', () => {
      wrapper.setProps({stock: 1000, shortlistLimitReached: true, recipeInShortlist: false})

      wrapper.find('button').simulate('click')

      expect(addToShortlistSpy).not.toHaveBeenCalled()
      expect(removeFromShortlistSpy).not.toHaveBeenCalled()
    })

    test('should remove recipe from shortlist if recipeInShortlist is true - and change recipeInShortlist state', () => {
      wrapper.setProps({recipeInShortlist: true})

      wrapper.find('button').simulate('click')

      expect(removeFromShortlistSpy).toHaveBeenCalledTimes(1)
      expect(addToShortlistSpy).not.toHaveBeenCalled()
    })
  })
})
