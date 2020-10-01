import React, { createRef } from 'react'
import { shallow } from 'enzyme'
import { CategoriesShortcuts } from './CategoriesShortcuts'

jest.mock('react', () => {
  const originReact = jest.requireActual('react')
  const mCreateRef = jest.fn()

  return {
    ...originReact,
    createRef: mCreateRef,
  }
})

jest.mock('../CategoriesThumbnail', () => ({
  CategoriesThumbnailContainer: () => null,
}))

describe('CategoriesShortcuts', () => {
  let wrapper
  const spyScrollTo = jest.fn()
  const props = {
    collectionFilterChange: jest.fn(),
    showCategoriesModal: jest.fn(),
    categoryShortcutClicked: jest.fn(),
    push: jest.fn()
  }

  describe('the appearance', () => {
    beforeEach(() => {
      createRef.mockReturnValueOnce({ current: { offsetTop: 100 } })
      wrapper = shallow(<CategoriesShortcuts {...props} />)
    })

    test('renders three buttons', () => {
      expect(wrapper.find('button')).toHaveLength(3)
    })

    describe('functionality', () => {
      beforeEach(() => {
        createRef.mockReturnValueOnce({ current: { offsetTop: 100 } })
        wrapper = shallow(<CategoriesShortcuts {...props} />)
      })

      describe('when All recipes is clicked', () => {
        test('should call collectionFilterChange', () => {
          wrapper.find('.smallShortcut').first().simulate('click', {
            stopPropagation: () => {}
          })
          expect(props.collectionFilterChange).toHaveBeenCalled()
        })

        test('should call categoryShortcutClicked', () => {
          wrapper.find('.smallShortcut').first().simulate('click', {
            stopPropagation: () => {}
          })
          expect(props.categoryShortcutClicked).toHaveBeenCalledWith({
            shortcutName: 'all_categories'
          })
        })
      })

      describe('When dietary requirements is clicked', () => {
        test('should call categoryShortcutClicked', () => {
          wrapper.find('.smallShortcut').last().simulate('click', {
            stopPropagation: () => {}
          })
          expect(props.categoryShortcutClicked).toHaveBeenCalledWith({
            shortcutName: 'dietary_requirements'
          })
        })

        test('should navigate to /menu/dietary-requirements', () => {
          wrapper.find('.smallShortcut').last().simulate('click', {
            stopPropagation: () => {}
          })
          expect(props.push).toHaveBeenCalledWith('/menu/dietary-requirements')
        })
      })

      describe('when View recipecategories is clicked', () => {
        test('should call showCategoriesModal', () => {
          wrapper.find('.recipeCategoriesButton').simulate('click', {
            stopPropagation: () => {}
          })
          expect(props.showCategoriesModal).toHaveBeenCalled()
        })
      })
    })
  })

  describe('scroll', () => {
    describe('when window scroll is less than offsetTop', () => {
      beforeEach(() => {
        createRef.mockReturnValueOnce({ current: { offsetTop: 100 } })
        wrapper = shallow(<CategoriesShortcuts {...props} />)
      })

      test('should set isRecipeCategoriesButtonFixed to false', () => {
        expect(wrapper.state()).toEqual({ isRecipeCategoriesButtonFixed: false })
        expect(wrapper.find('.recipeCategoriesButtonFixed').length).toEqual(0)
      })
    })

    describe('when window scroll is equal to offsetTop', () => {
      beforeEach(() => {
        Object.defineProperty(window, 'scrollTo', { value: spyScrollTo })
        Object.defineProperty(window, 'scrollY', { value: 100 })
        spyScrollTo.mockClear()
        createRef.mockReturnValueOnce({ current: { offsetTop: 100 } })
        wrapper = shallow(<CategoriesShortcuts {...props} />)
      })

      test('should set isRecipeCategoriesButtonFixed to true', () => {
        expect(wrapper.state()).toEqual({ isRecipeCategoriesButtonFixed: true })
        expect(wrapper.find('.recipeCategoriesButtonFixed').length).toEqual(1)
      })
    })

    describe('when window scroll is greater than offsetTop', () => {
      beforeEach(() => {
        Object.defineProperty(window, 'scrollTo', { value: spyScrollTo })
        Object.defineProperty(window, 'scrollY', { value: 200 })
        spyScrollTo.mockClear()
        createRef.mockReturnValueOnce({ current: { offsetTop: 100 } })
        wrapper = shallow(<CategoriesShortcuts {...props} />)
      })

      test('should set isRecipeCategoriesButtonFixed to true', () => {
        expect(wrapper.state()).toEqual({ isRecipeCategoriesButtonFixed: true })
        expect(wrapper.find('.recipeCategoriesButtonFixed').length).toEqual(1)
      })
    })
  })

  describe('component mount', () => {
    const map = {}
    const windowAddEventListener = jest.fn((event, cb) => {
      map[event] = cb
    })
    const windowRemoveEventListener = jest.fn((event, cb) => {
      map[event] = cb
    })
    const handleWindowScroll = jest.fn()

    beforeEach(() => {
      class CategoriesShortcutsTest extends CategoriesShortcuts {
        constructor(properties) {
          super(properties)
          this.handleWindowScroll = handleWindowScroll
        }

        render() {
          return (<CategoriesShortcuts {...props} />)
        }
      }

      window.addEventListener = windowAddEventListener
      window.removeEventListener = windowRemoveEventListener

      createRef.mockReturnValueOnce({ current: { offsetTop: 100 } })
      wrapper = shallow(<CategoriesShortcutsTest {...props} />)
    })

    describe('when component mounts', () => {
      test('should call handleWindowScroll', () => {
        expect(windowAddEventListener).toBeCalledWith('scroll', handleWindowScroll)
        expect(handleWindowScroll).toBeCalled()
      })
    })

    describe('when component unmounts', () => {
      test('should remove event listener with handleWindowScroll', () => {
        wrapper.unmount()
        expect(windowRemoveEventListener).toBeCalledWith('scroll', handleWindowScroll)
      })
    })
  })
})
