import React from 'react';
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import Button from 'Button'
import FilterTagsNav from 'routes/Menu/FilterTagsNav/FilterTagsNav'

describe("FilterTag", () => {

  describe("rendering", () => {

    test("Will render FilterTag component", () => {
      const component = <FilterTagsNav />

      const tree = renderer
      .create(component)
      .toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe("bahviour", () => {

    test("Will handle click on the CTA", () => {
      const clickHandler = jest.fn()
      const component = <FilterTagsNav onCTAClick={clickHandler} />
      const wrapper = shallow(component)

      wrapper.find(Button).first().simulate('click')

      expect(clickHandler).toHaveBeenCalled()
    })
  })
})
