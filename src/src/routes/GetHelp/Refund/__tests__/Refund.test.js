import React from 'react'
import { mount } from 'enzyme'
import { client as routes } from 'config/routes'

import { Refund } from '../Refund'

jest.mock('apis/getHelp')

jest.mock('../IngredientsList', () => ({
  IngredientsListContainer: () => <div />
}))

describe('<Refund />', () => {
  const loadRefundAmount = jest.fn()
  const createComplaint = jest.fn()
  const trackIngredientsGetInTouchClick = jest.fn()
  const compensation = {
    amount: 7.77,
    type: 'credit'
  }

  const user = { id: '999', accessToken: '123' }

  let wrapper
  let getHelpLayout2

  beforeAll(() => {
    wrapper = mount(
      <Refund
        compensation={compensation}
        createComplaint={createComplaint}
        isAnyError={false}
        isAnyPending
        loadRefundAmount={loadRefundAmount}
        user={user}
        numberOfIngredients={1}
        trackIngredientsGetInTouchClick={trackIngredientsGetInTouchClick}
      />
    )
    getHelpLayout2 = wrapper.find('GetHelpLayout2')
  })

  describe('when isAnyPending is true', () => {
    beforeEach(() => {
      wrapper.setProps({isAnyPending: true})
    })
    test('should render Loading', () => {
      expect(wrapper.find('Loading').exists()).toBe(true)
    })
  })

  describe('when isAnyPending is false', () => {
    let GetInTouchLink
    beforeEach(() => {
      wrapper.setProps({isAnyPending: false})
      GetInTouchLink = wrapper.find('GoustoLink')
    })

    test('layout is rendering correct text', async () => {
      const confirmationBody = wrapper.find('.confirmationBody')
      getHelpLayout2 = wrapper.find('GetHelpLayout2')

      expect(getHelpLayout2).toHaveLength(1)
      expect(confirmationBody.text()).toContain('We would like to give you £7.77 credit off your next order as an apology for the issues with:')
    })

    test('renders Get in touch link', () => {
      const { index, contact } = routes.getHelp
      expect(GetInTouchLink.prop('to')).toContain(`${index}/${contact}`)
    })

    test('bottom bar buttons are rendering correctly', async () => {
      const BottomBar = wrapper.find('BottomFixedContent')
      const Button2 = BottomBar.find('CTA')

      expect(BottomBar).toHaveLength(1)
      expect(Button2.text()).toBe('Claim £7.77 credit')
    })

    describe('and the claim CTA is clicked', () => {
      beforeEach(() => {
        wrapper.find('CTA').simulate('click')
      })

      test('createComplaint is called with isAutoAccept false', () => {
        expect(createComplaint).toHaveBeenCalledWith(false)
      })
    })

    test('renders IngredientsListContainer', () => {
      expect(wrapper.find('IngredientsListContainer')).toHaveLength(1)
    })

    describe('when click on Get in touch', () => {
      test('calls trackIngredientsGetInTouchClick with amount and false for auto_accept', () => {
        GetInTouchLink.simulate('click')
        expect(trackIngredientsGetInTouchClick).toHaveBeenCalledWith(compensation.amount, false)
      })
    })

    describe('when numberOfIngredients is 1', () => {
      beforeEach(() => {
        wrapper.setProps({numberOfIngredients: 1})
        getHelpLayout2 = wrapper.find('GetHelpLayout2')
      })
      test('header is rendering correctly', () => {
        expect(getHelpLayout2.prop('headingText')).toBe('We\'re so sorry to hear about the issue with your ingredient')
      })
    })

    describe('when numberOfIngredients is > 1', () => {
      beforeEach(() => {
        wrapper.setProps({numberOfIngredients: 2})
        getHelpLayout2 = wrapper.find('GetHelpLayout2')
      })
      test('header is rendering correctly', () => {
        expect(getHelpLayout2.prop('headingText')).toBe('We\'re so sorry to hear about the issue with your ingredients')
      })
    })
  })

  describe('when isAnyError is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isAnyError: true })
    })

    test('confirmationBody contains empty string', () => {
      expect(wrapper.find('.confirmationBody').text())
        .toEqual('There was a problem in getting your refund. Please contact us below, or try again later.')
    })

    test('BottomFixedContent is not rendered', () => {
      expect(wrapper.find('BottomFixedContent').exists()).toBe(false)
    })
  })
})
