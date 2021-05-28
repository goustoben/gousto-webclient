import Immutable from 'immutable'
import { mapStateToProps } from '../WelcomeToGoustoContainer'

describe('WelcomeToGoustoContainer', () => {
  let output
  const orderId = 100
  const deliveryDate = '25-04-2021'
  const whenCutoff = '28-04-2021'
  const state = {
    user: Immutable.fromJS({
      orders: Immutable.fromJS([
        {
          deliveryDate,
          whenCutoff,
          id: 100,
        },
        {
          deliveryDate,
          whenCutoff,
          id: 101,
        },
      ]),
    }),
  }
  const ownProps = {
    params: {
      orderId: 100,
    },
  }

  beforeEach(() => {
    output = mapStateToProps(state, ownProps)
  })

  describe('Given mapStateToProps', () => {
    describe('When it is called', () => {
      test('Then should return proper parameters', () => {
        const expected = {
          orderId,
          deliveryDate,
          whenCutoff,
        }
        expect(output).toEqual(expect.objectContaining(expected))
      })
    })
  })
})
