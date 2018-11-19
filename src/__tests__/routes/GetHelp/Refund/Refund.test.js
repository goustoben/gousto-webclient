import React from 'react'
import { mount } from 'enzyme'
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
  let wrapper
  let getHelpLayout
  let fetchPromise

  beforeEach(() => {
    fetchPromise = Promise.resolve({
      data: { value: 7.77, type: 'a-type' }
    })
    fetchRefundAmount.mockImplementation(() => fetchPromise)
    wrapper = mount(
			<Refund
			  content={content}
			  user={{ id: '999', accessToken: '123' }}
			  order={{ id: '888', ingredientIds: ['1234'] }}
			/>
    )

    getHelpLayout = wrapper.find('GetHelpLayout')
  })

  afterEach(() => {
    fetchRefundAmount.mockReset()
  })

  describe('rendering', () => {
    test('layout is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomBar')

      expect(getHelpLayout).toHaveLength(1)
      expect(getHelpLayout.prop('body')).toContain('We would like to offer you £7.77')
      expect(BottomBar).toHaveLength(1)
      expect(BottomBar.find('BottomButton')).toHaveLength(1)
    })

    test('header is rendering correctly', () => {
      expect(getHelpLayout.prop('title')).toBe(content.title)
    })

    test('bottom bar buttons are rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomBar')
      const Button1 = BottomBar.find('BottomButton')
      const Button2 = BottomBar.find('Button').at(1)
      const { index, contact } = routes.getHelp

      expect(Button1.prop('url')).toContain(`${index}/${contact}`)
      expect(Button2.text()).toBe('button2 £7.77 copy')
    })
  })

  describe('behaviour', () => {
    test('loading shows while fetching data', async () => {
      let resolver
      fetchPromise = new Promise((resolve) => {
        resolver = resolve
      })
      fetchRefundAmount.mockImplementationOnce(() => fetchPromise)
      wrapper = mount(
				<Refund
				  content={content}
				  user={{ id: '0', accessToken: '123' }}
				  order={{ id: '0', ingredientIds: ['1234'] }}
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
      expect(fetchRefundAmount).toHaveBeenCalledWith({
        customer_id: 999,
        ingredientIds: ['1234'],
        order_id: 888
      })
    })

    test('error message is shown when fetching data errors and accept button hides', () => {
      fetchRefundAmount.mockImplementationOnce(() => { throw new Error('error') })
      wrapper = mount(
				<Refund
				  content={content}
				  user={{ id: '0', accessToken: '123' }}
				  order={{ id: '0', ingredientIds: ['1234'] }}
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
      let assignSpy

      beforeEach(() => {
        setComplaint.mockResolvedValue({})
        getHelpLayout = wrapper.find('GetHelpLayout')
        assignSpy = jest.spyOn(window.location, 'assign')
        assignSpy.mockReturnValueOnce(null)
        const BottomBar = getHelpLayout.find('BottomBar')
        Button = BottomBar.find('Button').at(1)
      })

      afterEach(() => {
        setComplaint.mockReset()
        assignSpy.mockReset()
      })

      test('redirect is called', async () => {
        await Button.props().onClick()

        expect(assignSpy).toHaveBeenCalledTimes(1)

        assignSpy.mockReset()
      })

      test('setComplaint is called', async () => {
        await Button.props().onClick()

        expect(setComplaint).toHaveBeenCalledWith(
          '123',
          {
            customer_id: 999,
            order_id: 888,
            type: 'a-type',
            value: 7.77,
            issues: [{ ingredient_id: '1234', category_id: 98 }],
          }
        )
      })

      describe('when setComplaint errors', () => {
        test('redirect is not called', async () => {
          setComplaint.mockImplementationOnce(() => { throw new Error('error') })
          await Button.props().onClick()

          expect(assignSpy).toHaveBeenCalledTimes(0)

          assignSpy.mockReset()
        })
      })
    })
  })
})
