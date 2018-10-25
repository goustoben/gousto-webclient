import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'goustouicomponents'
import FilterTagsNav from 'routes/Menu/FilterTagsNav/FilterTagsNav'

describe('FilterTag', () => {

  describe('rendering', () => {

    test('will render FilterTag component', () => {
      const component = <FilterTagsNav onCTAClick={jest.fn()} menuFilterExperiment />

      const tree = renderer
      .create(component)
      .toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('bahviour', () => {

    test('will handle click on the CTA', () => {
      const clickHandler = jest.fn()
      const component = <FilterTagsNav onCTAClick={clickHandler} menuFilterExperiment />
      const wrapper = shallow(component)

      wrapper.find(Button).first().simulate('click')

      expect(clickHandler).toHaveBeenCalled()
    })
  })
})
