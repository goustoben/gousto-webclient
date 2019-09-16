import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'

import { RecipesInBasketProgress } from '..'

describe('RecipesInBasketProgress Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <RecipesInBasketProgress selectedRecipesCount={0} />
    )
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<RecipesInBasketProgress selectedRecipesCount={0} />, div)
  })

  describe('when no recipes are selected', () => {
    beforeEach(() => {
      wrapper.setProps({ selectedRecipesCount: 0 })
    })

    test('it does not render', () => {
      expect(wrapper.html()).toBeNull()
    })
  })

  describe('when 1 recipe is selected', () => {
    beforeEach(() => {
      wrapper.setProps({ selectedRecipesCount: 1 })
    })

    describe('FloatCard renders correctly', () => {
      test('it renders a FloatCard', () => {
        expect(wrapper.find('FloatCard')).toHaveLength(1)
      })

      test('the FloatCard close icon only shows in mobile', () => {
        expect(wrapper.find('FloatCard').prop('closeIcon'))
          .toBe('small-screens-only')
      })

      test('the FloatCard has the right offset', () => {
        expect(wrapper.find('FloatCard').prop('offsetVertical')).toBe('8rem')
      })

      test('it renders a LayoutContentWrapper inside the FloatCard', () => {
        expect(wrapper.find('FloatCard').find('LayoutContentWrapper'))
          .toHaveLength(1)
      })
    })

    describe('inside the LayoutContentWrapper', () => {
      let layoutContentWrapper

      beforeEach(() => {
        layoutContentWrapper = wrapper
          .find('FloatCard')
          .find('LayoutContentWrapper')
      })

      describe('inside a Layout2Cells', () => {
        let layout2Cells

        beforeEach(() => {
          layout2Cells = layoutContentWrapper.find('Layout2Cells')
        })

        test('it renders the percentage in the first cell', () => {
          expect(layout2Cells.find('.item-0').text()).toBe('25%')
        })

        test('it renders the basket progress text in the second cell', () => {
          expect(
            layout2Cells
              .find('.item-1')
              .find('BoxProgressMessage')
              .prop('numRecipes')
          ).toBe(1)
        })
      })

      test('it renders a ProgressBar at 25 percent with the transition-1 theme', () => {
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

    describe('FloatCard renders correctly', () => {
      test('it renders a FloatCard', () => {
        expect(wrapper.find('FloatCard')).toHaveLength(1)
      })

      test('the FloatCard close icon only shows in mobile', () => {
        expect(wrapper.find('FloatCard').prop('closeIcon'))
          .toBe('small-screens-only')
      })

      test('the FloatCard has the right offset', () => {
        expect(wrapper.find('FloatCard').prop('offsetVertical')).toBe('8rem')
      })

      test('it renders a LayoutContentWrapper inside the FloatCard', () => {
        expect(wrapper.find('FloatCard').find('LayoutContentWrapper'))
          .toHaveLength(1)
      })
    })

    describe('inside the LayoutContentWrapper', () => {
      let layoutContentWrapper

      beforeEach(() => {
        layoutContentWrapper = wrapper
          .find('FloatCard')
          .find('LayoutContentWrapper')
      })

      describe('inside a Layout2Cells', () => {
        let layout2Cells

        beforeEach(() => {
          layout2Cells = layoutContentWrapper.find('Layout2Cells')
        })

        test('it renders the percentage in the first cell', () => {
          expect(layout2Cells.find('.item-0').text()).toBe('50%')
        })

        test('it renders the basket progress text in the second cell', () => {
          expect(
            layout2Cells
              .find('.item-1')
              .find('BoxProgressMessage')
              .prop('numRecipes')
          ).toBe(2)
        })
      })

      test('it renders a ProgressBar at 50 percent with the transition-1 theme', () => {
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

    describe('FloatCard renders correctly', () => {
      test('it renders a FloatCard', () => {
        expect(wrapper.find('FloatCard')).toHaveLength(1)
      })

      test('the FloatCard close icon only shows in mobile', () => {
        expect(wrapper.find('FloatCard').prop('closeIcon'))
          .toBe('small-screens-only')
      })

      test('the FloatCard has the right offset', () => {
        expect(wrapper.find('FloatCard').prop('offsetVertical')).toBe('8rem')
      })

      test('it renders a LayoutContentWrapper inside the FloatCard', () => {
        expect(wrapper.find('FloatCard').find('LayoutContentWrapper'))
          .toHaveLength(1)
      })
    })

    describe('inside the LayoutContentWrapper', () => {
      let layoutContentWrapper

      beforeEach(() => {
        layoutContentWrapper = wrapper
          .find('FloatCard')
          .find('LayoutContentWrapper')
      })

      describe('inside a Layout2Cells', () => {
        let layout2Cells

        beforeEach(() => {
          layout2Cells = layoutContentWrapper.find('Layout2Cells')
        })

        test('it renders the percentage in the first cell', () => {
          expect(layout2Cells.find('.item-0').text()).toBe('75%')
        })

        test('it renders the basket progress text in the second cell', () => {
          expect(
            layout2Cells
              .find('.item-1')
              .find('BoxProgressMessage')
              .prop('numRecipes')
          ).toBe(3)
        })
      })

      test('it renders a ProgressBar at 75 percent with the transition-1 theme', () => {
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

    describe('FloatCard renders correctly', () => {
      test('it renders a FloatCard', () => {
        expect(wrapper.find('FloatCard')).toHaveLength(1)
      })

      test('the FloatCard close icon only shows in mobile', () => {
        expect(wrapper.find('FloatCard').prop('closeIcon'))
          .toBe('small-screens-only')
      })

      test('the FloatCard has the right offset', () => {
        expect(wrapper.find('FloatCard').prop('offsetVertical')).toBe('8rem')
      })

      test('it has the class .greenBorder', () => {
        expect(wrapper.find('.greenBorder')).toHaveLength(1)
      })

      test('it renders a LayoutContentWrapper inside the FloatCard', () => {
        expect(wrapper.find('FloatCard').find('LayoutContentWrapper'))
          .toHaveLength(1)
      })
    })

    describe('inside the LayoutContentWrapper', () => {
      let layoutContentWrapper

      beforeEach(() => {
        layoutContentWrapper = wrapper
          .find('FloatCard')
          .find('LayoutContentWrapper')
      })

      describe('inside a Layout2Cells', () => {
        let layout2Cells

        beforeEach(() => {
          layout2Cells = layoutContentWrapper.find('Layout2Cells')
        })

        test('it renders the progress completed icon in the first cell', () => {
          expect(layout2Cells.find('.item-0').find('.iconProgressCompleted'))
            .toHaveLength(1)
        })

        test('it renders the basket progress text in the second cell', () => {
          expect(
            layout2Cells
              .find('.item-1')
              .find('BoxProgressMessage')
              .prop('numRecipes')
          ).toBe(4)
        })
      })

      test('it does not show the progress bar', () => {
        expect(layoutContentWrapper.find('ProgressBar')).toHaveLength(0)
      })
    })
  })
})
