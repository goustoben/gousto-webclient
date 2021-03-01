import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import { VariantHeader } from '../VariantHeader'

describe('VariantHeader', () => {
  describe('When there are no alternatives', () => {
    test('then it should not render a header', () => {
      const wrapper = mount(<VariantHeader recipeVariants={null} />)
      expect(wrapper.find('.variantHeader')).toHaveLength(0)
    })
  })

  describe('When a recipe has alternatives', () => {
    describe('When there is an array of recipe variants', () => {
      describe('When the array is empty', () => {
        test('then it should not render a header', () => {
          const wrapper = mount(<VariantHeader recipeVariants={{ type: 'alternatives', alternatives: Immutable.List() }} />)
          expect(wrapper.find('.variantHeader')).toHaveLength(0)
        })
      })

      describe('When there are 3 recipe alternatives', () => {
        let wrapper

        beforeEach(() => {
          wrapper = mount(<VariantHeader
            recipeVariants={
              {
                type: 'alternatives',
                alternatives: Immutable.List([
                  { id: '1230-1230', coreRecipeId: '1230', displayName: 'Alternative One' },
                  { id: '1234-1234', coreRecipeId: '1234', displayName: 'Alternative Two' }
                ])
              }
            }
            isOutOfStock={false}
          />)
        })

        test('then it should render the correct number of recipe variants on the header', () => {
          expect(wrapper.find('.variantHeader').text()).toEqual('3 options available')
        })

        describe('when textOverride is provided', () => {
          const override = 'Swap for Lean Beef'

          beforeEach(() => {
            wrapper.setProps({ textOverride: override })
          })

          test('then it should render the text', () => {
            expect(wrapper.find('.variantHeader').text()).toEqual(override)
          })
        })

        describe('When given the theme grey', () => {
          beforeEach(() => {
            wrapper.setProps({ theme: 'grey' })
          })

          test('then it should have the class themeGrey', () => {
            expect(wrapper.find('.variantHeader').hasClass('themeGrey')).toBe(true)
          })

          test('then it should not have the class themeBlue', () => {
            expect(wrapper.find('.variantHeader').hasClass('themeBlue')).toBe(false)
          })
        })

        describe('When given theme blue', () => {
          beforeEach(() => {
            wrapper.setProps({ theme: 'blue' })
          })

          test('then it should have the class themeBlue', () => {
            expect(wrapper.find('.variantHeader').hasClass('themeBlue')).toBe(true)
          })

          test('then it should not have the class themeGrey', () => {
            expect(wrapper.find('.variantHeader').hasClass('themeGrey')).toBe(false)
          })
        })

        describe('When given no theme', () => {
          beforeEach(() => {
            wrapper.setProps({ theme: undefined })
          })

          test('then it should have the class themeBlue', () => {
            expect(wrapper.find('.variantHeader').hasClass('themeBlue')).toBe(true)
          })

          test('then it should not have the class themeGrey', () => {
            expect(wrapper.find('.variantHeader').hasClass('themeGrey')).toBe(false)
          })
        })

        describe('When given the bannerPosition top', () => {
          beforeEach(() => {
            wrapper.setProps({ bannerPosition: 'top' })
          })

          test('then it should have the class positionTop', () => {
            expect(wrapper.find('.variantHeader').hasClass('positionTop')).toBe(true)
          })

          test('then it should not have the class positionBottom', () => {
            expect(wrapper.find('.variantHeader').hasClass('positionBottom')).toBe(false)
          })
        })

        describe('When given the bannerPosition bottom', () => {
          beforeEach(() => {
            wrapper.setProps({ bannerPosition: 'bottom' })
          })

          test('then it should have the class positionBottom', () => {
            expect(wrapper.find('.variantHeader').hasClass('positionBottom')).toBe(true)
          })

          test('then it should not have the class positionTop', () => {
            expect(wrapper.find('.variantHeader').hasClass('positionTop')).toBe(false)
          })
        })

        describe('When given no bannerPosition', () => {
          beforeEach(() => {
            wrapper.setProps({ bannerPosition: undefined })
          })

          test('then it should have the class positionTop', () => {
            expect(wrapper.find('.variantHeader').hasClass('positionTop')).toBe(true)
          })

          test('then it should not have the class positionBottom', () => {
            expect(wrapper.find('.variantHeader').hasClass('positionBottom')).toBe(false)
          })
        })
      })

      describe('When there are 5 recipe alternatives', () => {
        test('then it should render the correct number of recipe variants on the header', () => {
          const wrapper = mount(<VariantHeader
            recipeVariants={
              {
                type: 'alternatives',
                alternatives: Immutable.List([
                  { id: '1230' },
                  { id: '125' },
                  { id: '126' },
                  { id: '127' },
                  { id: '1284' },
                ])
              }
            }
            isOutOfStock={false}
          />)
          expect(wrapper.find('.variantHeader').text()).toEqual('6 options available')
        })
      })

      describe('When the recipe is out of stock', () => {
        test('then it should not render a header', () => {
          const wrapper = mount(<VariantHeader
            recipeVariants={{
              type: 'alternatives',
              alternatives: Immutable.List([{ id: '1230' }])
            }}
            isOutOfStock
          />)
          expect(wrapper.find('.variantHeader')).toHaveLength(0)
        })
      })
    })
  })
})
