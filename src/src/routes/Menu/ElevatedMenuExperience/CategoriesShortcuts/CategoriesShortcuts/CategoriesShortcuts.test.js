import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { CategoriesShortcuts } from './CategoriesShortcuts'

describe('CategoriesShortcuts', () => {
  let wrapper
  const props = {
    collectionFilterChange: jest.fn(),
    showCategoriesModal: jest.fn()
  }

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CategoriesShortcuts {...props} />, div)
  })

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
