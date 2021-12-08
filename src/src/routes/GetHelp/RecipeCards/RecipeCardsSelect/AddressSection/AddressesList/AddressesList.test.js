import React from 'react'
import { mount } from 'enzyme'
import { AddressesList } from './AddressesList'

jest.mock('components/Link', () =>
// eslint-disable-next-line react/prop-types
  ({children }) => <div>{children}</div>
)

const ADDRESS_LONDON = {
  id: '1111',
  name: 'London Address',
  line1: 'london1',
  line2: 'london2',
  line3: 'london3',
  postcode: 'londonpost',
  town: 'London'
}
const ADDRESSES = [
  ADDRESS_LONDON,
  {
    id: '2222',
    name: 'Liverpool Address',
    line1: 'liverpool1',
    line2: 'liverpool2',
    line3: 'liverpool3',
    postcode: 'Liverpoolpost',
    town: 'Liverpool'
  }
]

describe('AddressesList', () => {
  let wrapper
  const trackRecipeCardsAddressChangeArticleMock = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <AddressesList
        userAddresses={ADDRESSES}
        selectedAddress={ADDRESS_LONDON}
        setSelectedAddress={jest.fn()}
        trackRecipeCardsAddressChangeArticle={trackRecipeCardsAddressChangeArticleMock}
        inputVariant="default"
      />
    )
  })

  test('renders the sub header text', () => {
    expect(wrapper.find('.addressesListSubHeader').text()).toBe('Please select the address you would like us to deliver to.')
  })

  test('renders the same number of InputRadio as number userAddresses', () => {
    expect(wrapper.find('InputRadio').length).toEqual(ADDRESSES.length)
  })

  test('renders the same number of Address components as length of userAddresses', () => {
    expect(wrapper.find('Address').length).toEqual(ADDRESSES.length)
  })

  test('renders correct checked address', () => {
    expect(wrapper.find('InputRadio').at(0).prop('isChecked')).toEqual(true)
  })

  test('renders unchecked second address', () => {
    expect(wrapper.find('InputRadio').at(1).prop('isChecked')).toEqual(false)
  })

  test('renders the How I can add a new address article', () => {
    expect(wrapper.find('.helpArticle').text()).toEqual('How can I add a new address?')
  })

  test('passes down the to link to the How can I add a new address article', () => {
    expect(wrapper.find('.helpArticle').prop('to')).toBe('/help-centre/article/4402897919761')
  })

  test('passes down the tracking function to the How can I add a new address article', () => {
    expect(wrapper.find('.helpArticle').prop('tracking')).toBe(trackRecipeCardsAddressChangeArticleMock)
  })

  describe('when change checked address to second', () => {
    const setSelectedAddressMock = jest.fn()
    beforeEach(() => {
      wrapper = mount(
        <AddressesList
          userAddresses={ADDRESSES}
          selectedAddress={ADDRESS_LONDON}
          setSelectedAddress={setSelectedAddressMock}
          trackRecipeCardsAddressChangeArticle={jest.fn()}
          inputVariant="default"
        />
      )
      wrapper.find('InputRadio input').at(1).simulate('change', { target: { id: '2222' }})
    })

    test('should call setSelectedAddressMock with second address', () => {
      expect(setSelectedAddressMock).toHaveBeenCalledWith(ADDRESSES[1])
    })
  })
})
