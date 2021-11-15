import { getLowestPrice } from "actions/boxPricesPricePerPortion/getLowestPrice"

const data = {
  2: {
    2: {
      gourmet: {
        pricePerPortion: '6.25',
        pricePerPortionDiscounted: '4.38',
      },
      vegetarian: {
        pricePerPortion: '6.25',
        pricePerPortionDiscounted: '4.38',
      }
    },
    3: {
      gourmet: {
        pricePerPortion: '5.00',
        pricePerPortionDiscounted: '3.50',
      },
      vegetarian: {
        pricePerPortion: '5.00',
        pricePerPortionDiscounted: '3.50',
      }
    },
    4: {
      gourmet: {
        pricePerPortion: '4.37',
        pricePerPortionDiscounted: '3.06',
      },
      vegetarian: {
        pricePerPortion: '4.37',
        pricePerPortionDiscounted: '3.06',
      }
    }
  },
  4: {
    2: {
      gourmet: {
        pricePerPortion: '3.97',
        pricePerPortionDiscounted: '2.78',
      },
      vegetarian: {
        pricePerPortion: '3.97',
        pricePerPortionDiscounted: '2.78',
      }
    },
    3: {
      gourmet: {
        pricePerPortion: '3.56',
        pricePerPortionDiscounted: '2.49',
      },
      vegetarian: {
        pricePerPortion: '3.56',
        pricePerPortionDiscounted: '2.49',
      }
    },
    4: {
      gourmet: {
        pricePerPortion: '2.98',
        pricePerPortionDiscounted: '2.09',
      },
      vegetarian: {
        pricePerPortion: '2.98',
        pricePerPortionDiscounted: '2.09',
      }
    }
  },
  8: {
    8: {
      gourmet: {
        pricePerPortion: '1.17',
        pricePerPortionDiscounted: '0.82',
      }
    }
  }
}

describe('given getLowestPrice is called with result of apis/boxPrices', () => {
  test('then it should extract the lowest price for this nPeople and key', () => {
    expect(getLowestPrice(data, 2, 'pricePerPortion')).toBe('4.37')
    expect(getLowestPrice(data, 2, 'pricePerPortionDiscounted')).toBe('3.06')
    expect(getLowestPrice(data, 4, 'pricePerPortion')).toBe('2.98')
    expect(getLowestPrice(data, 4, 'pricePerPortionDiscounted')).toBe('2.09')
  })

  describe('when the data is missing', () => {
    test('then it should return empty pieces', () => {
      expect(getLowestPrice({}, 2, 'pricePerPortion')).toBeNull()
      expect(getLowestPrice({
        2: {
          2: null,
          3: null,
          4: null,
        }
      }, 2, 'pricePerPortion')).toBeNull()
    })
  })
})
