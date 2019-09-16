import React from 'react'
import { mount } from 'enzyme'
import { browserHistory } from 'react-router'
import { client as routes } from 'config/routes'
import { fetchRefundAmount, fetchRefundAmountV2, setComplaint, setComplaintV2 } from 'apis/getHelp'

import Refund from 'routes/GetHelp/Refund/Refund'

jest.mock('apis/getHelp')

describe('<Refund />', () => {
  const content = {
    title: 'test title',
    infoBody: 'we\'d like to give you £{{refundAmount}} credit',
    confirmationBody: 'Confirmation body',
    errorBody: 'Error body',
    button1: 'button1 copy',
    button2: 'button2 £{{refundAmount}} copy',
  }
  const selectedIngredients = {
    '1010-1234': {
      recipeId: '1010',
      ingredientId: '1234',
      issueId: '999999',
      issueDescription: 'a description <> <script>alert("hi")<script>' +
        '<b onmouseover=alert(\'Wufff!\')>click me!</b>' +
        '<img src="http://url.to.file.which/not.exist" onerror=alert(document.cookie);>'
    },
    '2020-1234': {
      recipeId: '2020',
      ingredientId: '1234',
      issueId: '999999',
      issueDescription: 'another &description' +
        '<IMG SRC=j&#X41vascript:alert(\'test2\')>' +
        '<META HTTP-EQUIV="refresh"' +
        'CONTENT="0;url=data:text/html;base64,PHNjcmlwdD5hbGVydCgndGVzdDMnKTwvc2NyaXB0Pg">'
    },
  }

  describe('rendering', () => {
    let getHelpLayout
    let wrapper
    const trackAcceptRefundSpy = jest.fn()

    beforeEach(() => {
      wrapper = mount(
        <Refund
          content={content}
          user={{ id: '999', accessToken: '123' }}
          order={{ id: '888' }}
          selectedIngredients={selectedIngredients}
          trackAcceptRefund={trackAcceptRefundSpy}
        />
      )
      getHelpLayout = wrapper.find('GetHelpLayout')
    })

    test('layout is rendering correctly', async() => {
      await wrapper.setState({
        isFetching: false,
      })
      const BottomBar = wrapper.find('BottomBar')
      const confirmationBody = wrapper.find('.confirmationBody')
      getHelpLayout = wrapper.find('GetHelpLayout')

      expect(getHelpLayout).toHaveLength(1)
      expect(confirmationBody.text()).toContain('we\'d like to give you £7.77 credit')
      expect(BottomBar).toHaveLength(1)
      expect(BottomBar.find('BottomButton')).toHaveLength(1)
    })

    test('header is rendering correctly', () => {
      expect(getHelpLayout.prop('title')).toBe(content.title)
    })

    test('bottom bar buttons are rendering correctly', async() => {
      await wrapper.setState({
        isFetching: false,
      })
      const BottomBar = wrapper.find('BottomBar')
      const Button1 = BottomBar.find('BottomButton')
      const Button2 = BottomBar.find('Button').at(1)
      const { index, contact } = routes.getHelp

      expect(Button1.prop('url')).toContain(`${index}/${contact}`)
      expect(Button2.text()).toBe('button2 £7.77 copy')
    })
  })

  describe('behaviour', () => {
    const FETCH_REFUND_AMOUNT_PARAMS = [
      '123',
      {
        customer_id: 999,
        ingredient_ids: ['1234', '1234'],
        order_id: 888
      }
    ]

    let wrapper
    const trackAcceptRefundSpy = jest.fn()

    beforeEach(() => {
      wrapper = mount(
        <Refund
          content={content}
          user={{ id: '999', accessToken: '123' }}
          order={{ id: '888' }}
          selectedIngredients={selectedIngredients}
          trackAcceptRefund={trackAcceptRefundSpy}
        />
      )
    })

    describe('when it is fetching data', () => {
      test('fetch to have been called correctly', () => {
        expect(fetchRefundAmount).toHaveBeenCalledWith(
          ...FETCH_REFUND_AMOUNT_PARAMS
        )
      })

      describe('and when it is still waiting for a response', () => {
        beforeEach(() => {
          fetchRefundAmount.mockImplementationOnce(() => new Promise(() => {}))

          wrapper = mount(
            <Refund
              content={content}
              user={{ id: '0', accessToken: '123' }}
              order={{ id: '0' }}
              selectedIngredients={selectedIngredients}
              trackAcceptRefund={jest.fn()}
            />
          )
        })

        test('loading is being rendered', () => {
          expect(wrapper.find('Loading')).toHaveLength(1)
        })

        test('no error are displayed', () => {
          const wrapperText = wrapper.text()

          expect(wrapperText).not.toContain('Error body')
        })
      })
    })

    describe('when request is finished', () => {
      const SET_COMPLAINS_PARAMS = [
        '123',
        {
          customer_id: 0,
          order_id: 0,
          type: 'a-type',
          value: 7.77,
          issues: [
            {
              ingredient_id: '1234',
              category_id: 999999,
              description: 'a description &lt;&gt; '
            },
            {
              ingredient_id: '1234',
              category_id: 999999,
              description: 'another &amp;description<img>'
            },
          ],
        }
      ]

      beforeEach(() => {
        browserHistory.push = jest.fn()

        wrapper = mount(
          <Refund
            content={content}
            user={{ id: '0', accessToken: '123' }}
            order={{ id: '0' }}
            selectedIngredients={selectedIngredients}
            trackAcceptRefund={trackAcceptRefundSpy}
          />
        )
      })

      describe('and user is able to get a refund', () => {
        let Button

        beforeEach(() => {
          wrapper.update()

          Button = wrapper.find('Button').at(1)
        })

        test('loading is not being rendered', async () => {
          expect(wrapper.find('Loading')).toHaveLength(0)
        })

        test('no error are displayed ', () => {
          const wrapperText = wrapper.text()

          expect(wrapperText).not.toContain('Error body')
        })

        describe('and when user accepts the refund offer', () => {
          test('redirect when refund is accepted', async() => {
            await Button.props().onClick()
            expect(browserHistory.push).toHaveBeenCalledWith('/get-help/confirmation')
          })

          test('setComplaint is called with correct parameters and descriptions are sanitised', async () => {
            setComplaint.mockResolvedValueOnce({})

            await Button.props().onClick()

            expect(setComplaint).toHaveBeenCalledWith(
              ...SET_COMPLAINS_PARAMS
            )
          })

          test('tracking action is being called when Accept offer button is clicked', async () => {
            await Button.props().onClick()

            expect(trackAcceptRefundSpy).toHaveBeenCalledWith(7.77)
          })

          describe('and when setComplaint errors', () => {
            test('redirect is not called', async () => {
              setComplaint.mockRejectedValueOnce(new Error('error'))

              await Button.props().onClick()

              expect(browserHistory.push).toHaveBeenCalledTimes(0)
            })
          })
        })
      })
    })

    describe('endpoints version v2', () => {
      beforeEach(() => {
        wrapper = mount(
          <Refund
            content={content}
            user={{ id: '999', accessToken: '123' }}
            order={{ id: '888' }}
            selectedIngredients={selectedIngredients}
            trackAcceptRefund={trackAcceptRefundSpy}
            featureSSRValidationV2={{
              experiment: true,
              value: true,
            }}
          />
        )
      })

      describe('feature flag is present', () => {
        test('/v2/value is being called correctly', () => {
          expect(fetchRefundAmountV2).toHaveBeenCalledWith(
            ...FETCH_REFUND_AMOUNT_PARAMS
          )
        })

        test('/v2/refund is being called correctly', () => {
          wrapper.update()

          wrapper.find('Button').at(1).props().onClick()

          expect(setComplaintV2).toHaveBeenCalledTimes(1)
        })
      })
    })
  })
})
