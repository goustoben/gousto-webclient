import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import config from 'config/basket'
import BoxProgressMessage from '../index'

describe('<BoxProgressMessage />', () => {
  const NO_RECIPES_TEXT = `Add ${config.maxRecipesNum} recipes for the best price per serving`
  const FULL_BOX_TEXT = 'Nice! You\'ve got the best price per serving'
  const MORE_RECIPES_TEXT = 'Add more recipes to complete your box'

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BoxProgressMessage numRecipes={0} />,
      div
    )
  })

  describe('when mounted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(<BoxProgressMessage numRecipes={0} />)
    })

    describe('when the number of recipes is within range', () => {
      describe('and there are no recipes added', () => {
        test('it renders the correct message', () => {
          expect(wrapper.text()).toBe(NO_RECIPES_TEXT)
        })

        describe('and a className is passed', () => {
          beforeEach(() => {
            wrapper.setProps({ className: 'a-class-name' })
          })

          test('the className is used in the paragraph', () => {
            expect(wrapper.find('p').hasClass('a-class-name')).toBe(true)
          })
        })
      })

      describe('and there is 1 recipe added', () => {
        beforeEach(() => {
          wrapper.setProps({ numRecipes: 1 })
        })

        test('renders the correct message', () => {
          expect(wrapper.text()).toBe(MORE_RECIPES_TEXT)
        })

        describe('and a className is passed', () => {
          beforeEach(() => {
            wrapper.setProps({ className: 'a-class-name' })
          })

          test('the className is used in the paragraph', () => {
            expect(wrapper.find('p').hasClass('a-class-name')).toBe(true)
          })
        })
      })

      describe('and there are 2 recipes added', () => {
        beforeEach(() => {
          wrapper.setProps({ numRecipes: 2 })
        })

        test('renders the correct message', () => {
          expect(wrapper.text()).toBe('Add 2 more recipes for the best price per serving')
        })

        describe('and a className is passed', () => {
          beforeEach(() => {
            wrapper.setProps({ className: 'a-class-name' })
          })

          test('the className is used in the paragraph', () => {
            expect(wrapper.find('p').hasClass('a-class-name')).toBe(true)
          })
        })
      })

      describe('and there are 4 recipes added', () => {
        beforeEach(() => {
          wrapper.setProps({ numRecipes: 4 })
        })

        test('renders the correct message', () => {
          expect(wrapper.text()).toBe(FULL_BOX_TEXT)
        })

        describe('and a className is passed', () => {
          beforeEach(() => {
            wrapper.setProps({ className: 'a-class-name' })
          })

          test('the className is used in the paragraph', () => {
            expect(wrapper.find('p').hasClass('a-class-name')).toBe(true)
          })
        })
      })
    })

    describe('when the number of recipes is out of range', () => {
      describe('and there are fewer than 0 recipes added', () => {
        beforeEach(() => {
          wrapper.setProps({ numRecipes: -1 })
        })

        test('renders the same message as when there are zero recipes', () => {
          expect(wrapper.text()).toBe(NO_RECIPES_TEXT)
        })

        describe('and a className is passed', () => {
          beforeEach(() => {
            wrapper.setProps({ className: 'a-class-name' })
          })

          test('the className is used in the paragraph', () => {
            expect(wrapper.find('p').hasClass('a-class-name')).toBe(true)
          })
        })
      })

      describe('and there are more than the maximum number of recipes added', () => {
        beforeEach(() => {
          wrapper.setProps({ numRecipes: 100 })
        })

        test('renders the same message as when there are four recipes', () => {
          expect(wrapper.text()).toBe(FULL_BOX_TEXT)
        })

        describe('and a className is passed', () => {
          beforeEach(() => {
            wrapper.setProps({ className: 'a-class-name' })
          })

          test('the className is used in the paragraph', () => {
            expect(wrapper.find('p').hasClass('a-class-name')).toBe(true)
          })
        })
      })
    })
  })
})
