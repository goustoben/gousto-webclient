import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import FilterTagsNav from 'routes/Menu/FilterTagsNav/FilterTagsNav'
import FilterTagsList from 'routes/Menu/FilterTagsNav/FilterTagsList'

describe("FilterTag", () => {

  describe("rendering", () => {

    test("Will render FilterTag component", () => {
      const component = <FilterTagsNav />

      const tree = renderer
        .create(component)
        .toJSON()

      expect(tree).toMatchSnapshot()
    })

    test('should render a FilterTagList component', () => {
      const wrapper = shallow(<FilterTagsNav menuFilterExperiment />)

      expect(wrapper.find(FilterTagsList).length).toEqual(1)
    })
  })
})
