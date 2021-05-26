import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { ShowcaseMenu } from '../ShowcaseMenu'

describe('ShowcaseMenu', () => {
  let wrapper
  const proceed = jest.fn()
  const changeCollection = jest.fn()
  const openRecipeDetails = jest.fn()
  const trackScrollOneStep = jest.fn()

  describe('when rendered', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ShowcaseMenu
          proceed={proceed}
          recipes={Immutable.List()}
          collectionDescriptorsInLines={[]}
          collectionDescriptorsSingleLine={[]}
          changeCollection={changeCollection}
          openRecipeDetails={openRecipeDetails}
          trackScrollOneStep={trackScrollOneStep}
        />
      )
    })

    test('renders correctly', () => {
      expect(wrapper.find('HotjarTrigger').exists()).toBe(true)
      expect(wrapper.find('Connect(DiscountAppliedBar)').exists()).toBe(true)
      expect(wrapper.find('.heading').exists()).toBe(true)
      expect(wrapper.find('CollectionPicker').exists()).toBe(true)
      expect(wrapper.find('Recipes').exists()).toBe(true)
      expect(wrapper.find('InformationBox').exists()).toBe(true)
      expect(wrapper.find('CTASection').exists()).toBe(true)
    })

    describe('when the CTA is clicked', () => {
      beforeEach(() => {
        wrapper.find('CTASection').simulate('click')
      })

      test('then it should invoke proceed', () => {
        expect(proceed).toHaveBeenCalledWith()
      })
    })
  })
})
