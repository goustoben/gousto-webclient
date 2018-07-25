import React from 'react';
import renderer from 'react-test-renderer';
import FilterTagsList from 'routes/Menu/FilterTagsNav/FilterTagsList'

describe("FilterTagsList", () => {

  describe("rendering", () => {

    test("Will render FilterTagsList component", () => {
      const component = <FilterTagsList tags={["Gluten Free", "Reactive"]}/>

      const tree = renderer
      .create(component)
      .toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
