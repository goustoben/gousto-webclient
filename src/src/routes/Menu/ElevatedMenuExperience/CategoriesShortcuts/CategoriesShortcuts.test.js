import React from 'react'
import { shallow } from 'enzyme'
import { CategoriesShortcuts } from './CategoriesShortcuts'

describe('CategoriesShortcuts', () => {
  let wrapper
  const props = {
    collectionFilterChange: jest.fn(),
    showCategoriesModal: jest.fn(),
    categoryShortcutClicked: jest.fn(),
    push: jest.fn()
  }

  describe('the appearance', () => {
    beforeEach(() => {
      wrapper = shallow(<CategoriesShortcuts {...props} />)
    })

    test('renders three buttons', () => {
      expect(wrapper.find('button')).toHaveLength(3)
    })

    describe('functionality', () => {
      beforeEach(() => {
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
})
