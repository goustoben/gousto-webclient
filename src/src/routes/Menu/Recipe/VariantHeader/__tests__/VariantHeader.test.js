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
          const wrapper = mount(<VariantHeader recipeVariants={[]} />)
          expect(wrapper.find('.variantHeader')).toHaveLength(0)
        })
      })

      describe('When there are 3 recipe alternatives', () => {
        test('then it should render the correct number of recipe variants on the header', () => {
          const wrapper = mount(<VariantHeader
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
          expect(wrapper.find('.variantHeader').text()).toContain('3 options available')
        })
      })

      describe('When there are 5 recipe alternatives', () => {
        test('then it should render the correct number of recipe variants on the header', () => {
          const wrapper = mount(<VariantHeader
            recipeVariants={
              {
                type: 'alternatives',
                alternatives: Immutable.List([
                  { id: '1230'},
                  { id: '125'},
                  { id: '126'},
                  { id: '127'},
                  { id: '1284'},
                ])
              }
            }
            isOutOfStock={false}
          />)
          expect(wrapper.find('.variantHeader').text()).toContain('6 options available')
        })
      })

      describe('When the recipe is out of stock', () => {
        test('then it should not render a header', () => {
          const wrapper = mount(<VariantHeader
            recipeVariants={[
              { id: '1230'},
              { id: '125'},
            ]}
            isOutOfStock
          />)
          expect(wrapper.find('.variantHeader')).toHaveLength(0)
        })
      })
    })
  })

  describe('When there are no sides', () => {
    test('then it should not render a sides header', () => {
      const wrapper = mount(<VariantHeader recipeVariants={null} />)
      expect(wrapper.find('.variantHeaderSides')).toHaveLength(0)
    })
  })

  describe('When a recipe has sides', () => {
    describe('When there is an array of recipe sides variants', () => {
      describe('When the array is empty', () => {
        test('then it should not render a header', () => {
          const wrapper = mount(<VariantHeader recipeVariants={[]} />)
          expect(wrapper.find('.variantHeaderSides')).toHaveLength(0)
        })
      })

      describe('When there is one recipe variant with side', () => {
        test('then it should render a sides header', () => {
          const wrapper = mount(<VariantHeader
            recipeVariants={
              {
                type: 'sides',
                sides: Immutable.List([
                  { id: '1230-1230', coreRecipeId: '1230', displayName: 'Recipe With Side' },
                ])
              }
            }
            isOutOfStock={false}
          />)
          expect(wrapper.find('.variantHeaderSides')).toHaveLength(1)
        })
      })

      describe('When there are multiple sides', () => {
        test('then it should render the side header', () => {
          const wrapper = mount(<VariantHeader
            recipeVariants={
              {
                type: 'sides',
                sides: Immutable.List([
                  { id: '1230-1230', coreRecipeId: '1230', displayName: 'Side One' },
                  { id: '1234-1234', coreRecipeId: '1234', displayName: 'Side Two' }
                ])
              }
            }
            isOutOfStock={false}
          />)
          expect(wrapper.find('.variantHeaderSides').text()).toContain('Add a side')
        })
      })
    })
  })
})
