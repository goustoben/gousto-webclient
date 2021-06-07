import { groupBy } from '../boxPricesListUtils'

const boxTypes = [
  {
    num_persons: 2,
    num_portions: 2
  },
  {
    num_persons: 2,
    num_portions: 3
  },
  {
    num_persons: 2,
    num_portions: 4
  },
  {
    num_persons: 4,
    num_portions: 2
  },
  {
    num_persons: 4,
    num_portions: 3
  },
  {
    num_persons: 4,
    num_portions: 4
  }
]

const expected = {
  2: [
    {
      num_persons: 2,
      num_portions: 2
    },
    {
      num_persons: 2,
      num_portions: 3
    },
    {
      num_persons: 2,
      num_portions: 4
    }
  ],
  4: [
    {
      num_persons: 4,
      num_portions: 2
    },
    {
      num_persons: 4,
      num_portions: 3
    },
    {
      num_persons: 4,
      num_portions: 4
    }
  ]
}

describe('Given groupBy is called with array of objects and a key', () => {
  test('then it should return a mapping from the key to array of matching objects', () => {
    const groupByNumPerson = groupBy(boxTypes, 'num_persons')
    expect(groupByNumPerson).toStrictEqual(expected)
  })
})
