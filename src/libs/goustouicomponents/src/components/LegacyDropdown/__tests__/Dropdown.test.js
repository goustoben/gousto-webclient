import React from 'react'
import { mount } from 'enzyme'

import { LegacyDropdown } from '..'

describe('<LegacyDropdown />', () => {
  const options = [
    { id: '101', label: 'Missing ingredients' },
    { id: '102', label: 'Wrong ingredients' },
    { id: '103', label: 'Damaged ingredients' },
  ]
  const groupedOptions = [
    { id: '221', label: 'Sub option 1.1', groupLabel: 'Group 1' },
    { id: '222', label: 'Sub option 1.2', groupLabel: 'Group 1' },
    { id: '223', label: 'Sub option 2.1', groupLabel: 'Group 2' },
  ]

  describe('rendering', () => {
    const wrapper = mount(
      <LegacyDropdown
        id="an-id"
        options={options}
        groupedOptions={groupedOptions}
        optionSelected="102"
      />,
    )

    test('id is being added to the select', () => {
      expect(wrapper.find('select').prop('id')).toBe('an-id')
    })

    test('options are being rendered correctly', () => {
      const optionList = wrapper.find('select').find('option')

      expect(optionList).toHaveLength(8)
      expect(optionList.at(0).prop('value')).toBe('101')
      expect(optionList.at(0).text()).toBe('Missing ingredients')
      expect(optionList.at(1).prop('value')).toBe('102')
      expect(optionList.at(1).text()).toBe('Wrong ingredients')
      expect(optionList.at(2).prop('value')).toBe('103')
      expect(optionList.at(2).text()).toBe('Damaged ingredients')
    })

    test('grouped options are being rendered correctly', () => {
      const groupedOptionsList = wrapper.find('.groupOptionItem')
      const groupOptions = wrapper.find('option')
      const groupOneOptions = groupOptions.at(3)
      const groupTwoOptions = groupOptions.at(6)

      expect(groupOneOptions.text()).toBe('Group 1')
      expect(groupTwoOptions.text()).toBe('Group 2')

      expect(groupedOptionsList).toHaveLength(2)

      expect(groupOptions.at(4).prop('value')).toBe('221')
      expect(groupOptions.at(4).text()).toBe('Sub option 1.1')

      expect(groupOptions.at(5).text()).toBe('Sub option 1.2')
      expect(groupOptions.at(5).prop('value')).toBe('222')

      expect(groupOptions.at(7).text()).toBe('Sub option 2.1')
      expect(groupOptions.at(7).prop('value')).toBe('223')
    })

    test('option selected via props is set as default', () => {
      expect(wrapper.find('select').prop('value')).toBe('102')
    })

    test('grouped options renders as a disabled option', () => {
      const groupedOptionsList = wrapper.find('.groupOptionItem')

      expect(groupedOptionsList.at(0).prop('disabled')).toBe(true)
      expect(groupedOptionsList.at(1).prop('disabled')).toBe(true)
    })
  })

  describe('behaviour', () => {
    const onChangeSpy = jest.fn()

    const wrapper = mount(
      <LegacyDropdown
        id="an-id"
        options={options}
        groupedOptions={groupedOptions}
        optionSelected="102"
        onChange={onChangeSpy}
      />,
    )

    test('after selecting, it updates its current value and call its callback with the right params',
      () => {
        wrapper.find('select').simulate('change', { target: { value: '103' } })

        expect(onChangeSpy).toHaveBeenCalledTimes(1)
        expect(onChangeSpy).toHaveBeenCalledWith('103')
        expect(wrapper.find('select').prop('value')).toBe('103')
      })
  })
})
