import React from 'react'
import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { mount } from 'enzyme'
import { RecipesInBasketProgressContent } from '..'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('RecipesInBasketProgressContent', () => {
  let wrapper
  const props = {
    selectedRecipesCount: 0,
    percentage: 0,
  }

  beforeEach(() => {
    useSelector.mockReturnValue(true)
    useDispatch.mockReturnValue(() => {})
    wrapper = mount(
      <RecipesInBasketProgressContent {...props} />
    )
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<RecipesInBasketProgressContent {...props} />, div)
  })

  describe('when 1 recipe is selected', () => {
    beforeEach(() => {
      wrapper.setProps({ selectedRecipesCount: 1, percentage: 25 })
    })

    describe('inside the LayoutContentWrapper', () => {
      let layoutContentWrapper

      beforeEach(() => {
        layoutContentWrapper = wrapper.find('LayoutContentWrapper')
      })

      describe('inside a Layout2Cells', () => {
        let layout2Cells

        beforeEach(() => {
          layout2Cells = layoutContentWrapper.find('Layout2Cells')
        })

        test('renders the percentage in the first cell', () => {
          expect(layout2Cells.find('.item-0').text()).toBe('25%')
        })

        test('renders the basket progress text in the second cell', () => {
          expect(
            layout2Cells
              .find('.item-1')
              .find('BoxProgressMessage')
              .prop('numRecipes')
          ).toBe(1)
        })
      })

      test('renders a ProgressBar at 25 percent with the transition-1 theme', () => {
        const progressBar = layoutContentWrapper.find('ProgressBar')

        expect(progressBar.prop('percentage')).toBe(25)
        expect(progressBar.prop('theme')).toBe('transition-1')
      })
    })
  })

  describe('when 2 recipes are selected', () => {
    beforeEach(() => {
      wrapper.setProps({ selectedRecipesCount: 2, percentage: 50 })
    })

    describe('inside the LayoutContentWrapper', () => {
      let layoutContentWrapper

      beforeEach(() => {
        layoutContentWrapper = wrapper
          .find('LayoutContentWrapper')
      })

      describe('inside a Layout2Cells', () => {
        let layout2Cells

        beforeEach(() => {
          layout2Cells = layoutContentWrapper.find('Layout2Cells')
        })

        test('renders the percentage in the first cell', () => {
          expect(layout2Cells.find('.item-0').text()).toBe('50%')
        })

        test('renders the basket progress text in the second cell', () => {
          expect(
            layout2Cells
              .find('.item-1')
              .find('BoxProgressMessage')
              .prop('numRecipes')
          ).toBe(2)
        })
      })

      test('renders a ProgressBar at 50 percent with the transition-1 theme', () => {
        const progressBar = layoutContentWrapper.find('ProgressBar')

        expect(progressBar.prop('percentage')).toBe(50)
        expect(progressBar.prop('theme')).toBe('transition-1')
      })
    })
  })

  describe('when 3 recipes are selected', () => {
    beforeEach(() => {
      wrapper.setProps({ selectedRecipesCount: 3, percentage: 75 })
    })

    describe('inside the LayoutContentWrapper', () => {
      let layoutContentWrapper

      beforeEach(() => {
        layoutContentWrapper = wrapper
          .find('LayoutContentWrapper')
      })

      describe('inside a Layout2Cells', () => {
        let layout2Cells

        beforeEach(() => {
          layout2Cells = layoutContentWrapper.find('Layout2Cells')
        })

        test('renders the percentage in the first cell', () => {
          expect(layout2Cells.find('.item-0').text()).toBe('75%')
        })

        test('renders the basket progress text in the second cell', () => {
          expect(
            layout2Cells
              .find('.item-1')
              .find('BoxProgressMessage')
              .prop('numRecipes')
          ).toBe(3)
        })
      })

      test('renders a ProgressBar at 75 percent with the transition-1 theme', () => {
        const progressBar = layoutContentWrapper.find('ProgressBar')

        expect(progressBar.prop('percentage')).toBe(75)
        expect(progressBar.prop('theme')).toBe('transition-1')
      })
    })
  })

  describe('when 4 recipes are selected', () => {
    beforeEach(() => {
      wrapper.setProps({ selectedRecipesCount: 4, percentage: 100 })
    })

    describe('inside the LayoutContentWrapper', () => {
      let layoutContentWrapper

      beforeEach(() => {
        layoutContentWrapper = wrapper
          .find('LayoutContentWrapper')
      })

      describe('inside a Layout2Cells', () => {
        let layout2Cells

        beforeEach(() => {
          layout2Cells = layoutContentWrapper.find('Layout2Cells')
        })

        test('renders the progress completed icon in the first cell', () => {
          expect(layout2Cells.find('.item-0').find('.iconProgressCompleted'))
            .toHaveLength(1)
        })

        test('renders the basket progress text in the second cell', () => {
          expect(
            layout2Cells
              .find('.item-1')
              .find('BoxProgressMessage')
              .prop('numRecipes')
          ).toBe(4)
        })
      })

      test('does not show the progress bar', () => {
        expect(layoutContentWrapper.find('ProgressBar')).toHaveLength(0)
      })
    })
  })
})
