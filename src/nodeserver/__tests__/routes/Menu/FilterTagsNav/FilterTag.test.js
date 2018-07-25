import React from 'react';
import renderer from 'react-test-renderer';
import FilterTag from 'routes/Menu/FilterTagsNav/FilterTag'

describe("FilterTag", () => {

  describe("rendering", () => {

    test("Will render FilterTag", () => {
      const tree = renderer
        .create(<FilterTag>Facebook</FilterTag>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    })
  })
})
