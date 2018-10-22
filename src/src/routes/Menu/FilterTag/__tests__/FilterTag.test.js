import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import FilterTag from 'routes/Menu/FilterTag/FilterTag'

describe('FilterTag', () => {
  describe('rendering', () => {
    test('Will render FilterTag', () => {
      const tree = renderer
        .create(<FilterTag>Facebook</FilterTag>)
        .toJSON()

        expect(tree).toMatchSnapshot()
    })

    test('should render heart icon if tag for JFY collection', () => {
      const wrapper = shallow(<FilterTag value="collectionId" type="collection" slug="recommendations" />)
      expect(wrapper.find('.filterTagHeart[fileName="icon-heart"]').length).toBe(1)
    })

    test('should render outline heart icon if tag for JFY collection', () => {
      const wrapper = shallow(<FilterTag value="collectionId" type="collection" slug="recommendations" isLoading />)
      expect(wrapper.find('.filterTagHeart[fileName="icon-heart-outline"]').length).toBe(1)
    })

    test('should NOT render heart icon if no slug for JFY collection', () => {
      const wrapper = shallow(<FilterTag value="collectionId" type="collection" slug="all" />)
      expect(wrapper.find('.filterTagHeart').length).toBe(0)
    })
  })

  describe('onClick', () => {
    let wrapper

    test('should trigger a collection filter change action with the value passed', () => {
      const collectionFilterChange = jest.fn()
      wrapper = shallow(<FilterTag value="collectionId" type="collection" collectionFilterChange={collectionFilterChange} />)

      wrapper.find('div').first().simulate('click')
      expect(collectionFilterChange).toHaveBeenCalledWith('collectionId')
    })

    test('should trigger a current diet type change action with the value passed', () => {
      const filterCurrentDietTypesChange = jest.fn()
      wrapper = shallow(<FilterTag value="diet-type" type="dietType" filterCurrentDietTypesChange={filterCurrentDietTypesChange} />)

      wrapper.find('div').first().simulate('click')
      expect(filterCurrentDietTypesChange).toHaveBeenCalledWith('diet-type')
    })

    test('should trigger a dietary attributes change action with the value passed', () => {
      const filterDietaryAttributesChange = jest.fn()
      wrapper = shallow(<FilterTag value="dietary-attribute" type="dietaryAttribute" filterDietaryAttributesChange={filterDietaryAttributesChange} />)

      wrapper.find('div').first().simulate('click')
      expect(filterDietaryAttributesChange).toHaveBeenCalledWith('dietary-attribute')
    })

    test('should trigger a total time change action with the value passed', () => {
      const filterCurrentTotalTimeChange = jest.fn()
      wrapper = shallow(<FilterTag value="0" type="totalTime" filterCurrentTotalTimeChange={filterCurrentTotalTimeChange} />)

      wrapper.find('div').first().simulate('click')
      expect(filterCurrentTotalTimeChange).toHaveBeenCalledWith('0')
    })
  })
})
