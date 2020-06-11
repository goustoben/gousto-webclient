import React from 'react'
import { mount } from 'enzyme'
import { VariantHeader } from '../VariantHeader'

describe('VariantHeader', () => {
  describe('When there are no recipe variants', () => {
    test('then it should not render a header', () => {
      const wrapper = mount(<VariantHeader recipeVariants={null} />)
      expect(wrapper.find('.variantHeader')).toHaveLength(0)
    })
  })

  describe('When there is an array of recipe variants', () => {
    describe('When the array is empty', () => {
      test('then it should not render a header', () => {
        const wrapper = mount(<VariantHeader recipeVariants={[]} />)
        expect(wrapper.find('.variantHeader')).toHaveLength(0)
      })
    })

    describe('When there are 3 recipe variants', () => {
      test('then it should render the correct number of recipe variants on the header', () => {
        const wrapper = mount(<VariantHeader
          recipeVariants={[
            { id: '1230-1230', coreRecipeId: '1230', displayName: 'Variant One' },
            { id: '1234-1234', coreRecipeId: '1234', displayName: 'Variant Two' }
          ]}
          outOfStock={false}
        />)
        expect(wrapper.find('.variantHeader').text()).toContain('3 options available')
      })
    })

    describe('When there are 5 recipe variants', () => {
      test('then it should render the correct number of recipe variants on the header', () => {
        const wrapper = mount(<VariantHeader
          recipeVariants={[
            { id: '1230'},
            { id: '125'},
            { id: '126'},
            { id: '127'},
            { id: '1284'}
          ]}
          outOfStock={false}
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
          outOfStock
        />)
        expect(wrapper.find('.variantHeader')).toHaveLength(0)
      })
    })
  })
})
