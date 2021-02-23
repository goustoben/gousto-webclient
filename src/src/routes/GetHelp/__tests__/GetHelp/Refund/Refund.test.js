import React from 'react'
import { mount } from 'enzyme'
import { browserHistory } from 'react-router'
import { client as routes } from 'config/routes'
import { fetchRefundAmount, setComplaint } from 'apis/getHelp'

import { Refund } from 'routes/GetHelp/Refund/Refund'

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
      ingredientUuid: '1234',
      recipeGoustoReference: 'rgr10101234',
      issueId: '999999',
      issueDescription: 'a description <> <script>alert("hi")<script>'
        + '<b onmouseover=alert(\'Wufff!\')>click me!</b>'
        + '<img src="http://url.to.file.which/not.exist" onerror=alert(document.cookie);>'
    },
    '2020-1234': {
      recipeId: '2020',
      ingredientUuid: '1234',
      recipeGoustoReference: 'rgr20201234',
      issueId: '999999',
      issueDescription: 'another &description'
        + '<IMG SRC=j&#X41vascript:alert(\'test2\')>'
        + '<META HTTP-EQUIV="refresh"'
        + 'CONTENT="0;url=data:text/html;base64,PHNjcmlwdD5hbGVydCgndGVzdDMnKTwvc2NyaXB0Pg">'
    },
  }
  const trackAcceptRefundSpy = jest.fn()
  const trackUserCannotGetCompensationSpy = jest.fn()
  const PROPS = {
    content,
    featureShorterCompensationPeriod: false,
    user: { id: '999', accessToken: '123' },
    order: { id: '888' },
    selectedIngredients,
    trackAcceptRefund: trackAcceptRefundSpy,
    trackRejectRefund: () => {},
    trackUserCannotGetCompensation: trackUserCannotGetCompensationSpy,
  }

  describe('rendering', () => {
    let getHelpLayout
    let wrapper

    beforeEach(() => {
      wrapper = mount(
        <Refund {...PROPS} />
      )
      getHelpLayout = wrapper.find('GetHelpLayout')
    })

    test('layout is rendering correctly', async () => {
      await wrapper.setState({
        isFetching: false,
      })
      const BottomBar = wrapper.find('BottomFixedContentWrapper')
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

    test('bottom bar buttons are rendering correctly', async () => {
      await wrapper.setState({
        isFetching: false,
      })
      const BottomBar = wrapper.find('BottomFixedContentWrapper')
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
        order_id: 888,
        features: [],
      },
    ]
    let wrapper

    beforeEach(() => {
      wrapper = mount(
        <Refund {...PROPS} />
      )
    })

    describe('when fetchRefundAmount is being called on componendDidMount', () => {
      test('fetchRefundAmount is being called with the correct params', () => {
        expect(fetchRefundAmount).toHaveBeenCalledWith(
          ...FETCH_REFUND_AMOUNT_PARAMS
        )
      })

      describe('when ssrShorterCompensationPeriod feature is turned on', () => {
        beforeEach(() => {
          wrapper = mount(
            <Refund {...PROPS} featureShorterCompensationPeriod />
          )
        })

        test('the fetchRefundAmount has ssrShorterCompensationPeriod attached to the body request', () => {
          const [customerId, body] = FETCH_REFUND_AMOUNT_PARAMS

          expect(fetchRefundAmount).toHaveBeenCalledWith(
            customerId,
            { ...body, features: ['ssrShorterCompensationPeriod'] },
          )
        })
      })

      describe('and when it is still waiting for a response', () => {
        beforeEach(() => {
          fetchRefundAmount.mockImplementationOnce(() => new Promise(() => {}))

          wrapper = mount(
            <Refund
              {...PROPS}
              user={{ id: '0', accessToken: '123' }}
              order={{ id: '0' }}
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
              recipe_gousto_reference: 'rgr10101234',
              category_id: 999999,
              description: 'a description &lt;&gt; '
            },
            {
              ingredient_id: '1234',
              recipe_gousto_reference: 'rgr20201234',
              category_id: 999999,
              description: 'another &amp;description<img>'
            },
          ],
          features: [],
        }
      ]

      beforeEach(() => {
        browserHistory.push = jest.fn()

        wrapper = mount(
          <Refund
            {...PROPS}
            user={{ id: '0', accessToken: '123' }}
            order={{ id: '0' }}
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

        describe('when user accepts the refund offer', () => {
          test('redirect when refund is accepted', async () => {
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
            beforeEach(async () => {
              trackUserCannotGetCompensationSpy.mockClear()

              setComplaint.mockRejectedValueOnce()

              await Button.props().onClick()
            })

            test('redirect is not called', async () => {
              expect(browserHistory.push).toHaveBeenCalledTimes(0)
            })

            test('the tracking is being called correctly', async () => {
              expect(trackUserCannotGetCompensationSpy).toHaveBeenCalledTimes(1)
            })
          })
        })

        describe('when ssrShorterCompensationPeriod feature is turned on', () => {
          beforeEach(async () => {
            setComplaint.mockResolvedValueOnce({})

            wrapper.setProps({ featureShorterCompensationPeriod: true })

            await Button.props().onClick()
          })

          test('the setComplaint has ssrShorterCompensationPeriod attached to the body request', () => {
            const [customerId, body] = SET_COMPLAINS_PARAMS

            expect(setComplaint).toHaveBeenCalledWith(
              customerId,
              { ...body, features: ['ssrShorterCompensationPeriod'] },
            )
          })
        })
      })
    })
  })
})
