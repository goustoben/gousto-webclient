import React from 'react'
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { AlternativeOptionItem } from '.'

describe('AlternativeOptionItem', () => {
  describe('When the variant list is on the details screen', () => {
    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
    });

    describe('When the recipe is checked', () => {
      test('then it should render a radio button input in a highlighted blue box', () => {
        const { container } = render(<AlternativeOptionItem
          recipeId="1230"
          recipeName="Chicken curry"
          changeCheckedRecipe={() => {}}
          isChecked
          isOnDetailScreen
          isOutOfStock={false}
        />);

        expect(container).not.toBeEmptyDOMElement();
        expect(container).toContainHTML('checked=""');
      })
    })

    describe('When the recipe is not checked', () => {
      test('then it should render a radio button input in a grey box', () => {
        const { container } = render(<AlternativeOptionItem
          recipeId="1230"
          recipeName="Chicken curry"
          changeCheckedRecipe={() => {}}
          isChecked={false}
          isOnDetailScreen
          isOutOfStock={false}
        />);

        expect(container).not.toBeEmptyDOMElement();
        expect(container).not.toContainHTML('checked=""');
      })
    })

    describe('When the recipe is sold out', () => {
      test('then it should render a sold out tag', () => {
        const { container } = render(<AlternativeOptionItem
          recipeId="1230"
          recipeName="Chicken curry"
          changeCheckedRecipe={() => {}}
          isChecked={false}
          isOnDetailScreen
          isOutOfStock
        />);

        expect(container).not.toBeEmptyDOMElement();
        expect(container).toContainHTML('Sold out');
      })
    })

    describe('When the recipe has a surcharge', () => {
      test('then it should render surcharge info', () => {
        const { container } = render(<AlternativeOptionItem
          key="1230"
          recipeId="1230"
          recipeName="Chicken curry"
          changeCheckedRecipe={() => {}}
          isChecked={false}
          isOnDetailScreen
          isOutOfStock={false}
          surcharge={0.75}
        />);

        expect(container).not.toBeEmptyDOMElement();
        expect(container).toContainHTML('0.75');
        expect(container).toContainHTML('per serving');
      })
    })
  })
})
