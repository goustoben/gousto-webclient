import React from 'react'
import Immutable from 'immutable'
import { render } from '@testing-library/react'
import { SubIngredients } from './SubIngredients'

describe('<SubIngredients/>', () => {
  let allergens

  beforeEach(() => {
    allergens = Immutable.List(['soya', 'wheat-gluten', 'milk', 'sulphites'])
  })

  test('it should forward className to the paragraph element', () => {
    const { container } = render(<SubIngredients className="hey" allergens={allergens} subIngredients="cheese" />)

    expect(container).toContainHTML('<p class="hey">cheese</p>')
  })

  test('should not rendered bold if the ingredient passed is not part of the list of allergens', () => {
    const { container } = render(<SubIngredients allergens={allergens} subIngredients="cheese" />)

    expect(container).toContainHTML('<p class="">cheese</p>')
  })

  test('should rendered bold if the ingredient passed is part of the list of allergens', () => {
    const { container } = render(<SubIngredients allergens={allergens} subIngredients="wheat" />)

    expect(container).toContainHTML('<span class="bold">wheat</span>')
  })

  test.each([
    'almond',
    'almonds',
    'barley',
    'brazil',
    'nut',
    'nuts',
    'cashew',
    'celeriac',
    'celery',
    'crustacean',
    'egg',
    'eggs',
    'fish',
    'hazelnut',
    'hazelnuts',
    'kamut',
    'lupin',
    'macadamia',
    'macadamia',
    'macadamias',
    'milk',
    'mollusc',
    'mustard',
    'oat',
    'oatmeal',
    'oats',
    'peanut',
    'peanuts',
    'pecan',
    'pecans',
    'pistachio',
    'pistachios',
    'queensland',
    'rye',
    'sesame',
    'soy',
    'soya',
    'spelt',
    'sulphites',
    'sulphur',
    'dioxide',
    'walnut',
    'walnuts',
    'wheat',
  ])(
    'should render bold for all this ingredient (%s) as its part of the hardcoded list of allergens',
    (ingredient) => {
      const { container } = render(
        <SubIngredients allergens={allergens} subIngredients={ingredient} />
      )

      expect(container).toContainHTML(`<p class=""><span class="bold">${ingredient}</span></p>`)
    }
  )

  describe('when give a full descriptions with custom allergens', () => {
    test('should render with the allergens bolded', () => {
      const { container } = render(
        <SubIngredients
          allergens={Immutable.List(['tofu'])}
          subIngredients={
            'May contain peanut, (nuts), tofu and sesame. \n\nAlso may contain 1 or 2rd garlic purée tasty-ness!'
          }
        />
      )

      expect(container).toContainHTML('<p class="">May contain <span class="bold">peanut</span>, (<span class="bold">nuts</span>), <span class="bold">tofu</span> and <span class="bold">sesame</span>.  <br />  <br /> Also may contain 1 or 2rd garlic purée tasty-ness!</p>')
    })
  })
})
