import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'

import { RecipesInBasketProgressContent} from '..'

describe('RecipesInBasketProgressContent', () => {
  let wrapper
  let PROPS = {
    selectedRecipesCount: 0,
  }

  beforeEach(() => {
    wrapper = mount(
      <RecipesInBasketProgressContent {...PROPS} />
    )
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<RecipesInBasketProgressContent {...PROPS} />, div)
  })

  describe('when 1 recipe is selected', () => {
    beforeEach(() => {
      wrapper.setProps({ selectedRecipesCount: 1 })
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
      wrapper.setProps({ selectedRecipesCount: 2 })
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
      wrapper.setProps({ selectedRecipesCount: 3 })
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
      wrapper.setProps({ selectedRecipesCount: 4 })
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
