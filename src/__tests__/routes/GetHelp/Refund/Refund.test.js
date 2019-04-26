import React from 'react'
import { mount } from 'enzyme'
import { browserHistory } from 'react-router'
import { client as routes } from 'config/routes'
import { fetchRefundAmount, setComplaint } from 'apis/getHelp'

import Refund from 'routes/GetHelp/Refund/Refund'

jest.mock('apis/getHelp')

describe('<Refund />', () => {
  const content = {
    title: 'test title',
    infoBody: 'We would like to offer you £{{refundAmount}}',
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
  const trackAcceptRefundSpy = jest.fn()
  let wrapper
  let getHelpLayout

  beforeEach(() => {
    wrapper = mount(
      <Refund
        content={content}
        isFetching={false}
        user={{ id: '999', accessToken: '123' }}
        order={{ id: '888' }}
        selectedIngredients={selectedIngredients}
        trackAcceptRefund={trackAcceptRefundSpy}
      />
    )
    getHelpLayout = wrapper.find('GetHelpLayout')
  })

  describe('rendering', () => {
    test('layout is rendering correctly', async () => {
      
      const BottomBar = Promise.all(getHelpLayout).then((getHelpLayoutProps) => {
        getHelpLayoutProps.find('BottomBar')
    
        expect(getHelpLayoutProps).toHaveLength(1)
        expect(BottomBar).toHaveLength(1)
        expect(BottomBar.find('BottomButton')).toHaveLength(1)
        expect(getHelpLayout.prop('body')).toContain('We would like to offer you £7.77')
      })
    
    })

    test('header is rendering correctly', () => {
      Promise.all(getHelpLayout).then(() => {
        expect(getHelpLayout.prop('title')).toBe(content.title)
      })
    })

    test('bottom bar buttons are rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomBar')
      const Button1 = BottomBar.find('BottomButton')
      const Button2 = BottomBar.find('Button').at(1)
      const { index, contact } = routes.getHelp
      Promise.all(getHelpLayout, Button1, Button2).then(() => {
        expect(Button1.prop('url')).toContain(`${index}/${contact}`)
        expect(Button2.text()).toBe('button2 £7.77 copy')
      })

    })
  })

  describe('behaviour', () => {
    test('loading shows while fetching data', async () => {
      let resolver
      const fetchPromise = new Promise((resolve) => {
        resolver = resolve
      })
      fetchRefundAmount.mockImplementationOnce(() => fetchPromise)
      wrapper = mount(
        <Refund
          content={content}
          user={{ id: '0', accessToken: '123' }}
          order={{ id: '0' }}
          selectedIngredients={selectedIngredients}
          trackAcceptRefund={jest.fn()}
        />
      )

      expect(wrapper.find('Loading')).toHaveLength(1)

      fetchPromise.then(async () => {
        await resolver({
          data: { refundValue: 8.77 }
        })

        expect(wrapper.find('Loading')).toHaveLength(0)
      })
    })

    test('refund data is fetched', () => {
      expect(fetchRefundAmount).toHaveBeenCalledWith('123', {
        customer_id: 999,
        ingredient_ids: ['1234', '1234'],
        order_id: 888
      })
    })

    test('error message is shown when fetching data errors and accept button hides', () => {
      fetchRefundAmount.mockImplementationOnce(() => { throw new Error('error') })
      wrapper = mount(
        <Refund
          content={content}
          user={{ id: '0', accessToken: '123' }}
          order={{ id: '0' }}
          selectedIngredients={selectedIngredients}
          trackAcceptRefund={jest.fn()}
        />
      )
      getHelpLayout = wrapper.find('GetHelpLayout')
      const wrapperText = wrapper.text()

      expect(getHelpLayout.prop('body')).toBe('')
      expect(wrapperText).toContain('Error body')
      expect(wrapperText).not.toContain('button2')
    })

    describe('when user accepts the refund offer', () => {
      let Button

      beforeEach(() => {
        getHelpLayout = wrapper.find('GetHelpLayout')
        browserHistory.push = jest.fn()
        const BottomBar = getHelpLayout.find('BottomBar')
        Button = BottomBar.find('Button').at(1)
      })

      test('redirection happens when clicking Accept Refund button', async () => {
        Promise.all(Button).then(() => {
          Button.props().onClick()

          expect(browserHistory.push).toHaveBeenCalledWith('/get-help/confirmation')
        })
      })

      test('setComplaint is called with correct parameters and descriptions are sanitised', async () => {
        Promise.all(Button).then(() => {
          Button.props().onClick()

          expect(setComplaint).toHaveBeenCalledWith(
            '123',
            {
              customer_id: 999,
              order_id: 888,
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
          )
        })
      })

      test('tracking action is being called when Accept offer button is clicked', async () => {
        Promise.all(Button).then(() => {
          Button.props().onClick()
          expect(trackAcceptRefundSpy).toHaveBeenCalledWith(7.77)
        })
      })

      describe('when setComplaint errors', () => {
        test('redirect is not called', async () => {
          setComplaint.mockImplementationOnce(() => { throw new Error('error') })
          Promise.all(Button).then(() => {
            Button.props().onClick()
  
            expect(browserHistory.push).toHaveBeenCalledTimes(0)
          })
        })
      })
    })
  })
})
