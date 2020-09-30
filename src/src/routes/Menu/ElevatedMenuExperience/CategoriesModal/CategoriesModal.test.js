import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { CategoriesModal } from './CategoriesModal'
import { CategoriesThumbnailContainer } from '../CategoriesThumbnail'

describe('CategoriesModal', () => {
  let wrapper
  const props = {
    showCategoriesModal: jest.fn(),
    hideCategoriesModal: jest.fn(),
    categoryButtonClicked: jest.fn(),
    menuCollections: Immutable.fromJS({
      123: {
        published: true,
        shortTitle: 'Vegetarian',
        slug: 'vegetarian',
        id: '123',
        default: true,
        recipesInCollection: ['', '', ''],
      },
      234: {
        published: true,
        shortTitle: 'Gluten free',
        slug: 'gluten-free',
        id: '234',
        recipesInCollection: ['', '', ''],
      },
      456: {
        published: false,
        shortTitle: 'Dairy free',
        slug: 'dairy-free',
        id: '456',
        recipesInCollection: ['', '', ''],
      },
    }),
    collectionFilterChange: jest.fn(),
  }

  describe('the appearance', () => {
    beforeEach(() => {
      wrapper = shallow(<CategoriesModal {...props} />)
    })

    test('should render ModalComponent with right props', () => {
      expect(wrapper.find('ModalComponent').prop('visible')).toEqual(props.showCategoriesModal)
      expect(wrapper.find('ModalComponent').prop('styleName')).toEqual('categoriesModal')
    })

    test('should render categoriesModalCloseX', () => {
      expect(wrapper.find('.categoriesModalCloseX').exists()).toBe(true)
    })

    test('should render the correct number of category buttons', () => {
      expect(wrapper.find('.categoriesTitleWrapper')).toHaveLength(3)
    })

    test('should render a category thumbnail component', () => {
      expect(wrapper.find(CategoriesThumbnailContainer).exists()).toBe(true)
    })

    describe('functionality', () => {
      beforeEach(() => {
        wrapper = shallow(<CategoriesModal {...props} />)
      })
      describe('when the close "x" button is clicked', () => {
        test('should call hideCategoriesModal', () => {
          wrapper.find('.categoriesModalCloseX').first().simulate('click', {
            stopPropagation: () => {}
          })
          expect(props.hideCategoriesModal).toHaveBeenCalled()
        })
      })

      describe('when a category is clicked', () => {
        test('should call showCategoriesModal', () => {
          wrapper.find('.categoriesTitleWrapper').first().simulate('click', {
            stopPropagation: () => {}
          })
          expect(props.hideCategoriesModal).toHaveBeenCalled()
          expect(props.collectionFilterChange).toHaveBeenCalled()
          expect(props.categoryButtonClicked).toHaveBeenCalled()
        })
      })

      describe('when a category is selected with key press', () => {
        test('should call showCategoriesModal', () => {
          wrapper.find('.categoriesTitleWrapper').first().simulate('keypress', {key: 'enter'})
          expect(props.hideCategoriesModal).toHaveBeenCalled()
          expect(props.collectionFilterChange).toHaveBeenCalled()
          expect(props.categoryButtonClicked).toHaveBeenCalled()
        })
      })
    })

    describe('back to menu', () => {
      beforeEach(() => {
        wrapper = shallow(<CategoriesModal {...props} />)
      })
      describe('when back to menu button is clicked', () => {
        test('should call hideCategoriesModal', () => {
          wrapper.find('.categoriesModalBackToMenuButton').first().simulate('click')
          expect(props.hideCategoriesModal).toHaveBeenCalled()
        })
      })
    })
  })
})
