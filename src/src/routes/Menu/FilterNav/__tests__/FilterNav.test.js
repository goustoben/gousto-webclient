import React from 'react'
import FilterNav from 'routes/Menu/FilterNav/FilterNav'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

describe('Filter Nav', () => {
  let wrapper

  test('will render a FilterNav', () => {
    const tree = renderer
      .create(<FilterNav menuFilterExperiment ctaText="All recipes"/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should not render FilterNav if experiment is turned off', () => {
    wrapper = shallow(<FilterNav />)
    expect(wrapper.children().length).toBe(0)
  })

  test('should show filter heart loading', () => {
    wrapper = shallow(<FilterNav menuFilterExperiment isLoadingHeart ifRecommendationIsSelected ctaText="All recipes" />)

    expect(wrapper.find('.heartIconWhite').length).toBe(1)
    expect(wrapper.find('.heartIcon').length).toBe(0)
    expect(wrapper.find('.filterIcon').length).toBe(0)
  })

  test('should show filter heart', () => {
    wrapper = shallow(<FilterNav menuFilterExperiment ifRecommendationIsSelected ctaText="All recipes" />)

    expect(wrapper.find('.heartIconWhite').length).toBe(0)
    expect(wrapper.find('.heartIcon').length).toBe(1)
    expect(wrapper.find('.filterIcon').length).toBe(0)
  })

  test('should show filter heart', () => {
    wrapper = shallow(<FilterNav menuFilterExperiment ctaText="All recipes" />)

    expect(wrapper.find('.heartIconWhite').length).toBe(0)
    expect(wrapper.find('.heartIcon').length).toBe(0)
    expect(wrapper.find('.filterIcon').length).toBe(1)
  })

  test('should render CTA text', () => {
    wrapper = shallow(<FilterNav menuFilterExperiment ctaText="All recipes" />)

    expect(wrapper.find('.ctaText').text()).toBe('All recipes')
  })

  test('should trigger onClick function', () => {
    const mockFunction = jest.fn()
    wrapper = shallow(<FilterNav menuFilterExperiment ctaText="All recipes" onClick={mockFunction} />)
    wrapper.find('.filterCta').simulate('click')
    expect(mockFunction).toHaveBeenCalledTimes(1)
  })
})
