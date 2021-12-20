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
    amount: 7.7,
    type: 'credit'
  }

  const user = { id: '999', accessToken: '123' }

  let wrapper
  let getHelpLayout2
  let confirmationBody

  beforeAll(() => {
    wrapper = mount(
      <Refund
        compensation={compensation}
        createComplaint={createComplaint}
        isAnyError={false}
        isAnyPending
        isMultiComplaints={false}
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
      wrapper.setProps({ isAnyPending: true })
    })
    test('should render Loading', () => {
      expect(wrapper.find('Loading').exists()).toBe(true)
    })
  })

  describe('when isAnyPending is false', () => {
    let GetInTouchLink

    beforeEach(() => {
      wrapper.setProps({ isAnyPending: false })
      GetInTouchLink = wrapper.find('GoustoLink')
      confirmationBody = wrapper.find('.confirmationBody')
    })

    test('layout is rendering correct text', async () => {
      getHelpLayout2 = wrapper.find('GetHelpLayout2')

      expect(getHelpLayout2).toHaveLength(1)
      expect(confirmationBody.text()).toContain('We would like to give you £7.70 credit off your next order as an apology for the issues with:')
    })

    test('renders Get in touch link', () => {
      const { index, contact } = routes.getHelp
      expect(GetInTouchLink.prop('to')).toContain(`${index}/${contact}`)
    })

    test('bottom bar buttons are rendering correctly', async () => {
      const BottomBar = wrapper.find('BottomFixedContent')
      const Button2 = BottomBar.find('CTA')

      expect(BottomBar).toHaveLength(1)
      expect(Button2.text()).toBe('Claim £7.70 credit')
    })

    describe('and isMultiComplaints is false', () => {
      beforeEach(() => {
        wrapper.setProps({ isMultiComplaints: false })
      })

      describe('and isSsrRepetitiveIssues is true', () => {
        beforeEach(() => {
          wrapper.setProps({ isSsrRepetitiveIssues: true })
        })

        describe('and there were no issues in the past checked boxes', () => {
          beforeEach(() => {
            wrapper.setProps({ numOrdersCompensated: 0 })
            confirmationBody = wrapper.find('.confirmationBody')
          })

          test('layout is rendering correct text', async () => {
            expect(getHelpLayout2).toHaveLength(1)
            expect(confirmationBody.text()).toBe('We would like to give you £7.70 credit off your next order as an apology for the issues with:')
          })
        })

        describe('and this is customer\'s second box and there was an issue with the first one', () => {
          beforeEach(() => {
            wrapper.setProps({ numOrdersCompensated: 1, numOrdersChecked: 1 })
            confirmationBody = wrapper.find('.confirmationBody')
          })

          test('layout is rendering correct text', async () => {
            expect(getHelpLayout2).toHaveLength(1)
            expect(wrapper.find('p').at(0).text()).toContain('Once again, we’re sorry that you’ve had issues with your previous box too.')
            expect(confirmationBody.text()).toContain('we’d like to give you £7.70 credit off your next order as an apology for:')
          })
        })

        describe('and there were some issues in the past checked boxes', () => {
          beforeEach(() => {
            wrapper.setProps({ numOrdersCompensated: 2, numOrdersChecked: 4 })
            confirmationBody = wrapper.find('.confirmationBody')
          })

          test('layout is rendering correct text', async () => {
            expect(getHelpLayout2).toHaveLength(1)
            expect(wrapper.find('p').at(0).text()).toContain('Once again, we’re sorry that 2 of your last 4 boxes have had issues.')
            expect(confirmationBody.text()).toContain('we’d like to give you £7.70 credit off your next order as an apology for:')
          })
        })

        describe('and there were issues with all of the past checked boxes', () => {
          beforeEach(() => {
            wrapper.setProps({ numOrdersCompensated: 4, numOrdersChecked: 4 })
            confirmationBody = wrapper.find('.confirmationBody')
          })

          test('layout is rendering correct text', async () => {
            expect(getHelpLayout2).toHaveLength(1)
            expect(wrapper.find('p').at(0).text()).toContain('Once again, we’re sorry that all of your last 4 boxes have had issues.')
            expect(confirmationBody.text()).toContain('we’d like to give you £7.70 credit off your next order as an apology for:')
          })
        })
      })
    })

    describe('and isMultiComplaints is true', () => {
      beforeEach(() => {
        wrapper.setProps({
          isMultiComplaints: true,
          compensation: {
            ...compensation,
            totalAmount: 15
          }
        })
      })
      describe('and isSsrRepetitiveIssues is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isSsrRepetitiveIssues: false })
          confirmationBody = wrapper.find('.confirmationBody')
          getHelpLayout2 = wrapper.find('GetHelpLayout2')
        })

        test('layout is rendering correct text', async () => {
          expect(getHelpLayout2).toHaveLength(1)
          expect(confirmationBody.text()).toContain('We would like to offer you an additional £7.70 credit to your account as an apology, bringing your total compensation to £15.00.')
        })

        test('CTA has correct text', async () => {
          const CTA = wrapper.find('CTA')

          expect(CTA.text()).toBe('Claim additional £7.70 credit')
        })
      })

      describe('and isSsrRepetitiveIssues is true', () => {
        beforeEach(() => {
          wrapper.setProps({ isSsrRepetitiveIssues: true })
          confirmationBody = wrapper.find('.confirmationBody')
          getHelpLayout2 = wrapper.find('GetHelpLayout2')
        })

        describe('and there were no issues in the past checked boxes', () => {
          beforeEach(() => {
            wrapper.setProps({ numOrdersCompensated: 0 })
          })

          test('layout is rendering correct text', async () => {
            expect(getHelpLayout2).toHaveLength(1)
            expect(confirmationBody.text()).toBe('we’d like to offer you an additional £7.70 credit to your account as an apology, bringing your total compensation to £15.00.')
          })
        })

        describe('and this is customer\'s second box and there was an issue with the first one', () => {
          beforeEach(() => {
            wrapper.setProps({ numOrdersCompensated: 1, numOrdersChecked: 1 })
          })

          test('layout is rendering correct text', async () => {
            expect(getHelpLayout2).toHaveLength(1)
            expect(wrapper.find('p').at(0).text()).toContain('Once again, we’re sorry that you’ve had issues with your previous box too.')
            expect(confirmationBody.text()).toContain('we’d like to offer you an additional £7.70 credit to your account as an apology, bringing your total compensation to £15.')
          })
        })

        describe('and there were some issues in the past checked boxes', () => {
          beforeEach(() => {
            wrapper.setProps({ numOrdersCompensated: 2, numOrdersChecked: 4 })
          })

          test('layout is rendering correct text', async () => {
            expect(getHelpLayout2).toHaveLength(1)
            expect(wrapper.find('p').at(0).text()).toContain('Once again, we’re sorry that 2 of your last 4 boxes have had issues.')
            expect(confirmationBody.text()).toContain('we’d like to offer you an additional £7.70 credit to your account as an apology, bringing your total compensation to £15.')
          })
        })

        describe('and there were issues with all of the past checked boxes', () => {
          beforeEach(() => {
            wrapper.setProps({ numOrdersCompensated: 4, numOrdersChecked: 4 })
          })

          test('layout is rendering correct text', async () => {
            expect(getHelpLayout2).toHaveLength(1)
            expect(wrapper.find('p').at(0).text()).toContain('Once again, we’re sorry that all of your last 4 boxes have had issues.')
            expect(confirmationBody.text()).toContain('we’d like to offer you an additional £7.70 credit to your account as an apology, bringing your total compensation to £15.')
          })
        })
      })
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
        expect(trackIngredientsGetInTouchClick).toHaveBeenCalled()
      })
    })

    describe('when numberOfIngredients is 1', () => {
      beforeEach(() => {
        wrapper.setProps({ numberOfIngredients: 1 })
        getHelpLayout2 = wrapper.find('GetHelpLayout2')
      })
      test('header is rendering correctly', () => {
        expect(getHelpLayout2.prop('headingText')).toBe('We\'re so sorry to hear about your ingredient issue')
      })
    })

    describe('when numberOfIngredients is > 1', () => {
      beforeEach(() => {
        wrapper.setProps({ numberOfIngredients: 2 })
        getHelpLayout2 = wrapper.find('GetHelpLayout2')
      })
      test('header is rendering correctly', () => {
        expect(getHelpLayout2.prop('headingText')).toBe('We\'re so sorry to hear about your 2 ingredient issues')
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
